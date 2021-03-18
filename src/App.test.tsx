import { render, screen, waitFor } from '@testing-library/react'
import { App } from './App'

test('renders pokemons', async () => {
  const { debug } = render(<App />)
  await waitFor(
    () => {
      const pokemon = screen.getByText(/Nidorina/i)
      expect(pokemon).toBeInTheDocument()
    },
    { timeout: 3000 }
  )
  debug()
})
