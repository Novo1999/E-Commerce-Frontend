import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { CartItem } from '@/hooks/useHandleCart'
import { ProductInterface } from '@/pages/AllProducts'
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { CartContext } from '@/App'
import { useGetCart } from '@/hooks/useGetCart'
import customFetch from '@/utils/customFetch'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { CartAside } from '.'

export type UserCart = {
  data: {
    currentUser: { email: string; name: string; avatar: string }
    cart: [{ products: Array<CartItem> }]
  }
}

const Cart = () => {
  const { data, isLoading } = useGetAllProducts('a-z', 0, 0)
  const { cartStatus, tempCartData, setTempCartData } = useContext(CartContext)
  const { data: userCart } = useGetCart()
  const [currentUpdating, setCurrentUpdating] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()
  const isFetching = useIsFetching()
  const onlineCart = (userCart as UserCart)?.data?.cart[0]?.products
  const userExist = (userCart as UserCart)?.data?.currentUser?.email

  // get temporary cart data
  const getTempCartData = useCallback(() => {
    const anonCart = JSON.parse(sessionStorage.getItem('anonCart')!) || []
    if (isLoading || !data) {
      setTempCartData([])
    }
    const tempCart =
      data?.data.filter((item1: ProductInterface) =>
        anonCart.some((item2: CartItem) => item2.id === item1._id)
      ) || []

    tempCart.map((item1: ProductInterface) =>
      anonCart.map((item2: CartItem) => {
        if (item1._id === item2.id) item1.quantity = Number(item2.quantity)
      })
    )
    return tempCart
  }, [data, isLoading, setTempCartData])

  // setting the cart
  useEffect(() => {
    // if user not logged in
    if ((userCart as UserCart)?.data?.currentUser?.email) {
      setTempCartData(onlineCart as SetStateAction<CartItem[]>)
      // if user is logged in
    } else setTempCartData(getTempCartData())
  }, [getTempCartData, cartStatus, setTempCartData, userCart, data, onlineCart])

  // updating the item quantities from the cart
  const updateCartItemQuantity = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const target = e.currentTarget as HTMLButtonElement
    // if user not logged in use session storage
    if (!userExist) {
      // get the cart from session storage or an empty array if there is none
      const anonCart = JSON.parse(sessionStorage.getItem('anonCart')!) || []
      // check if item exist
      const existingItem = anonCart.find((item: CartItem) => item.id === id)

      // if item exists, update its quantity only
      anonCart.filter((CartItem: CartItem) => {
        if (CartItem.id === id && existingItem && target.value === 'plus') {
          existingItem.quantity += 1
        }
        if (
          CartItem.id === id &&
          existingItem &&
          target.value === 'minus' &&
          existingItem.quantity > 0
        ) {
          existingItem.quantity -= 1
        }
      })
      const tempCart =
        data?.data.filter(
          (item1: ProductInterface) =>
            anonCart.some((item2: CartItem) => item2.id === item1._id) &&
            item1.quantity !== 0
        ) || []

      tempCart.map((item1: ProductInterface) =>
        anonCart.map((item2: CartItem) => {
          if (item1._id === item2.id) item1.quantity = Number(item2.quantity)
        })
      )
      // if quantity becomes 0, remove it
      setTempCartData(tempCart.filter((item: CartItem) => item.quantity !== 0))
      sessionStorage.setItem(
        'anonCart',
        JSON.stringify(anonCart.filter((item: CartItem) => item.quantity !== 0))
      )
    } else {
      // if user is logged in, use online user cart
      setCurrentUpdating(id)
      const currentCartItem = data?.data.find(
        (item: CartItem) => item._id === id
      )

      const { price } = currentCartItem
      const quantity = target.value === 'plus' ? 1 : -1

      const product = {
        productId: id,
        quantity,
        price,
      }
      setIsUpdating(true)
      await customFetch.post('/cart', product)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      setIsUpdating(false)
    }
  }

  // delete
  const handleDeleteItem = async (id: string) => {
    // if user is not logged in, delete from session storage
    if (!userExist) {
      let anonCart = JSON.parse(sessionStorage.getItem('anonCart')!) || []
      anonCart = anonCart.filter((item: CartItem) => item.id !== id)
      let updatedData = [...tempCartData] || []
      updatedData = updatedData.filter((item: CartItem) => item._id !== id)
      sessionStorage.setItem('anonCart', JSON.stringify(anonCart))
      setTempCartData(updatedData)
    } else {
      // if user is logged in, delete from online cart
      setCurrentUpdating(id)

      const quantity = 0

      const product = {
        productId: id,
        quantity,
      }
      setIsDeleting(true)
      await customFetch.post('/cart', product)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      setIsDeleting(false)
    }
  }

  return (
    <CartAside
      isDeleting={isDeleting}
      isUpdating={isUpdating}
      isFetching={isFetching}
      currentUpdating={currentUpdating}
      updateCartItemQuantity={updateCartItemQuantity}
      handleDeleteItem={handleDeleteItem}
      userExist={userExist}
    />
  )
}
export default Cart
