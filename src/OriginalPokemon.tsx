import { Typography } from 'antd'
import { useQuery } from 'react-query'
import axios from 'axios'

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=30'

const { Title } = Typography

function OriginalPokemon() {
  const { isLoading, error, data, isFetching } = useQuery('pokemons', async () => {
    const response = await axios.get(URL)
    return response.data
  })

  console.log('DATA: ', data)

  return (
    <>
      <Title>Original Pokemons</Title>
    </>
  )
}

export default OriginalPokemon
