import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { subTextColor, fontSizeS } from '../../styles/Common';
import { CountryCode } from '../../types';
import I18n from '../../utils/I18n';
// import { CountryNameWithFlag } from '../atoms';

interface Props {
  nationalityCode: CountryCode;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: fontSizeS,
    color: subTextColor,
    paddingLeft: 2,
    paddingRight: 16,
  },
});

const ProfileNationalityCode: React.FC<Props> = ({ nationalityCode }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        size={14}
        color={subTextColor}
        name='flag-outline'
      />
      <Text style={styles.label}>
        {I18n.t('profileNationality.nationality')}
      </Text>
      {/* <CountryNameWithFlag nationalityCode={nationalityCode} /> */}
    </View>
  );
};

export default ProfileNationalityCode;
