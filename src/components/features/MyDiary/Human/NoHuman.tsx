import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import I18n from '@/utils/I18n';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useStripe } from '@stripe/stripe-react-native';
import { Diary, Human, User } from '@/types';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/functions';
import Toast from 'react-native-root-toast';
import { addAiCheckError } from '@/utils/grammarCheck';
import { AppText, Icon, Space, SubmitButton } from '@/components/atoms';
import { borderLight, softRed, useAppTheme, white } from '@/styles/colors';

interface Props {
  activeHuman: boolean | undefined;
  diary: Diary;
  user: User;
  setUser: (user: User) => void;
  editDiary: (objectID: string, diary: Diary) => void;
}

const MINIMUM_PRICE = 50;
const AMOUNT_PER_LENGTH = 2;
export const BUSINESS_DAYS = 3;

const NoHuman: React.FC<Props> = ({
  activeHuman,
  diary,
  user,
  setUser,
  editDiary,
}) => {
  const theme = useAppTheme();

  const text = useMemo(
    () => diary.reviseText || diary.text,
    [diary.reviseText, diary.text],
  );
  const amount = useMemo(
    () =>
      text.length * AMOUNT_PER_LENGTH >= MINIMUM_PRICE
        ? text.length * AMOUNT_PER_LENGTH
        : MINIMUM_PRICE,
    [text.length],
  );

  const [initialLoading, setInitialLoading] = useState(true);
  const [initialLoadError, setInitialLoadError] = useState(false);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { currentUser } = auth();

  useEffect(() => {
    const f = async () => {
      const response = await firebase
        .app()
        .functions('asia-northeast1')
        .httpsCallable('onPaymentSheet')({
        isDebug: __DEV__,
        amount,
        currency: 'jpy',
        stripeCustomerId: user.stripeCustomerId || null,
      });
      const { paymentIntent, ephemeralKey, customerId } = response.data;

      if (!user.stripeCustomerId) {
        await firestore().doc(`users/${user.uid}`).update({
          stripeCustomerId: customerId,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        setUser({
          ...user,
          stripeCustomerId: customerId,
        });
      }

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'LangJournal',
        customerId: customerId,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
      });
      if (!error) {
        setInitialLoading(false);
      } else {
        setInitialLoadError(true);
      }
    };

    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iconSpellcheck = useMemo(
    () => <Icon icon='community' size={22} color={white} name='spellcheck' />,
    [],
  );

  const showError = useCallback(async () => {
    await addAiCheckError(
      'Human',
      'original',
      'NoHuman',
      diary.uid,
      diary.objectID || '',
    );
    Toast.show(I18n.t('noHuman.error'), {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
  }, [diary.objectID, diary.uid]);

  const onPressSubmit = useCallback(async () => {
    const { error } = await presentPaymentSheet();

    try {
      if (error) {
        console.log(error);
      } else {
        const newHuman: Human = {
          status: 'yet',
          createdAt:
            firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
          titleCorrects: null,
          textCorrects: null,
        };
        await firestore().doc(`diaries/${diary.objectID}`).update({
          human: newHuman,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        editDiary(diary.objectID!, {
          ...diary,
          human: newHuman,
        });
      }
    } catch (err) {
      console.error(err);
      showError();
    }
  }, [diary, editDiary, presentPaymentSheet, showError]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <MaterialCommunityIcons
          size={80}
          name='face-man-shimmer'
          style={styles.image}
        />
        <Space size={16} />
        <AppText size='m'>
          {activeHuman
            ? I18n.t('noHuman.noHuman')
            : I18n.t('noHuman.noHumanInactive')}
        </AppText>

        <Space size={32} />

        <View style={styles.rowLabel}>
          <MaterialCommunityIcons
            size={14}
            color={theme.colors.secondary}
            name='file-document-outline'
          />
          <AppText
            size='s'
            color={theme.colors.secondary}
            style={styles.textLabel}
          >
            {I18n.t('noHuman.noHumanButton')}
          </AppText>
        </View>
        <Space size={8} />
        <View style={styles.textBox}>
          <AppText size='m'>{text}</AppText>
        </View>

        <Space size={32} />

        <View style={styles.rowLabel}>
          <MaterialIcons
            size={14}
            color={theme.colors.secondary}
            name='attach-money'
          />
          <AppText
            size='s'
            color={theme.colors.secondary}
            style={styles.textLabel}
          >
            {I18n.t('noHuman.labelAmount')}
          </AppText>
        </View>
        <Space size={8} />
        <View style={styles.box}>
          <View style={styles.topBox}>
            <View style={styles.row}>
              <AppText bold size='m'>
                {I18n.t('noHuman.labelAmountPerLength')}
              </AppText>
              <View style={styles.rowUnit}>
                <AppText bold size='m'>
                  {AMOUNT_PER_LENGTH}
                </AppText>
                <AppText size='s' textAlign='right' style={styles.unit}>
                  {I18n.t('noHuman.unitYen')}
                </AppText>
              </View>
            </View>
            <Space size={8} />
            <View style={styles.row}>
              <AppText bold size='m'>
                {I18n.t('noHuman.labelLength')}
              </AppText>
              <View style={styles.rowUnit}>
                <AppText bold size='m'>
                  {text.length}
                </AppText>
                <AppText size='s' textAlign='right' style={styles.unit}>
                  {I18n.t('noHuman.unitLength')}
                </AppText>
              </View>
            </View>
            <Space size={8} />
          </View>

          <View style={styles.line} />

          <View style={styles.topBottom}>
            <View style={styles.row}>
              <AppText size='l' bold>
                {I18n.t('noHuman.labelSum')}
              </AppText>
              <View style={styles.rowUnit}>
                <AppText size='l' bold>
                  {amount}
                </AppText>
                <AppText size='m' textAlign='right' style={styles.unitL}>
                  {I18n.t('noHuman.unitYen')}
                </AppText>
              </View>
            </View>
            <Space size={8} />
            {amount === MINIMUM_PRICE && (
              <AppText size='s' color={theme.colors.secondary}>
                {I18n.t('noHuman.unitYen', {
                  minimumPrice: MINIMUM_PRICE,
                  minimumLength: MINIMUM_PRICE / AMOUNT_PER_LENGTH,
                })}
              </AppText>
            )}
          </View>
        </View>

        <Space size={32} />

        {activeHuman && (
          <>
            <SubmitButton
              disable={!activeHuman || !currentUser || !currentUser.email}
              icon={iconSpellcheck}
              title={I18n.t('noHuman.noHumanButton')}
              containerStyle={styles.submitButton}
              onPress={onPressSubmit}
              isLoading={initialLoading}
            />
            <Space size={16} />
            {initialLoadError && (
              <>
                <AppText size='m' bold color={softRed}>
                  {I18n.t('noHuman.initialLoadError')}
                </AppText>
                <Space size={8} />
              </>
            )}
            {(!currentUser || !currentUser.email) && (
              <>
                <AppText size='m' bold color={softRed}>
                  {I18n.t(`noHuman.noEmail`)}
                </AppText>
                <Space size={8} />
              </>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  image: {
    alignSelf: 'center',
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLabel: {
    paddingLeft: 4,
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: borderLight,
  },
  box: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: borderLight,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: borderLight,
  },
  topBox: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  topBottom: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  rowUnit: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  unit: {
    paddingLeft: 4,
    alignSelf: 'flex-end',
  },
  unitL: {
    paddingLeft: 4,
    alignSelf: 'flex-end',
  },
  submitButton: {
    paddingHorizontal: 16,
  },
});

export default NoHuman;
