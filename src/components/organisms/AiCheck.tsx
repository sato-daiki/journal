import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import {
  Diary,
  LanguageTool as LanguageToolType,
  Sapling as SaplingType,
  ProWritingAid as ProWritingAidType,
  User,
  LongCode,
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
import YetHuman from './YetHuman';

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
  user: User;
  setUser: (user: User) => void;
}

const initialLayout = { width: Dimensions.get('window').width };

export type TabKey = 'ai1' | 'ai2' | 'ai3' | 'human';

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
  user,
  checkPermissions,
  goToRecord,
  onPressRevise,
  onPressCheck,
  onPressAdReward,
  onPressBecome,
  setUser,
}) => {
  const [index, setIndex] = useState(0);
  const routes: { key: string; title: string }[] = useMemo(() => {
    const shortLongCode = getLanguageToolCode(diary.longCode);
    const localeLongCode = getLanguageToolCode(I18n.locale as LongCode);
    const baseRoutes = [
      { key: 'ai1', title: I18n.t('myDiary.ai1') },
      { key: 'ai2', title: I18n.t('myDiary.ai2') },
    ];
    if (shortLongCode === 'en') {
      baseRoutes.push({ key: 'ai3', title: I18n.t('myDiary.ai3') });
    }

    if (shortLongCode !== 'nl' && localeLongCode === 'ja') {
      baseRoutes.push({ key: 'human', title: I18n.t('myDiary.human') });
    }
    return baseRoutes;
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
          return !diary.human ? (
            <NoHuman
              activeHuman={configAiCheck.activeHuman}
              diary={diary}
              user={user}
              setUser={setUser}
              editDiary={editDiary}
            />
          ) : diary.human.status === 'yet' ? (
            <YetHuman />
          ) : (
            <Human
              hideFooterButton={hideFooterButton}
              diary={diary}
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
      configAiCheck.activeHuman,
      configAiCheck.activeProWritingAid,
      configAiCheck.activeSapling,
      diary,
      editDiary,
      goToRecord,
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
      setUser,
      text,
      title,
      user,
    ],
  );

  const renderTabBar = useCallback((props) => {
    return <MyDiaryTabBar {...props} />;
  }, []);

  if (!diary) {
    return null;
  }

  return (
    <TabView
      lazy={({ route }) => route.key === 'human'}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
      initialLayout={initialLayout}
    />
  );
};

export default AiCheck;
