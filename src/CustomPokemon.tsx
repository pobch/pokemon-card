import firebase from 'firebase/app'
import { Typography, Form, Input, Button, Space, Row, Col, Upload } from 'antd'
import { db, storage } from './firebase/init'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PokemonCard } from './PokemonCard'
import { ReactQueryDevtools } from 'react-query/devtools'

const { Title } = Typography

type PokemonData = {
  id: string
  name: string
  avatar: string
  createdAt: firebase.firestore.Timestamp
}

function CustomPokemon() {
  const queryClient = useQueryClient()
  const [form] = Form.useForm()

  const mutationAddPokemon = useMutation(
    async (newPokemon: Record<string, any>) => {
      const docRef = await db.collection('pokemons').add({
        name: newPokemon.name,
        avatar: newPokemon.avatar[0].response.download_url,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
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
    async (): Promise<PokemonData[]> => {
      const querySnapshot = await db.collection('pokemons').orderBy('createdAt', 'desc').get()
      let customPokemons: PokemonData[] = []
      querySnapshot.forEach((doc) => {
        const customPokemon = {
          ...(doc.data() as Omit<PokemonData, 'id'>),
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

  function bindOnChangeToValue(e: any) {
    if (Array.isArray(e)) {
      return e
    }

    return e && e.fileList
  }

  async function customUpload({ onError, onSuccess, file, filename }: any) {
    try {
      const storageRef = await storage.ref()
      const imageName = file.name
      const imgFile = storageRef.child(`public/${filename}-${Date.now()}-${imageName}`)
      const snapshot = await imgFile.put(file)
      const url = await snapshot.ref.getDownloadURL()
      onSuccess({ download_url: url })
    } catch (e) {
      onError(e)
    }
  }

  return (
    <>
      <Title>Custom Pokemon</Title>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Form
          onFinish={mutationAddPokemon.mutate}
          form={form}
          style={{ maxWidth: 560 }}
          // onFieldsChange={(_, allFields) =>
          //   console.log('allFields', JSON.stringify(allFields, undefined, 2))
          // }
        >
          <Title level={4}>Add your new Pokemon!</Title>
          <Form.Item
            name="name"
            label="Pokemon Name"
            rules={[{ required: true, message: 'Pokemon name is required' }]}
          >
            <Input disabled={mutationAddPokemon.isLoading} />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Avatar"
            rules={[{ required: true }]}
            valuePropName="fileList"
            getValueFromEvent={bindOnChangeToValue}
          >
            <Upload
              name="logo"
              listType="picture"
              customRequest={customUpload}
              accept="image/*"
              maxCount={1}
            >
              <Button>Click to Upload</Button>
            </Upload>
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
                <PokemonCard
                  status={status}
                  pokemonName={customPokemon.name}
                  pokemonImgSrc={customPokemon.avatar}
                />
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
      <ReactQueryDevtools />
    </>
  )
}

export { CustomPokemon }
