import { CartContext, cartStatus } from '@/App'
import { useContext } from 'react'

export const useHandleQuantity = () => {
  const { setCartStatus } = useContext(CartContext)

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
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id)
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  return { handleIncreaseQuantity, handleDecreaseQuantity }
}
