import * as React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as ja from 'react-intl/locale-data/ja';
import { configureStore } from '@/store/configureStore';
import Root from '@/features/root';

export const store = configureStore();

addLocaleData(ja);
addLocaleData(en);
const messages = require.context('../../locales/', false, /\.json$/);
const messagesForLocale = (locale: string) => messages(`./${locale}.json`);

interface Props {
  locale: string;
}

export default class Lagune extends React.PureComponent<Props> {

  public render () {
    const { locale } = this.props;

    return (
      <IntlProvider locale={locale} messages={messagesForLocale(locale)}>
        <Provider store={store} >
          <BrowserRouter>
            <Switch>
              <Route path='/' component={Root} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </IntlProvider>
    );
  }

}
