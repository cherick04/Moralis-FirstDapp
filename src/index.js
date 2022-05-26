import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { MoralisProvider } from 'react-moralis'

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId="2vYNbzz1D8dGhM0utLyRskoUx0KMabejKEm9C4qH"
      serverUrl="https://khabrprbim8a.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
