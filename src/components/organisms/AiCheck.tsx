import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { Diary, Edit, Match } from '@/types';
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
  titleMatches: Match[] | [] | undefined;
  textMatches: Match[] | [] | undefined;
  titleEdits: Edit[] | [] | undefined;
  textEdits: Edit[] | [] | undefined;
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
  titleMatches,
  textMatches,
  titleEdits,
  textEdits,
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
              titleArray={titleMatches}
              textArray={textMatches}
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
              titleArray={titleEdits}
              textArray={textEdits}
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
      onPressRevise,
      text,
      textEdits,
      textMatches,
      title,
      titleEdits,
      titleMatches,
    ],
  );

  const renderTabBar = useCallback((props) => {
    return <ChildTabBar {...props} />;
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
