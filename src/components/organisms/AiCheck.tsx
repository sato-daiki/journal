import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import {
  Diary,
  LanguageTool as LanguageToolType,
  Sapling as SaplingType,
} from '@/types';
import { ChildTabBar } from '@/components/molecules';
import LanguageTool from '@/components/organisms/LanguageTool';
import Sapling from '@/components/organisms/Sapling';
import I18n from '@/utils/I18n';

interface Props {
  hideFooterButton: boolean;
  diary: Diary;
  editDiary: (objectID: string, diary: Diary) => void;
  onPressRevise?: () => void;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  title: string;
  text: string;
  languageTool?: LanguageToolType | null;
  sapling?: SaplingType | null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const AiCheck: React.FC<Props> = ({
  hideFooterButton,
  diary,
  editDiary,
  title,
  text,
  languageTool,
  sapling,
  checkPermissions,
  goToRecord,
  onPressRevise,
}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ai1', title: I18n.t('myDiary.ai1') },
    { key: 'ai2', title: I18n.t('myDiary.ai2') },
  ]);

  const onIndexChange = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const renderScene = useCallback(
    ({ route }) => {
      switch (route.key) {
        case 'ai1':
          return (
            <LanguageTool
              hideFooterButton={hideFooterButton}
              diary={diary}
              title={title}
              text={text}
              titleArray={languageTool?.titleMatches}
              textArray={languageTool?.textMatches}
              editDiary={editDiary}
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressRevise={onPressRevise}
            />
          );
        case 'ai2':
          return (
            <Sapling
              hideFooterButton={hideFooterButton}
              diary={diary}
              title={title}
              text={text}
              titleArray={sapling?.titleEdits}
              textArray={sapling?.textEdits}
              editDiary={editDiary}
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressRevise={onPressRevise}
            />
          );
        default:
          return null;
      }
    },
    [
      checkPermissions,
      diary,
      editDiary,
      goToRecord,
      hideFooterButton,
      languageTool?.textMatches,
      languageTool?.titleMatches,
      onPressRevise,
      sapling?.textEdits,
      sapling?.titleEdits,
      text,
      title,
    ],
  );

  const renderTabBar = useCallback(
    (props) => {
      if (
        sapling &&
        (sapling.titleResult === 'corrected' ||
          sapling.titleResult === 'perfect' ||
          sapling.textError === 'corrected' ||
          sapling.textError === 'perfect')
      ) {
        return <ChildTabBar {...props} />;
      }
    },
    [sapling],
  );

  if (!diary) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
      />
    </View>
  );
};
export default AiCheck;
