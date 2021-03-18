import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import { App } from './App'
import './firebase/init'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
