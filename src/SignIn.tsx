import { useEffect } from 'react'
import { Typography } from 'antd'
import { ui } from './firebase/init'
import firebase from 'firebase/app'

const { Title } = Typography

function SignIn() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName
          var email = user.email
          var emailVerified = user.emailVerified
          var photoURL = user.photoURL
          var uid = user.uid
          var phoneNumber = user.phoneNumber
          var providerData = user.providerData
          user.getIdToken().then(function (accessToken) {
            console.log('Signed in')
            console.log(
              'account-details',
              JSON.stringify(
                {
                  displayName: displayName,
                  email: email,
                  emailVerified: emailVerified,
                  phoneNumber: phoneNumber,
                  photoURL: photoURL,
                  uid: uid,
                  accessToken: accessToken,
                  providerData: providerData,
                },
                null,
                '  '
              )
            )
          })
        } else {
          // User is signed out.
          console.log('Signed out')
        }
      },
      function (error) {
        console.log(error)
      }
    )
  }, [])

  useEffect(() => {
    console.log('isPendingRedirect', ui.isPendingRedirect())

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: 'http://localhost:3000/signin',
    })
  }, [])

  return (
    <>
      <Title>Sign In Page</Title>
      <div id="firebaseui-auth-container"></div>
      <button type="button" onClick={() => firebase.auth().signOut()}>
        Sign Out
      </button>
    </>
  )
}

export { SignIn }
