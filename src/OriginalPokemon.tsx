import { Typography } from 'antd'
import { useQuery, useQueries } from 'react-query'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=30'

const { Title } = Typography

function OriginalPokemon() {
  const querystring = new URLSearchParams(useLocation().search)
  const page = Number(querystring.get('page'))
  let offset = 0
  if (page && page >= 1) {
    offset = (page - 1) * 30
  }

  const {
    status: pokemonsStatue,
    error: pokemonsError,
    data: pokemons,
    isFetching: pokemonsIsFetching,
    isPreviousData: pokemonsIsPreviousData,
  } = useQuery(
    ['pokemons', offset],
    async () => {
      const response = await axios.get(URL + '&offset=' + offset)
      return response.data
    },
    { keepPreviousData: true }
  )

  const pokemonUrls =
    pokemons?.results?.map((pokemon: { name: string; url: string }) => pokemon.url) ?? []

  const pokemonQueries = useQueries(
    pokemonUrls.map((url: string) => {
      return {
        queryKey: ['pokemon', url],
        queryFn: async () => {
          const response = await axios.get(url)
          return response.data
        },
      }
    })
  )

  return (
    <>
      <Title>Original Pokemons</Title>
    </>
  )
}

export default OriginalPokemon
