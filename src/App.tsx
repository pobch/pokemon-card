import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes } from './configs/routes'
import OriginalPokemon from './OriginalPokemon'
import NotFoundPage from './NotFoundPage'
import PageLayout from './PageLayout'
import CustomPokemon from './CustomPokemon'

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Switch>
          <Route exact path={routes.originalPokemons.path}>
            <OriginalPokemon />
          </Route>
          <Route exact path={routes.customPokemons.path}>
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

export default App
