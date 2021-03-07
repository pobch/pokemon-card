import { BrowserRouter, Switch, Route } from 'react-router-dom'
import OriginalPokemon from './OriginalPokemon'
import NotFoundPage from './NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <OriginalPokemon />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
