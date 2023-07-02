import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
} from 'react-native-purchases';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-root-toast';
import I18n from '@/utils/I18n';
import {
  ModalBecomePremiumStackNavigationProp,
  ModalBecomePremiumStackParamList,
} from '@/navigations/ModalNavigator';

import { Layout } from '@/components/templates';
import {
  AppText,
  Icon,
  LinkText,
  LoadingModal,
  RadioBox,
  Space,
  SubmitButton,
} from '@/components';
import { checkPremium } from '@/utils/purchase';
import { useAppTheme } from '@/styles/colors';
import HeaderText from '@/components/features/Header/HeaderText';

interface DispatchProps {
  setIsPremium: (isPremium: boolean) => void;
}

type BecomePremiumNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalBecomePremiumStackParamList, 'BecomePremium'>,
  ModalBecomePremiumStackNavigationProp
>;

type ScreenType = {
  navigation: BecomePremiumNavigationProp;
} & DispatchProps;

const BecomePremiumScreen: React.FC<ScreenType> = ({
  setIsPremium,
  navigation,
}) => {
  const theme = useAppTheme();
  const { currentUser } = auth();
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [purchasesPackage, setPurchasesPackage] = useState<PurchasesPackage>();

  const onPressItem = useCallback((v) => {
    setPurchasesPackage(v);
  }, []);

  useEffect(() => {
    const f = async () => {
      const offerings = await Purchases.getOfferings();

      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        setCurrentOffering(offerings.current);
      }
    };

    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
    });
  }, [navigation, onPressClose]);

  const onPressSubmit = useCallback(async () => {
    if (!purchasesPackage || isLoading) return;
    setIsLoading(true);
    try {
      const { customerInfo } = await Purchases.purchasePackage(
        purchasesPackage,
      );
      if (checkPremium(customerInfo)) {
        setIsPremium(true);
        navigation.goBack();
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        console.log(e);
        Toast.show(I18n.t('becomePremium.error'), {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, navigation, purchasesPackage, setIsPremium]);

  const onPressRestore = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const restore = await Purchases.restorePurchases();
      if (checkPremium(restore)) {
        setIsPremium(true);
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
      Toast.show(I18n.t('becomePremium.error'), {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, navigation, setIsPremium]);

  return (
    <Layout innerStyle={styles.container}>
      <LoadingModal visible={isLoading} />
      <View
        style={[styles.becomeContainer, { borderColor: theme.colors.main }]}
      >
        <View style={styles.row}>
          <Icon icon='community' name='star-four-points-outline' size={18} />
          <AppText size='ll' bold style={styles.becomeTitle}>
            {I18n.t('becomePremium.becomeTitle')}
          </AppText>
          <Icon icon='community' name='star-four-points-outline' size={18} />
        </View>
        <View style={styles.labelContainer}>
          <Icon icon='community' name='check' size={24} />
          <View>
            <AppText size='l' bold style={styles.becomeText}>
              {I18n.t('becomePremium.props1')}
            </AppText>
            <Space size={4} />
            <AppText size='m' bold style={styles.becomeText}>
              {I18n.t('becomePremium.props1description')}
            </AppText>
          </View>
        </View>
        <Space size={8} />
        <View style={styles.labelContainer}>
          <Icon icon='community' name='check' size={24} />
          <AppText size='m' bold style={styles.becomeText}>
            {I18n.t('becomePremium.props2')}
          </AppText>
        </View>
      </View>

      <Space size={32} />
      {currentOffering &&
        currentOffering.availablePackages.map((item) => (
          <View key={item.identifier}>
            <RadioBox
              checked={item.identifier === purchasesPackage?.identifier}
              textComponent={
                <View style={styles.priceContainer}>
                  <AppText size='m'>
                    {I18n.t(`becomePremium.${item.packageType}`)}
                  </AppText>
                  <AppText size='m' bold>
                    {item.product.priceString}
                  </AppText>
                </View>
              }
              onPress={() => {
                onPressItem(item);
              }}
            />
            <Space size={16} />
          </View>
        ))}
      <Space size={8} />
      <SubmitButton
        disable={!purchasesPackage || !currentUser || !currentUser.email}
        title={I18n.t(`becomePremium.purchase`)}
        onPress={onPressSubmit}
      />
      {currentUser && currentUser.email ? (
        <LinkText
          size='m'
          containerStyle={styles.linkTextContaienr}
          onPress={onPressRestore}
          text={I18n.t('becomePremium.restore')}
        />
      ) : (
        <>
          <Space size={16} />
          <AppText size='m' bold color={theme.colors.danger}>
            {I18n.t(`becomePremium.noEmail`)}
          </AppText>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  becomeContainer: {
    marginTop: 16,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 24,
    paddingVertical: 16,
    borderWidth: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  becomeTitle: {
    marginHorizontal: 4,
  },
  becomeText: {
    marginLeft: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkTextContaienr: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
  },
});

export default BecomePremiumScreen;
