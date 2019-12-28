import React from 'react'
import ReactDOM from 'react-dom'

import Chat from './Chat'

import './index.css'

ReactDOM.render(
  <Chat />,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept('./Chat', () => {
    // eslint-disable-next-line
    const NextChat = require('./Chat').default
    ReactDOM.render(
      <NextChat />,
      document.getElementById('root'),
    )
  })
}
