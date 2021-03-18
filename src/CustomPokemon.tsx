import firebase from 'firebase/app'
import { Typography, Form, Input, Button, Space, Row, Col } from 'antd'
import { db } from './firebase/init'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PokemonCard } from './PokemonCard'

const { Title } = Typography

function CustomPokemon() {
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const mutationAddPokemon = useMutation(
    async (newPokemon: Record<string, any>) => {
      const docRef = await db
        .collection('pokemons')
        .add({ name: newPokemon.name, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
      return docRef
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries('customPokemons')
        form.resetFields()
      },
    }
  )

  const { status, error, data, isFetching } = useQuery(
    'customPokemons',
    async (): Promise<{ name: string; id: string; createdAt: firebase.firestore.Timestamp }[]> => {
      const querySnapshot = await db.collection('pokemons').orderBy('createdAt', 'desc').get()
      let customPokemons: {
        name: string
        id: string
        createdAt: firebase.firestore.Timestamp
      }[] = []
      querySnapshot.forEach((doc) => {
        const customPokemon = {
          ...(doc.data() as { name: string; createdAt: firebase.firestore.Timestamp }),
          id: doc.id,
        }
        customPokemons.push(customPokemon)
      })
      return customPokemons
    }
  )

  const mutationRemovePokemon = useMutation(
    async (id: string) => {
      return db.collection('pokemons').doc(id).delete()
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('customPokemons')
      },
    }
  )

  return (
    <>
      <Title>Custom Pokemon</Title>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form onFinish={mutationAddPokemon.mutate} form={form}>
          <Title level={4}>Add your new Pokemon!</Title>
          <Form.Item
            name="name"
            label="Pokemon Name"
            rules={[{ required: true, message: 'Pokemon name is required' }]}
          >
            <Input disabled={mutationAddPokemon.isLoading} style={{ maxWidth: 560 }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={mutationAddPokemon.isLoading}>
              Add
            </Button>
          </Form.Item>
        </Form>

        <Row gutter={[16, 16]}>
          {data?.map((customPokemon) => {
            return (
              <Col key={customPokemon.id} sm={12} lg={8} span={24}>
                <PokemonCard status={status} pokemonName={customPokemon.name} pokemonImgSrc="" />
                <div style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => mutationRemovePokemon.mutate(customPokemon.id)}
                    loading={mutationRemovePokemon.isLoading}
                  >
                    Remove
                  </Button>
                </div>
              </Col>
            )
          })}
        </Row>
      </Space>
    </>
  )
}

export { CustomPokemon }
