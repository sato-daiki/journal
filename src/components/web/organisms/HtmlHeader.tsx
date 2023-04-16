import React from 'react';
import * as Localization from 'expo-localization';
import { Helmet } from 'react-helmet';
import I18n from '../../../utils/I18n';

interface Props {
  options?: I18n.TranslateOptions;
}

const HtmlHeader: React.FC<Props> = ({ options }) => {
  const code = Localization.locale.split('-')[0];
  return (
    <Helmet>
      <html lang={!options || !options.locale ? code : options.locale} />
      <meta charSet='utf-8' />
      <title>{I18n.t('helmet.ogTitle', options)}</title>
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

      {/** IMPORTANT */}
      <meta name='keyword' content={I18n.t('helmet.keyword', options)} />
      <meta
        name='description'
        content={I18n.t('helmet.description', options)}
      />

      {/** FOR WEB */}
      <meta property='og:url' content='https://interchao.app' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={I18n.t('helmet.ogTitle', options)} />
      <meta
        name='og:description'
        content={I18n.t('helmet.ogDescription', options)}
      />
      <meta property='og:site_name' content='Interchao' />
      <meta property='og:image' content='https://interchao.app/img/icon.png' />

      {/** FOR TWITTER */}
      <meta name='twitter:title' content={I18n.t('helmet.ogTitle', options)} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@Interchao' />
      <meta name='twitter:image' content='https://interchao.app/img/top.jpg' />

      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32.png' />
      <link rel='shortcut icon' href='/favicon.ico' />
      <link
        rel='alternate'
        hrefLang='x-default'
        href='https://interchao.app/'
      />
      <link
        rel='alternate'
        hrefLang='ja'
        href='https://interchao.app/?lang=ja'
      />
      <link
        rel='alternate'
        hrefLang='en'
        href='https://interchao.app/?lang=en'
      />
      <link rel='canonical' href='https://interchao.app/' />
    </Helmet>
  );
};

export default HtmlHeader;
