import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import UserDiaryScreenContainer from '../containers/UserDiaryScreenContainer';
// import I18n from '../utils/I18n';

// export type PublicStackParamList = {
//   UserDiary: { objectID: string; userName: string };
// };

const Stack = createStackNavigator();

const PublicNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='UserDiary'>
      {/* <Stack.Screen
        name="UserDiary"
        component={UserDiaryScreenContainer}
        options={{ title: I18n.t('teachDiary.headerTitle') }}
      /> */}
    </Stack.Navigator>
  );
};

export default PublicNavigator;
