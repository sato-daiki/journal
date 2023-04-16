import React from 'react';
import { SmallButtonSubmit, SmallButtonWhite } from '../atoms';

interface Props {
  isOn?: boolean;
  isLoading?: boolean;
  disable?: boolean;
  titleOn: string;
  titleOff: string;
  onPress: () => void;
}

const OnOffSmallButton: React.FC<Props> = ({
  isOn,
  isLoading = false,
  disable = false,
  titleOn,
  titleOff,
  onPress,
}: Props) => {
  if (isOn) {
    return (
      <SmallButtonSubmit
        isLoading={isLoading}
        disable={disable}
        title={titleOn}
        onPress={onPress}
      />
    );
  }

  return (
    <SmallButtonWhite isLoading={isLoading} disable={disable} title={titleOff} onPress={onPress} />
  );
};

export default OnOffSmallButton;
