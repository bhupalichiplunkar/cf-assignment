import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import store, { history } from './store'
import App from './containers/app'

import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={enUS}>
        <App />
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>,
  target
)