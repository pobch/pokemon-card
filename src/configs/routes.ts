enum RouteKey {
  OriginalPokemons,
  CustomPokemons,
  SignIn,
}

const routes: Record<RouteKey, { path: string }> = {
  [RouteKey.OriginalPokemons]: {
    path: '/',
  },
  [RouteKey.CustomPokemons]: {
    path: '/custom',
  },
  [RouteKey.SignIn]: {
    path: '/signin',
  },
}

export { routes, RouteKey }
