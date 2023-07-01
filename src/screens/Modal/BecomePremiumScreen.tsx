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
import I18n from '@/utils/I18n';
import {
  ModalBecomePremiumStackNavigationProp,
  ModalBecomePremiumStackParamList,
} from '@/navigations/ModalNavigator';

import {
  HeaderText,
  Icon,
  LinkText,
  LoadingModal,
  RadioBox,
  Space,
  SubmitButton,
} from '@/components/atoms';
import {
  fontSizeL,
  fontSizeLL,
  fontSizeM,
  mainColor,
  primaryColor,
  softRed,
  subTextColor,
} from '@/styles/Common';
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
    paddingTop: 16,
  },
  becomeContainer: {
    marginTop: 16,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 24,
    paddingVertical: 16,
    borderColor: mainColor,
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
    fontSize: fontSizeLL,
    fontWeight: 'bold',
  },
  becomeText: {
    fontSize: fontSizeL,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  becomeDescription: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
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
  noEmail: {
    paddingTop: 16,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: softRed,
    fontWeight: 'bold',
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
      <View style={styles.becomeContainer}>
        <View style={styles.row}>
          <Icon
            icon='community'
            name='star-four-points-outline'
            size={18}
            color={primaryColor}
          />
          <Text style={styles.becomeTitle}>
            {I18n.t('becomePremium.becomeTitle')}
          </Text>
          <Icon
            icon='community'
            name='star-four-points-outline'
            size={18}
            color={primaryColor}
          />
        </View>
        <View style={styles.labelContainer}>
          <Icon icon='community' name='check' size={24} color={primaryColor} />
          <View>
            <Text style={styles.becomeText}>
              {I18n.t('becomePremium.props1')}
            </Text>
            <Space size={4} />
            <Text style={styles.becomeDescription}>
              {I18n.t('becomePremium.props1description')}
            </Text>
          </View>
        </View>
        <Space size={8} />
        <View style={styles.labelContainer}>
          <Icon icon='community' name='check' size={24} color={primaryColor} />
          <Text style={styles.becomeText}>
            {I18n.t('becomePremium.props2')}
          </Text>
        </View>
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
