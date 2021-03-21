import { Typography, Card, Row, Col, Pagination, Space, Grid } from 'antd'
import { useQuery } from 'react-query'
import { useLocation, useHistory } from 'react-router-dom'
import { RouteKey, routes } from './configs/routes'
import axios from 'axios'
import { PokemonCard } from './PokemonCard'

const { Title } = Typography

function OriginalPokemon() {
  return (
    <>
      <Title>Original Pokemons</Title>
      <PokemonList />
    </>
  )
}

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=30'

const { useBreakpoint } = Grid

function useGetPageFromURL() {
  const querystring = new URLSearchParams(useLocation().search)
  let page = Number(querystring.get('page'))
  if (!page || page <= 0) {
    page = 1
  }
  return page
}

function PokemonList() {
  const page = useGetPageFromURL()
  const offset = (page - 1) * 30

  const { status, error, data, isFetching, isPreviousData } = useQuery(
    ['pokemons', offset],
    async () => {
      const response = await axios.get(URL + '&offset=' + offset)
      return response.data
    },
    { keepPreviousData: true }
  )

  const pokemonUrls =
    data?.results?.map((pokemon: { name: string; url: string }) => pokemon.url) ?? []

  const totalPokemon = data?.count ?? 0

  if (status === 'loading') {
    return <>Loading...</>
  }

  if (status === 'error') {
    return <>Error while fetching the list of pokemon</>
  }

  return (
    <>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <PokemonPagination totalCount={totalPokemon} />
        <Row gutter={[16, 16]}>
          {pokemonUrls.map((url: string) => {
            return (
              <Col key={url} sm={12} lg={8} span={24}>
                <PokemonData url={url} />
              </Col>
            )
          })}
        </Row>
        <PokemonPagination totalCount={totalPokemon} />
      </Space>
    </>
  )
}

function PokemonPagination({ totalCount }: { totalCount: number }) {
  const page = useGetPageFromURL()

  const history = useHistory()
  function handlePageChange(pageNumber: number) {
    history.push(routes[RouteKey.OriginalPokemons].path + '?page=' + pageNumber)
  }

  const screens = useBreakpoint()

  return (
    <Pagination
      simple={screens.xs}
      showQuickJumper
      showSizeChanger={false}
      current={page}
      pageSize={30}
      total={totalCount}
      onChange={handlePageChange}
      style={{ textAlign: 'center' }}
    />
  )
}

const { Meta } = Card

function PokemonData({ url }: { url: string }) {
  const { status, error, data, isFetching } = useQuery(['pokemon', url], async () => {
    const response = await axios.get(url)
    return response.data
  })

  return (
    <PokemonCard
      status={status}
      pokemonName={data?.name}
      pokemonImgSrc={data?.sprites?.other?.['official-artwork']?.front_default}
    />
  )
}

export { OriginalPokemon }
