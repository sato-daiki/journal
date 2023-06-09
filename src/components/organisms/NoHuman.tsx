import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import I18n from '@/utils/I18n';
import { SubmitButton } from '../atoms';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, softRed } from '@/styles/Common';
import { SaplingLogo } from '@/images';
import { useStripe } from '@stripe/stripe-react-native';
import { firebase } from '@react-native-firebase/firestore';
import { Diary, User } from '@/types';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 76,
    marginBottom: 16,
  },
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    marginBottom: 8,
  },
  linkText: {
    alignSelf: 'flex-end',
    marginBottom: 64,
  },
  submitButton: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  error: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: softRed,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

interface Props {
  activeHuman: boolean | undefined;
  diary: Diary;
  user: User;
  setUser: (user: User) => void;
}

const NoHuman: React.FC<Props> = ({ activeHuman, diary, user, setUser }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialLoadError, setInitialLoadError] = useState(false);

  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { currentUser } = auth();

  useEffect(() => {
    const f = async () => {
      console.log('useEffect', user.stripeCustomerId);

      const response = await firebase
        .app()
        .functions('asia-northeast1')
        .httpsCallable('onPaymentSheet')({
        // 50円以下だとエラーになる
        amount: diary.text.length * 2 >= 50 ? diary.text.length * 2 : 50,
        currency: 'jpy',
        stripeCustomerId: user.stripeCustomerId || null,
      });
      const { paymentIntent, ephemeralKey, customerId } = response.data;

      console.log('customerId', customerId);
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
        // defaultBillingDetails: {
        //   name: 'Jane Doe',
        // },
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

  const fetchPaymentSheetParams = async () => {
    const response = await firebase
      .app()
      .functions('asia-northeast1')
      .httpsCallable('onPaymentSheet')({
      amount: diary.text.length * 2,
      currency: 'jpy',
    });
    return response.data;
  };

  const onPressSubmit = useCallback(async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(error);
    } else {
      console.log('Success');
    }
  }, [presentPaymentSheet]);

  return (
    <View style={styles.container}>
      <Image source={SaplingLogo} style={styles.image} />
      <Text style={styles.text}>
        {activeHuman
          ? I18n.t('noHuman.noHuman')
          : I18n.t('noHuman.noHumanInactive')}
      </Text>
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
          {initialLoadError && (
            <Text style={styles.error}>
              {I18n.t('noHuman.initialLoadError')}
            </Text>
          )}
          {(!currentUser || !currentUser.email) && (
            <Text style={styles.error}>{I18n.t(`noHuman.noEmail`)}</Text>
          )}
        </>
      )}
    </View>
  );
};

export default NoHuman;
