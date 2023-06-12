import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
} from 'react-native-purchases';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-root-toast';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from '@/utils/I18n';
import {
  ModalBecomePremiumStackNavigationProp,
  ModalBecomePremiumStackParamList,
} from '@/navigations/ModalNavigator';
import {
  DefaultModalLayoutOptions,
  DefaultNavigationOptions,
} from '@/constants/NavigationOptions';

import {
  HeaderText,
  LinkText,
  LoadingModal,
  RadioBox,
  Space,
  SubmitButton,
} from '@/components/atoms';
import { fontSizeM, mainColor, softRed, subTextColor } from '@/styles/Common';
import { checkPremium } from '@/utils/purchase';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  description: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  becomeText: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  linkTextContaienr: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEmail: {
    paddingTop: 8,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: softRed,
  },
  slash: {
    paddingHorizontal: 16,
    color: subTextColor,
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
  },
  priceTitle: {
    fontSize: fontSizeM,
  },
  priceString: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const BecomePremiumScreen: React.FC<ScreenType> = ({
  setIsPremium,
  navigation,
}) => {
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
      ...DefaultNavigationOptions,
      ...DefaultModalLayoutOptions,
      title: I18n.t('becomePremium.headerTitle'),
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
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <Text style={styles.description}>
        {I18n.t('becomePremium.description')}
      </Text>
      <View style={styles.labelContainer}>
        <MaterialCommunityIcons size={16} name='check' />
        <Text style={styles.becomeText}>{I18n.t('becomePremium.props1')}</Text>
      </View>
      <View style={styles.labelContainer}>
        <MaterialCommunityIcons size={16} name='check' />
        <Text style={styles.becomeText}>{I18n.t('becomePremium.props2')}</Text>
      </View>
      <Space size={32} />
      {currentOffering &&
        currentOffering.availablePackages.map((item) => (
          <View key={item.identifier}>
            <RadioBox
              checked={item.identifier === purchasesPackage?.identifier}
              color={mainColor}
              textComponent={
                <View style={styles.priceContainer}>
                  <Text style={styles.priceTitle}>
                    {I18n.t(`becomePremium.${item.packageType}`)}
                  </Text>
                  <Text style={styles.priceString}>
                    {item.product.priceString}
                  </Text>
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
          containerStyle={styles.linkTextContaienr}
          onPress={onPressRestore}
          text={I18n.t('becomePremium.restore')}
        />
      ) : (
        <Text style={styles.noEmail}>{I18n.t(`becomePremium.noEmail`)}</Text>
      )}
    </View>
  );
};

export default BecomePremiumScreen;
