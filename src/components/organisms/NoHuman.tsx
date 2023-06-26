import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import I18n from '@/utils/I18n';
import { Space, SubmitButton } from '../atoms';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
  borderLightColor,
  fontSizeL,
  fontSizeM,
  fontSizeS,
  primaryColor,
  softRed,
  subTextColor,
} from '@/styles/Common';
import { useStripe } from '@stripe/stripe-react-native';
import { Diary, Human, User } from '@/types';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/functions';

import Toast from 'react-native-root-toast';
import { addAiCheckError } from '@/utils/grammarCheck';

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
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
  textLabel: {
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
    color: subTextColor,
    paddingLeft: 4,
  },
  textBox: {
    borderColor: borderLightColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  box: {
    borderColor: borderLightColor,
    borderWidth: 1,
    borderRadius: 8,
  },
  line: {
    borderBottomColor: borderLightColor,
    borderBottomWidth: 1,
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
  label: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    fontWeight: 'bold',
  },
  labelL: {
    fontSize: fontSizeL,
    lineHeight: fontSizeL * 1.3,
    fontWeight: 'bold',
  },
  value: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    fontWeight: 'bold',
  },
  valueL: {
    fontSize: fontSizeL,
    lineHeight: fontSizeL * 1.3,
    fontWeight: 'bold',
  },
  unit: {
    paddingLeft: 4,
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  unitL: {
    paddingLeft: 4,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  describe: {
    color: subTextColor,
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
  },
  submitButton: {
    paddingHorizontal: 16,
  },
  error: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: softRed,
    fontWeight: 'bold',
  },
});

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

  const [loading, setLoading] = useState(false);
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
    () => <MaterialCommunityIcons size={22} color={'#fff'} name='spellcheck' />,
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
      position: Toast.positions.TOP,
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
          color={primaryColor}
          name='face-man-shimmer'
          style={styles.image}
        />
        <Space size={16} />
        <Text style={styles.text}>
          {activeHuman
            ? I18n.t('noHuman.noHuman')
            : I18n.t('noHuman.noHumanInactive')}
        </Text>

        <Space size={32} />

        <View style={styles.rowLabel}>
          <MaterialCommunityIcons
            size={14}
            color={subTextColor}
            name='file-document-outline'
          />
          <Text style={styles.textLabel}>
            {I18n.t('noHuman.noHumanButton')}
          </Text>
        </View>
        <Space size={8} />
        <View style={styles.textBox}>
          <Text style={styles.text}>{text}</Text>
        </View>

        <Space size={32} />

        <View style={styles.rowLabel}>
          <MaterialIcons size={14} color={subTextColor} name='attach-money' />
          <Text style={styles.textLabel}>{I18n.t('noHuman.labelAmount')}</Text>
        </View>
        <Space size={8} />
        <View style={styles.box}>
          <View style={styles.topBox}>
            <View style={styles.row}>
              <Text style={styles.label}>
                {I18n.t('noHuman.labelAmountPerLength')}
              </Text>
              <View style={styles.rowUnit}>
                <Text style={styles.value}>{AMOUNT_PER_LENGTH}</Text>
                <Text style={styles.unit}>{I18n.t('noHuman.unitYen')}</Text>
              </View>
            </View>
            <Space size={8} />
            <View style={styles.row}>
              <Text style={styles.label}>{I18n.t('noHuman.labelLength')}</Text>
              <View style={styles.rowUnit}>
                <Text style={styles.value}>{text.length}</Text>
                <Text style={styles.unit}>{I18n.t('noHuman.unitLength')}</Text>
              </View>
            </View>
            <Space size={8} />
          </View>

          <View style={styles.line} />

          <View style={styles.topBottom}>
            <View style={styles.row}>
              <Text style={styles.labelL}>{I18n.t('noHuman.labelSum')}</Text>
              <View style={styles.rowUnit}>
                <Text style={styles.valueL}>{amount}</Text>
                <Text style={styles.unitL}>{I18n.t('noHuman.unitYen')}</Text>
              </View>
            </View>
            <Space size={8} />
            {amount === MINIMUM_PRICE && (
              <Text style={styles.describe}>
                {I18n.t('noHuman.unitYen', {
                  minimumPrice: MINIMUM_PRICE,
                  minimumLength: MINIMUM_PRICE / AMOUNT_PER_LENGTH,
                })}
              </Text>
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
              isLoading={initialLoading || loading}
            />
            <Space size={16} />
            {initialLoadError && (
              <>
                <Text style={styles.error}>
                  {I18n.t('noHuman.initialLoadError')}
                </Text>
                <Space size={8} />
              </>
            )}
            {(!currentUser || !currentUser.email) && (
              <>
                <Text style={styles.error}>{I18n.t(`noHuman.noEmail`)}</Text>
                <Space size={8} />
              </>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default NoHuman;
