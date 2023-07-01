import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { LocalStatus } from '@/types';
import { PaperProvider } from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import { RootSiblingParent } from 'react-native-root-siblings';
import { StripeProvider } from '@stripe/stripe-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { darkTheme, lightTheme } from '@/styles/colors';
import RootNavigatorContainer from './containers/RootNavigatorContainer';

export interface Props {
  localStatus: LocalStatus;
}

const AppProvider: React.FC<Props> = ({ localStatus }) => {
  const scheme = useColorScheme();

  const theme = useMemo(() => {
    if (!localStatus.darkMode || localStatus.darkMode === 'device') {
      if (scheme === 'light') {
        return lightTheme;
      } else {
        return darkTheme;
      }
    } else if (localStatus.darkMode === 'light') {
      return lightTheme;
    } else {
      return darkTheme;
    }
  }, [localStatus.darkMode, scheme]);

  return (
    <ActionSheetProvider>
      <RootSiblingParent>
        <StripeProvider
          publishableKey={
            __DEV__
              ? process.env.TEST_STRIPE_PUBLBISHABLE_KEY!
              : process.env.ADMIN_STRIPE_PUBLBISHABLE_KEY!
          }
        >
          <MenuProvider>
            <PaperProvider theme={theme}>
              <NavigationContainer>
                <RootNavigatorContainer />
              </NavigationContainer>
            </PaperProvider>
          </MenuProvider>
        </StripeProvider>
      </RootSiblingParent>
    </ActionSheetProvider>
  );
};

export default AppProvider;
