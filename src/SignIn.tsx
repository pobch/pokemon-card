import { useEffect } from 'react'
import { Typography } from 'antd'
import { ui } from './firebase/init'
import firebase from 'firebase/app'

const { Title } = Typography

function SignIn() {
  useEffect(() => {
    console.log('isPendingRedirect', ui.isPendingRedirect())

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: process.env.REACT_APP_REDIRECT_URL_AFTER_LOGIN,
    })
  }, [])

  return (
    <>
      <Title>Sign In</Title>
      <div id="firebaseui-auth-container"></div>
    </>
  )
}

export { SignIn }
