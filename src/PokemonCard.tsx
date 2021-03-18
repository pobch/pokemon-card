import { QueryStatus } from 'react-query'
import { Card, Typography } from 'antd'

const { Meta } = Card
const { Title } = Typography

function PokemonCard({
  status,
  pokemonName,
  pokemonImgSrc,
}: {
  status: QueryStatus
  pokemonName: string
  pokemonImgSrc: string
}) {
  return (
    <Card
      // hoverable
      cover={
        <div style={{ position: 'relative', height: 0, paddingTop: '100%' }}>
          <img
            alt={pokemonName}
            src={pokemonImgSrc}
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
            {pokemonName}
          </Title>
        }
      />
    </Card>
  )
}

export { PokemonCard }
