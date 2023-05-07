import { EikentTitle } from '@/screens/Modal/SelectEikenScreen/config/title';

// https://www.cel-eigo.com/contents/essay/ もっとある

export const getEiken1 = (): EikentTitle[] => {
  return [
    {
      subTitle: '2022年度第3回',
      title:
        'Agree or disagree: Industrialization has had an overall beneficial effect on humankind',
      subcategory: '1-2022-3',
    },
    {
      subTitle: '2022年度第2回',
      title:
        'Agree or disagree: Human societies will always have a negative effect on the environment',
      subcategory: '1-2022-2',
    },
    {
      subTitle: '2022年度第1回',
      title:
        'Agree or disagree: Genetic engineering will have a positive influence on society in the future',
      subcategory: '1-2022-1',
    },

    {
      subTitle: '2021年度第3回',
      title:
        'Should investment in technology be a bigger priority for governments?',
      subcategory: '1-2021-3',
    },
    {
      subTitle: '2021年度第2回',
      title: 'Can individual privacy be protected in the modern world?',
      subcategory: '1-2021-2',
    },
    {
      subTitle: '2021年度第1回',
      title: 'Are economic sanctions a useful foreign-policy tool?',
      subcategory: '1-2021-1',
    },

    {
      subTitle: '2020年度第3回',
      title:
        'Agree or disagree: Globalization is a positive force in today’s world',
      subcategory: '1-2020-3',
    },
    {
      subTitle: '2020年度第2回',
      title:
        'Agree or disagree: Global overpopulation is a serious threat to the future of humankind',
      subcategory: '1-2020-2',
    },
    {
      subTitle: '2020年度第1回',
      title:
        'Agree or disagree: Improving relations with other Asian nations should be a priority for the Japanese government',
      subcategory: '1-2020-1',
    },

    {
      subTitle: '2019年度第3回',
      title: 'Can renewable energy sources replace fossil fuels?',
      subcategory: '1-2019-3',
    },
    {
      subTitle: '2019年度第2回',
      title: 'Is space exploration worth the cost?',
      subcategory: '1-2019-2',
    },
    {
      subTitle: '2019年度第1回',
      title:
        'Agree or disagree: Infectious diseases will become a bigger problem in the coming decades?',
      subcategory: '1-2019-1',
    },

    {
      subTitle: '2018年度第3回',
      title:
        'Is a worldwide ban on weapons of mass destruction an attainable goal?',
      subcategory: '1-2018-3',
    },
    {
      subTitle: '2018年度第2回',
      title:
        'Has a university degree in the humanities lost its relevance in today’s world?',
      subcategory: '1-2018-2',
    },
    {
      subTitle: '2018年度第1回',
      title:
        'Agree or disagree: Japan will benefit overall from hosting the 2020 Summer Olympics',
      subcategory: '1-2018-1',
    },

    {
      subTitle: '2017年度第3回',
      title: 'Should Japan rethink its relationship with the United States?',
      subcategory: '1-2017-3',
    },
    {
      subTitle: '2017年度第2回',
      title:
        'Should developed nations encourage immigration from other countries?',
      subcategory: '1-2017-2',
    },
    {
      subTitle: '2017年度第1回',
      title: 'Can restrictions on freedom of speech ever be justified?',
      subcategory: '1-2017-1',
    },
  ];
};

// 最新のは過去問から https://www.eiken.or.jp/eiken/exam/grade_p1/solutions.html

export const getEikenPre1 = (): EikentTitle[] => {
  return [
    // 公式
    {
      subTitle: '2022年度第3回',
      title:
        'Agree or disagree: The government should do more to promote reusable products',
      subcategory: 'pre1-2022-3',
    },
    {
      subTitle: '2022年度第2回',
      title: 'Should people trust information on the Internet?',
      subcategory: 'pre1-2022-2',
    },
    {
      subTitle: '2022年度第1回',
      title: "Should people's salaries be based on their job performance?",
      subcategory: 'pre1-2022-1',
    },

    // 公式
    {
      subTitle: '2021年度第3回',
      title: 'Should people stop using goods that are made from animals?',
      subcategory: 'pre1-2021-3',
    },
    {
      subTitle: '2021年度第2回',
      title: 'Is it beneficial for workers to change jobs often?',
      subcategory: 'pre1-2021-2',
    },
    {
      subTitle: '2021年度第1回',
      title:
        'Agree or disagree: Big companies have a positive effect on society',
      subcategory: 'pre1-2021-1',
    },

    {
      subTitle: '2020年度第3回',
      title:
        'Agree or disagree: More people should become vegetarians in the future',
      subcategory: 'pre1-2020-3',
    },
    {
      subTitle: '2020年度第2回',
      title:
        'Agree or disagree: More needs to be done to improve public safety',
      subcategory: 'pre1-2020-2',
    },

    // 以下これ https://eikeneisakubun.ti-da.net/c443417.html
    {
      subTitle: '2020年度第1回',
      title:
        'Is it a good idea for local government to build tourist sites, such as theme parks and museums?',
      subcategory: 'pre1-2020-1',
    },

    {
      subTitle: '2019年度第3回',
      title: 'Do companies need to improve the way they treat their workers?',
      subcategory: 'pre1-2019-3',
    },
    {
      subTitle: '2019年度第2回',
      title: 'Is space exploration worth the cost?',
      subcategory: 'pre1-2019-2',
    },
    {
      subTitle: '2019年度第1回',
      title: 'Do companies need to improve the way they treat their workers?',
      subcategory: 'pre1-2019-1',
    },

    {
      subTitle: '2018年度第3回',
      title:
        'Agree or disagree: Japanese companies should hire more foreign workers.',
      subcategory: 'pre1-2018-3',
    },
    {
      subTitle: '2018年度第2回',
      title: 'Should Japan do more to protect its historic sites?',
      subcategory: 'pre1-2018-2',
    },
    {
      subTitle: '2018年度第1回',
      title: 'Is it acceptable to keep animals in zoos?',
      subcategory: 'pre1-2018-1',
    },

    {
      subTitle: '2017年度第3回',
      title: 'Will humans live on other planets someday?',
      subcategory: 'pre1-2017-3',
    },
    {
      subTitle: '2017年度第2回',
      title:
        'Agree or disagree: The Japanese government should do more to protect the environment',
      subcategory: 'pre1-2017-2',
    },
    {
      subTitle: '2017年度第1回',
      title:
        'Agree or disagree: Japan should become a completely cashless society',
      subcategory: 'pre1-2017-1',
    },
  ];
};

export const getEiken2 = (): EikentTitle[] => {
  return [
    // 公式
    {
      subTitle: '2022年度第3回',
      title:
        'Some people say that Japan should use the Internet for people to vote in elections. Do you agree with this opinion?',
      subcategory: '2-2022-3',
    },
    {
      subTitle: '2022年度第2回',
      title:
        'Some people say that Japan should accept more people from other countries to work in Japan. Do you agree with this opinion?',
      subcategory: '2-2022-2',
    },
    {
      subTitle: '2022年度第1回',
      title:
        'Some people say that it is necessary for people to go to important historical sites in order to understand history better. Do you agree with this opinion?',
      subcategory: '2-2022-1',
    },

    {
      subTitle: '2021年度第3回',
      title:
        'Today in Japan, many buildings and public areas have a lot of lights for decoration, such as the lights used during Christmas. Do you think this is a good idea?',
      subcategory: '2-2021-3',
    },
    {
      subTitle: '2021年度第2回',
      title:
        'It is sometimes said that all people should be able to enter museums for free. Do you agree with this opinion?',
      subcategory: '2-2021-2',
    },
    {
      subTitle: '2021年度第1回',
      title:
        'It is often said that restaurants and supermarkets should try to reduce the amount of food that they throw away. Do you agree with this opinion?',
      subcategory: '2-2021-1',
    },

    {
      subTitle: '2020年度第3回',
      title:
        'Some people say that more apartment buildings should allow pets such as dogs and cats. Do you agree with this opinion?',
      subcategory: '2-2020-3',
    },
    {
      subTitle: '2020年度第2回',
      title:
        'Some people say that young people should spend more time thinking about their future careers. Do you agree with this opinion?',
      subcategory: '2-2020-2',
    },
    // 以下 https://eikeneisakubun.ti-da.net/c443412.html
    {
      subTitle: '2020年度第1回',
      title:
        'People around the world live longer lives than they did in the past. Do you think people will live even longer lives in the future?',
      subcategory: '2-2020-1',
    },

    {
      subTitle: '2019年度第3回',
      title:
        'Some people prefer to buy food produced in their local area. Do you think more people will buy locally produced food in the future?',
      subcategory: '2-2019-3',
    },
    {
      subTitle: '2019年度第2回',
      title:
        'Do you think that the number of young people who do not work at large companies will increase in the future?',
      subcategory: '2-2019-2',
    },
    {
      subTitle: '2019年度第1回',
      title:
        'Some people say that people today should spend less time using the Internet. Do you agree with this opinion?',
      subcategory: '2-2019-1',
    },

    {
      subTitle: '2018年度第3回',
      title:
        'Some people say that playing sports helps children become better people. Do you agree with this opinion?',
      subcategory: '2-2018-3',
    },
    {
      subTitle: '2018年度第2回',
      title:
        'Today, some people buy products that are good for the environment. Do you think buying such products will become more common in the future?',
      subcategory: '2-2018-2',
    },
    {
      subTitle: '2018年度第1回',
      title:
        'Some people say that too much water is wasted in Japan. Do you agree with this opinion?',
      subcategory: '2-2018-1',
    },

    {
      subTitle: '2017年度第3回',
      title:
        'Some people say that the number of cars in cities should be limited. Do you agree with this idea?',
      subcategory: '2-2017-3',
    },
    {
      subTitle: '2017年度第2回',
      title:
        'It is often said that people today use too much electricity. Do you agree with this opinion?',
      subcategory: '2-2017-2',
    },
    {
      subTitle: '2017年度第1回',
      title:
        'Today more and more young people are starting their own companies. Do you think this is a good idea?',
      subcategory: '2-2017-1',
    },
  ];
};

export const getEikenPre2 = (): EikentTitle[] => {
  return [
    // 公式
    {
      subTitle: '2022年度第3回',
      title:
        'Do you think libraries should have more book events for children?',
      subcategory: 'pre2-2022-3',
    },
    {
      subTitle: '2022年度第2回',
      title:
        'Do you think it is good for people to use smartphones while studying?',
      subcategory: 'pre2-2022-2',
    },
    {
      subTitle: '2022年度第1回',
      title:
        'Do you think it is a good idea for people to learn how to cook by using the Internet?',
      subcategory: 'pre2-2022-1',
    },

    // サイト
    {
      subTitle: '2021年度第3回',
      title: 'Do you think there should be more sports programs on TV?',
      subcategory: 'pre2-2021-3',
    },
    {
      subTitle: '2021年度第2回',
      title:
        'Which do you think is better for people, borrowing books from library or buying books at stores?',
      subcategory: 'pre2-2021-2',
    },
    // 公式
    {
      subTitle: '2021年度第1回',
      title: 'Do you think it is a good idea for people to have a car?',
      subcategory: 'pre2-2021-1',
    },

    {
      subTitle: '2020年度第3回',
      title:
        'Do you think school classrooms in Japan should use air conditioners in the summer?',
      subcategory: 'pre2-2020-3',
    },
    {
      subTitle: '2020年度第2回',
      title: 'Do you think parents should take their children to museums?',
      subcategory: 'pre2-2020-2',
    },

    // 以下 https://eikeneisakubun.ti-da.net/c443412.html
    {
      subTitle: '2020年度第1回',
      title:
        'Do you think it is important for people to eat breakfast every day?',
      subcategory: 'pre2-2020-1',
    },

    {
      subTitle: '2019年度第3回',
      title: 'Do you like cooking for your family?',
      subcategory: 'pre2-2019-3',
    },
    {
      subTitle: '2019年度第2回',
      title:
        'Today, some people do not want to start working for large companies. Do you think the number of those people will increase in the future?',
      subcategory: 'pre2-2019-2',
    },
    {
      subTitle: '2019年度第1回',
      title:
        'Do you think it is better for people to live in a house or an apartment?',
      subcategory: 'pre2-2019-1',
    },

    {
      subTitle: '2018年度第3回',
      title:
        'Do you think it is important for students to learn how to give presentations at school?',
      subcategory: 'pre2-2018-3',
    },
    {
      subTitle: '2018年度第2回',
      title:
        'Do you think it is better for students to study alone or in a group?',
      subcategory: 'pre2-2018-2',
    },
    {
      subTitle: '2018年度第1回',
      title: 'Do you think parents should let their children play video games?',
      subcategory: 'pre2-2018-1',
    },

    {
      subTitle: '2017年度第3回',
      title: 'Do you think fast-food restaurant are a good thing for people?',
      subcategory: 'pre2-2017-3',
    },
    {
      subTitle: '2017年度第2回',
      title: 'Do you think it is important for children to play sports?',
      subcategory: 'pre2-2017-2',
    },
    {
      subTitle: '2017年度第1回',
      title:
        'Do you think it is better for people to eat at restaurants or at home?',
      subcategory: 'pre2-2017-1',
    },
  ];
};
