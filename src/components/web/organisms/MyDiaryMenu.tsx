import React from 'react';
import I18n from '../../../utils/I18n';
import MenuTemplate from '../template/MenuTemplate';
import { CustumMenuOption } from '../molecules';
import { softRed } from '../../../styles/Common';

interface Props {
  onPressDeleteMenu: () => void;
}

const MyDiaryMenu = ({ onPressDeleteMenu }: Props) => {
  return (
    <MenuTemplate>
      <CustumMenuOption
        onSelect={onPressDeleteMenu}
        icon='community'
        name='trash-can-outline'
        size={25}
        textColor={softRed}
        iconColor={softRed}
        text={I18n.t('myDiary.menuDelete')}
      />
    </MenuTemplate>
  );
};

export default React.memo(MyDiaryMenu);
