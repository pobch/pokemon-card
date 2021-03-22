import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { routes, RouteKey } from './configs/routes'
import { OriginalPokemon } from './OriginalPokemon'
import { NotFoundPage } from './NotFoundPage'
import { PageLayout } from './PageLayout'
import { CustomPokemon } from './CustomPokemon'
import { SignIn } from './SignIn'
import { AccountProvider, useAccountConsumer } from './AccountContext'

const queryClient = new QueryClient()

function App() {
  return (
    <AccountProvider>
      <QueryClientProvider client={queryClient}>
        <Routers />
      </QueryClientProvider>
    </AccountProvider>
  )
}

function Routers() {
  const { account, isLoadingAuth } = useAccountConsumer()

  if (isLoadingAuth) {
    return null
  }

  if (!account) {
    // Unauthed routes
    return (
      <BrowserRouter>
        <PageLayout>
          <Switch>
            <Route exact path={routes[RouteKey.OriginalPokemons].path}>
              <OriginalPokemon />
            </Route>
            <Route exact path={routes[RouteKey.SignIn].path}>
              <SignIn />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </PageLayout>
      </BrowserRouter>
    )
  }

  // Authed routes
  return (
    <BrowserRouter>
      <PageLayout>
        <Switch>
          <Route exact path={routes[RouteKey.OriginalPokemons].path}>
            <OriginalPokemon />
          </Route>
          <Route exact path={routes[RouteKey.CustomPokemons].path}>
            <CustomPokemon />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </PageLayout>
    </BrowserRouter>
  )
}

export { App }
