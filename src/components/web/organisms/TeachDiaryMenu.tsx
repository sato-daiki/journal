import React from 'react';
import I18n from '../../../utils/I18n';
import MenuTemplate from '../template/MenuTemplate';
import { CustumMenuOption } from '../molecules';

interface Props {
  onPressAppShare: () => void;
}

const TeachDiaryMenu = ({ onPressAppShare }: Props) => {
  return (
    <MenuTemplate>
      <CustumMenuOption
        onSelect={onPressAppShare}
        icon='community'
        size={25}
        name='share-variant'
        text={I18n.t('sns.diary')}
      />
    </MenuTemplate>
  );
};

export default TeachDiaryMenu;
