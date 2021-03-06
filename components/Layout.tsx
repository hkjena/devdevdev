import Header from './Header'
import Toolbar from './Toolbar'
import Cart from './Cart'

import '../sass/pages/_app.scss'

import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../pages/_app'
import { withApollo } from '../lib/withApollo'
import { useProfileQuery } from '../graphql/generated/graphql'
import Loader from './Loader'

const buttons = [
  {
    name: 'Home',
    img: '/home.svg',
    type: 'link',
    link: '/',
    className: 'home',
  },
  { name: 'Sort', img: '/home.svg', type: 'block', className: 'sort' },
]

const Layout = (props) => {
  const { data, loading, error } = useProfileQuery()
  const {
    cart: { displayCart, view },
  } = useContext(CartContext)

  if (error) {
    localStorage.setItem('status', error.message)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="container">
      <Header {...(data && data.profile)} />
      {props.children}
      {displayCart && (
        <div className={`${view}-open cart-container`}>
          <Cart />
        </div>
      )}
      <div className="d-flex flex-sm-column align-items-center align-items-sm-start justify-content-between sticky-toolbar d-lg-none">
        <Toolbar buttons={buttons} />
      </div>
    </div>
  )
}

export default withApollo(Layout)
