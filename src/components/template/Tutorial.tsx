import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Modal from './Modal';
import { SubmitButton } from '../atoms';
import { fontSizeL, primaryColor, borderLightColor } from '../../styles/Common';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    paddingBottom: 16,
    textAlign: 'center',
  },
  line: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
});

interface Props {
  displayed: boolean;
  isLoading: boolean;
  title: string;
  buttonText: string;
  onPress?: () => void;
  children: React.ReactNode;
}

const Tutorial: React.FC<Props> = ({
  displayed,
  isLoading,
  title,
  buttonText,
  onPress,
  children,
}: Props) => (
  <Modal visible={!displayed}>
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
      {children}
      <SubmitButton title={buttonText} onPress={onPress} isLoading={isLoading} />
    </View>
  </Modal>
);

export default Tutorial;
