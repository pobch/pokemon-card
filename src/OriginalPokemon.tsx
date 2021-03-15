import { Typography, Card, Row, Col, Pagination, Space, Grid } from 'antd'
import { useQuery } from 'react-query'
import { useLocation, useHistory } from 'react-router-dom'
import { routes } from './configs/routes'
import axios from 'axios'

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=30'

const { Title } = Typography
const { useBreakpoint } = Grid

function OriginalPokemon() {
  const querystring = new URLSearchParams(useLocation().search)
  const page = Number(querystring.get('page'))
  let offset = 0
  if (page && page >= 1) {
    offset = (page - 1) * 30
  }

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

  const history = useHistory()
  function handlePageChange(pageNumber: number) {
    history.push(routes.originalPokemons.path + '?page=' + pageNumber)
  }

  const screens = useBreakpoint()

  if (status === 'loading') {
    return (
      <>
        <Title>Loading...</Title>
      </>
    )
  }

  if (status === 'error') {
    return (
      <>
        <Title>Error while fetching the list of pokemon</Title>
      </>
    )
  }

  const paginationComponent = (
    <Pagination
      simple={screens.xs}
      showQuickJumper
      showSizeChanger={false}
      current={page <= 1 ? 1 : page}
      pageSize={30}
      total={data?.count}
      onChange={handlePageChange}
      style={{ textAlign: 'center' }}
    />
  )
  return (
    <>
      <Title>Original Pokemons</Title>
      <Space direction="vertical" size="middle">
        {paginationComponent}
        <Row gutter={[16, 16]}>
          {pokemonUrls.map((url: string) => (
            <PokemonCard key={url} url={url} />
          ))}
        </Row>
        {paginationComponent}
      </Space>
    </>
  )
}

const { Meta } = Card

function PokemonCard({ url }: { url: string }) {
  const { status, error, data, isFetching } = useQuery(['pokemon', url], async () => {
    const response = await axios.get(url)
    return response.data
  })

  return (
    <Col sm={12} lg={8} span={24}>
      <Card
        // hoverable
        cover={
          <div style={{ position: 'relative', height: 0, paddingTop: '100%' }}>
            <img
              alt={data?.name}
              src={data?.sprites?.other?.['official-artwork']?.front_default}
              style={{ position: 'absolute', top: 0, left: 0, maxWidth: '100%', width: 'auto' }}
            />
          </div>
        }
        style={{ maxWidth: 240, margin: '0 auto' }}
      >
        {status === 'loading' && <Meta title="Loading..." />}
        {status === 'error' && <Meta title="Error while fetching a pokemon detail" />}
        <Meta
          title={
            <Title
              level={3}
              style={{ textTransform: 'capitalize', textAlign: 'center', whiteSpace: 'normal' }}
            >
              {data?.name}
            </Title>
          }
        />
      </Card>
    </Col>
  )
}

export default OriginalPokemon
