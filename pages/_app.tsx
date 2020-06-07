import { AppProps } from 'next/app'

import { useReducer, useEffect, createContext } from 'react'
import Router, { useRouter } from 'next/router'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import Layout from '../components/Layout'
import SplashScreen from '../components/SplashScreen'
import { withApollo } from '../lib/withApollo'

type CartContextType = {
  cart: {
    displayCart: Boolean
    view: String
  }
  setCart: any
}

export const CartContext = createContext<CartContextType>({
  cart: {
    displayCart: true,
    view: 'zero',
  },
  setCart: () => {},
})

const initialState = { displayCart: true, view: 'zero' }

function reducer(state, action) {
  console.log('action', action)
  switch (action.type) {
    case 'OPEN_CART':
      return { ...initialState, displayCart: true, view: 'half' }
    case 'CLOSE_CART':
      return { ...initialState, displayCart: true, view: 'zero' }
    case 'FULL_VIEW':
      return { ...initialState, displayCart: true, view: 'full' }
    default:
      return initialState
  }
}

function MyApp({ Component, pageProps, apolloClient }) {
  const [cart, setCart] = useReducer(reducer, initialState)
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    const { pathname } = Router
    if (pathname == '/') {
      Router.push('/category/new-in')
    }
  })
  if (!slug) {
    return (
      <SplashScreen>
        <img src="/logo.svg" />
      </SplashScreen>
    )
  }
  return (
    <ApolloProvider client={apolloClient}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContext.Provider>
    </ApolloProvider>
  )
}

export default withApollo(MyApp)
