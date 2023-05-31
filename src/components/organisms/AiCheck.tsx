import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import {
  Diary,
  LanguageTool as LanguageToolType,
  Sapling as SaplingType,
  ProWritingAid as ProWritingAidType,
} from '@/types';
import { MyDiaryTabBar } from '@/components/molecules';
import LanguageTool from '@/components/organisms/LanguageTool';
import Sapling from '@/components/organisms/Sapling';
import I18n from '@/utils/I18n';
import NoAi from './NoAi';
import { ConfigAiCheck } from './MyDiary/MyDiary';
import NoHuman from './NoHuman';
import Human from './Human';
import { AiName, getLanguageToolCode } from '@/utils/grammarCheck';
import ProWritingAid from './ProWritingAid';

interface Props {
  isOriginal: boolean;
  isPremium: boolean;
  hideFooterButton: boolean;
  diary: Diary;
  editDiary: (objectID: string, diary: Diary) => void;
  onPressRevise?: () => void;
  onPressCheck?: (aiName: AiName) => void;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressAdReward?: (aiName: AiName) => void;
  onPressBecome?: () => void;
  successSapling?: boolean;
  successProWritingAid?: boolean;
  configAiCheck: ConfigAiCheck;
  title: string;
  text: string;
  languageTool?: LanguageToolType | null;
  sapling?: SaplingType | null;
  proWritingAid?: ProWritingAidType | null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const AiCheck: React.FC<Props> = ({
  isOriginal,
  isPremium,
  hideFooterButton,
  diary,
  editDiary,
  title,
  text,
  languageTool,
  sapling,
  proWritingAid,
  successSapling,
  successProWritingAid,
  configAiCheck,
  checkPermissions,
  goToRecord,
  onPressRevise,
  onPressCheck,
  onPressAdReward,
  onPressBecome,
}) => {
  const [index, setIndex] = useState(0);
  const routes = useMemo(() => {
    const shortLongCode = getLanguageToolCode(diary.longCode);
    if (shortLongCode === 'en') {
      return [
        { key: 'ai1', title: I18n.t('myDiary.ai1') },
        { key: 'ai2', title: I18n.t('myDiary.ai2') },
        { key: 'ai3', title: I18n.t('myDiary.ai3') },
      ];
    } else {
      return [
        { key: 'ai1', title: I18n.t('myDiary.ai1') },
        { key: 'ai2', title: I18n.t('myDiary.ai2') },
      ];
    }
  }, [diary.longCode]);

  useEffect(() => {
    if (successSapling) {
      setIndex(1);
    }
  }, [successSapling]);

  useEffect(() => {
    if (successProWritingAid) {
      setIndex(2);
    }
  }, [successProWritingAid]);

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

  const hasProWritingAid = useMemo(
    () =>
      !!proWritingAid &&
      (proWritingAid.titleResult === 'corrected' ||
        proWritingAid.titleResult === 'perfect' ||
        proWritingAid.textError === 'corrected' ||
        proWritingAid.textError === 'perfect'),
    [proWritingAid],
  );

  const hasHuman = useMemo(() => !!diary.human, [diary.human]);

  const renderScene = useCallback(
    ({ route }) => {
      switch (route.key) {
        case 'ai1':
          return (
            <LanguageTool
              isOriginal={isOriginal}
              isPremium={isPremium}
              showSaplingCheck={
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
              onPressCheck={() => onPressCheck?.('Sapling')}
              onPressAdReward={() => onPressAdReward?.('Sapling')}
              onPressBecome={onPressBecome}
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
            <NoAi
              isPremium={isPremium}
              aiName={'Sapling'}
              active={configAiCheck.activeSapling}
              onPressCheck={onPressCheck}
              onPressAdReward={onPressAdReward}
              onPressBecome={onPressBecome}
            />
          );
        case 'ai3':
          return hasProWritingAid ? (
            <ProWritingAid
              isOriginal={isOriginal}
              hideFooterButton={hideFooterButton}
              diary={diary}
              title={title}
              text={text}
              titleArray={proWritingAid?.titleTags}
              textArray={proWritingAid?.textTags}
              editDiary={editDiary}
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressRevise={onPressRevise}
            />
          ) : (
            <NoAi
              isPremium={isPremium}
              aiName={'ProWritingAid'}
              active={configAiCheck.activeProWritingAid}
              onPressCheck={onPressCheck}
              onPressAdReward={onPressAdReward}
              onPressBecome={onPressBecome}
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
      configAiCheck.activeProWritingAid,
      configAiCheck.activeSapling,
      diary,
      editDiary,
      goToRecord,
      hasHuman,
      hasProWritingAid,
      hasSapling,
      hideFooterButton,
      isOriginal,
      isPremium,
      languageTool?.textMatches,
      languageTool?.titleMatches,
      onPressAdReward,
      onPressBecome,
      onPressCheck,
      onPressRevise,
      proWritingAid?.textTags,
      proWritingAid?.titleTags,
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
