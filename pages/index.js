import Layout from '../components/layout'
import Category from './category/[slug]'
import { useReducer } from 'react'

export const CartContext = React.createContext()

const initialState = { displayCart: false, view: 'half' }

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_CART':
      return { ...initialState, displayCart: true, view: 'half' }
    case 'CLOSE_CART':
      return { ...initialState, displayCart: false, view: 'half' }
    case 'FULL_VIEW':
      return { ...initialState, displayCart: true, view: 'full' }
    default:
      return initialState
  }
}

const Home = () => {
  const [cart, setCart] = useReducer(reducer, initialState)
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Layout>
        <Category />
      </Layout>
    </CartContext.Provider>
  )
}

export default Home
