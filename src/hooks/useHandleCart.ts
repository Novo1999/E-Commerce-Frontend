import { CartContext, cartStatus } from '@/App'
import { showCartToast } from '../components/CartToast'
import { useContext } from 'react'

export type cartItem = { id: string; quantity: number; price?: number }

export const useHandleCart = () => {
  const { cartStatus, setCartStatus } = useContext(CartContext)

  const handleIncreaseQuantity = (id: string) => {
    setCartStatus((currentItems: cartStatus) => {
      if (!currentItems.find((item) => item.id === id)) {
        return [...currentItems, { id, quantity: 1 }]
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const handleDecreaseQuantity = (id: string) => {
    setCartStatus((currentItems: cartStatus) => {
      if (currentItems.find((item) => item.id === id)!.quantity <= 1) {
        return currentItems.filter((item) => item.id !== id)
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          } else {
            return item
          }
        })
      }
    })
  }

  // session storage cart logic for temporary cart if user is not logged in
  const handleAddToCart = (id: string) => {
    // get the cart from session storage or an empty array if there is none
    const anonCart = JSON.parse(sessionStorage.getItem('anonCart')!) || []
    // check if item exist
    const existingItem = anonCart.find((item: cartItem) => item.id === id)

    // if item exists, update its quantity only
    cartStatus.filter((cartItem: cartItem) => {
      if (cartItem.id === id && existingItem) {
        existingItem.quantity += cartItem.quantity
      }
      // if item does not exist but id matches, add it to the cart
      if (cartItem.id === id && !existingItem) {
        anonCart.push(cartItem)
      }
      // set cart in session storage
    })

    console.log(cartStatus)
    sessionStorage.setItem('anonCart', JSON.stringify(anonCart))

    // resetting the item state
    setCartStatus((currentItems: cartStatus) => {
      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: 0 }
        } else {
          return item
        }
      })
    })
    showCartToast(id)
  }
  return { handleIncreaseQuantity, handleDecreaseQuantity, handleAddToCart }
}
