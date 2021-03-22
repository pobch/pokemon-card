import { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'firebase/app'

type AccountType = {
  displayName: string | null
  email: string | null
  uid: string
  accessToken: string
}

const accountContext = createContext<{
  account: AccountType | null
  isLoadingAuth: boolean
} | null>(null)

function AccountProvider({ children }: { children: React.ReactElement }) {
  const [account, setAccount] = useState<AccountType | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          // User is signed in.

          // var displayName = user.displayName
          // var email = user.email
          // var emailVerified = user.emailVerified
          // var photoURL = user.photoURL
          // var uid = user.uid
          // var phoneNumber = user.phoneNumber
          // var providerData = user.providerData
          user.getIdToken().then((accessToken) => {
            setAccount({
              ...user,
              accessToken,
            })
            setIsLoadingAuth(false)
          })
        } else {
          // User is signed out.
          setAccount(null)
          setIsLoadingAuth(false)
        }
      },
      function (error) {
        console.log(error)
      }
    )
  }, [])

  return (
    <accountContext.Provider value={{ account, isLoadingAuth }}>{children}</accountContext.Provider>
  )
}

function useAccountConsumer() {
  const state = useContext(accountContext)
  if (state === null) {
    throw new Error('AccountContext Consumer needs to use under AccountContext Provider')
  }
  return state
}

export { accountContext, AccountProvider, useAccountConsumer }
