import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import {
  Diary,
  LanguageTool as LanguageToolType,
  Sapling as SaplingType,
} from '@/types';
import { MyDiaryTabBar } from '@/components/molecules';
import LanguageTool from '@/components/organisms/LanguageTool';
import Sapling from '@/components/organisms/Sapling';
import I18n from '@/utils/I18n';
import NoSapling from './NoSapling';
import { ConfigAiCheck } from './MyDiary/MyDiary';
import NoHuman from './NoHuman';
import Human from './Human';

interface Props {
  isOriginal: boolean;
  hideFooterButton: boolean;
  diary: Diary;
  editDiary: (objectID: string, diary: Diary) => void;
  onPressRevise?: () => void;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressAdReward?: () => void;
  successSapling?: boolean;
  configAiCheck: ConfigAiCheck;
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
  isOriginal,
  hideFooterButton,
  diary,
  editDiary,
  title,
  text,
  languageTool,
  sapling,
  successSapling,
  configAiCheck,
  checkPermissions,
  goToRecord,
  onPressRevise,
  onPressAdReward,
}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ai1', title: I18n.t('myDiary.ai1') },
    { key: 'ai2', title: I18n.t('myDiary.ai2') },
    // { key: 'human', title: I18n.t('myDiary.human') },
  ]);

  useEffect(() => {
    if (successSapling) {
      setIndex(1);
    }
  }, [successSapling]);

  const onIndexChange = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const hasSapling = useMemo(
    () =>
      !!sapling &&
      (sapling.titleResult === 'corrected' ||
        sapling.titleResult === 'perfect' ||
        sapling.textError === 'corrected' ||
        sapling.textError === 'perfect'),
    [sapling],
  );

  const hasHuman = useMemo(() => !!diary.human, [diary.human]);

  const renderScene = useCallback(
    ({ route }) => {
      switch (route.key) {
        case 'ai1':
          return (
            <LanguageTool
              isOriginal={isOriginal}
              showAdReward={
                !!configAiCheck.activeSapling &&
                !hasSapling &&
                !hideFooterButton
              }
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
              onPressAdReward={onPressAdReward}
            />
          );
        case 'ai2':
          return hasSapling ? (
            <Sapling
              isOriginal={isOriginal}
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
          ) : (
            <NoSapling
              activeSapling={configAiCheck.activeSapling}
              onPressAdReward={onPressAdReward}
            />
          );
        case 'human':
          return hasHuman ? (
            <Human
              hideFooterButton={hideFooterButton}
              diary={diary}
              editDiary={editDiary}
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressRevise={onPressRevise}
            />
          ) : (
            <NoHuman activeHuman={configAiCheck.activeHuman} />
          );
        default:
          return null;
      }
    },
    [
      checkPermissions,
      configAiCheck.activeHuman,
      configAiCheck.activeSapling,
      diary,
      editDiary,
      goToRecord,
      hasHuman,
      hasSapling,
      hideFooterButton,
      isOriginal,
      languageTool?.textMatches,
      languageTool?.titleMatches,
      onPressAdReward,
      onPressRevise,
      sapling?.textEdits,
      sapling?.titleEdits,
      text,
      title,
    ],
  );

  const renderTabBar = useCallback((props) => {
    return <MyDiaryTabBar {...props} />;
  }, []);

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
