import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import {
  primaryColor,
  fontSizeL,
  borderLightColor,
  maxModalScreen,
  maxMain,
} from '../styles/Common';
import { getEachOS } from '../utils/common';
import { DefaultHeaderBack } from '../components/atoms';

export const DefaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  // @ts-ignore
  headerTitleStyle: {
    fontWeight: getEachOS({
      ios: '700',
      android: '500',
      web: '700',
    }),
    color: primaryColor,
    fontSize: fontSizeL,
  },
  headerTintColor: primaryColor,
  headerBackTitleStyle: {
    display: 'none',
  },
  headerLeft: props => {
    const { onPress } = props;
    if (!onPress) return null;
    return <DefaultHeaderBack onPress={onPress} />;
  },
  cardStyle: {
    // borderleftはdrwarのdefaultでついている
    borderRightWidth: 1,
    borderRightColor: borderLightColor,
  },
};

export const DefaultSearchBarOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleContainerStyle: {
    flex: 1,
    marginRight: 64,
  },
};

export const DefaultModalLayoutOptions: StackNavigationOptions = {
  cardStyle: {
    width: '100%',
    maxWidth: maxModalScreen,
    marginHorizontal: 'auto',
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: borderLightColor,
    borderRightColor: borderLightColor,
    flex: 1,
  },
};

export const DefaultAuthLayoutOptions: StackNavigationOptions = {
  cardStyle: {
    width: '100%',
    maxWidth: maxMain,
    marginHorizontal: 'auto',
    backgroundColor: '#fff',
    flex: 1,
  },
};
