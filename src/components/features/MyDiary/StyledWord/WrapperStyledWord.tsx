import React, { ReactNode } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { AppText } from '@/components';
import { fontSizeM } from '@/styles/fonts';
import { moderateScale } from '@/styles/metrics';

type Props = {
  isTitle: boolean;
  onPress: () => void;
  children: ReactNode;
};

const WrapperStyledWord: React.FC<Props> = ({ isTitle, onPress, children }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View>
        <AppText
          size='m'
          bold={isTitle}
          style={{
            lineHeight: moderateScale(
              isTitle ? fontSizeM * 1.3 : fontSizeM * 1.8,
            ),
          }}
        >
          {children}
        </AppText>
      </View>
    </TouchableNativeFeedback>
  );
};

export default WrapperStyledWord;
