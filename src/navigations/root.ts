import { PathConfigMap } from '@react-navigation/native';

const common = {
  UserProfile: {
    path: ':userName',
  },
  ReviewList: {
    path: ':userName/reviews',
  },
  UserDiary: {
    path: ':userName/entries/:objectID',
  },
};

export const getConfig = ():
  | {
      initialRouteName?: string | undefined;
      screens: PathConfigMap;
    }
  | undefined => {
  return {
    screens: {
      Auth: {
        initialRouteName: 'Initialize',
        screens: {
          Initialize: {
            path: '',
          },
          SelectLanguage: {
            path: 'language',
            exact: true,
          },
          InputUserName: {
            path: 'username',
          },
          SignIn: {
            path: 'login',
          },
          SignUp: {
            path: 'email',
          },
          ForegetPassword: {
            path: 'foreget',
          },
          notfound: '*',
        },
      },
      Main: {
        initialRouteName: 'Home',
        screens: {
          Home: {
            screens: {
              MyDiaryTab: {
                initialRouteName: 'MyDiaryList',
                screens: {
                  MyDiaryList: {
                    path: 'home',
                  },
                  MyDiary: {
                    path: 'mydiaries/:objectID',
                  },
                  ...common,
                },
              },
              TeachDiaryTab: {
                initialRouteName: 'TeachDiaryList',
                screens: {
                  TeachDiaryList: {
                    path: 'entries',
                  },
                  TeachDiarySearch: {
                    path: 'search',
                  },
                  TeachDiary: {
                    path: 'entries/:userName/:objectID',
                  },
                  // ...common,
                },
              },
              MyPageTab: {
                initialRouteName: 'MyPage',
                screens: {
                  MyPage: {
                    path: 'mypage',
                  },
                  Setting: {
                    path: 'settings',
                  },
                  Inquiry: {
                    path: 'inquiry',
                  },
                  EditEmail: {
                    path: 'settings/mail',
                  },
                  EditPassword: {
                    path: 'settings/password',
                  },
                  RegisterEmailPassword: {
                    path: 'settings/register',
                  },
                  DeleteAcount: {
                    path: 'settings/delete',
                  },
                  ForegetPassword: {
                    path: 'settings/foreget',
                  },
                  // ...common,
                },
              },
            },
          },
          ModalEditMyDiaryList: {
            screens: {
              EditMyDiaryList: {
                path: 'home/edit',
              },
            },
          },
          ModalSelectDiaryType: {
            screens: {
              SelectDiaryType: {
                path: 'entry/type',
              },
              SelectThemeSubcategory: {
                path: 'entry/subcategory',
              },
            },
          },
          ModalThemeGuide: {
            screens: {
              ThemeGuide: {
                path: 'entry/guide',
              },
            },
          },
          ModalPostDiary: {
            screens: {
              PostDiary: {
                path: 'entry/new',
              },
            },
          },
          ModalPostDraftDiary: {
            screens: {
              PostDraftDiary: {
                path: 'mydiaries/:objectID/edit',
              },
            },
          },
          ModalEditMyProfile: {
            initialRouteName: 'EditMyProfile',
            screens: {
              EditMyProfile: {
                path: 'mypage/edit',
              },
              EditUserName: {
                path: 'mypage/edit/username',
              },
            },
          },
          ModalReview: {
            screens: {
              Review: {
                path: ':userName/:objectID/:correctedNum/review',
              },
            },
          },
          ModalAbout: {
            screens: {
              About: {
                path: 'about',
              },
            },
          },
        },
      },
      Loading: {
        initialRouteName: '',
        screens: {
          Loading: {
            path: 'loading',
          },
        },
      },
    },
  };
};
