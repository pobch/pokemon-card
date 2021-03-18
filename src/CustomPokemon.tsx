import { Typography, Form, Input, Button } from 'antd'
import { db } from './firebase/init'
import { useMutation } from 'react-query'

const { Title } = Typography

function CustomPokemon() {
  const mutation = useMutation(
    async (newPokemon: Record<string, any>) => {
      const docRef = await db.collection('pokemons').add({ name: newPokemon.name })
      return docRef
    },
    {
      onSuccess: (data, variables, context) => {
        console.log(data.id)
      },
    }
  )

  return (
    <>
      <Title>Custom Pokemon</Title>
      <Form onFinish={mutation.mutate}>
        <Title level={4}>Add your new Pokemon!</Title>
        <Form.Item
          name="name"
          label="Pokemon Name"
          rules={[{ required: true, message: 'Pokemon name is required' }]}
        >
          <Input disabled={mutation.isLoading} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={mutation.isLoading}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export { CustomPokemon }
