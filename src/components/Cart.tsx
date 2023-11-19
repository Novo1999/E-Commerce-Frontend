import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { CartItem } from '@/hooks/useHandleCart'
import { ProductInterface } from '@/pages/AllProducts'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from 'react-icons/ai'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { CartContext } from '@/App'
import { Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { BsFillCartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useGetCart } from '@/hooks/useGetCart'
import customFetch from '@/utils/customFetch'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'

export type UserCart = {
  data: {
    currentUser: { email: string; name: string; avatar: string }
    cart: [{ products: CartItem }]
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
  const CpdateCartItemQuantity = async (
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
      const CurrentCartItem = data?.data.find(
        (item: CartItem) => item._id === id
      )

      const { price } = CurrentCartItem
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
    <aside>
      <Sheet>
        <SheetTrigger className='text-3xl flex justify-center relative'>
          <AiOutlineShoppingCart />
          <div
            className='absolute bg-red-500 rounded-full p-2 h-2 top-0 text-xs left-4
            flex justify-center items-center text-white w-fit'
          >
            {tempCartData?.length}
          </div>
        </SheetTrigger>
        <SheetContent className='overflow-y-scroll w-screen'>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
            <Table>
              {/* Deleting Spinner */}
              {isDeleting ? (
                <TableBody>
                  <TableRow>
                    <td className='loading loading-ring loading-lg top-0 right-0 left-0 bottom-0 m-auto absolute'></td>
                  </TableRow>
                </TableBody>
              ) : tempCartData?.length > 0 ? (
                // Total Price
                <TableCaption>
                  Total: $
                  {tempCartData?.reduce((acc: number, cur: CartItem) => {
                    const total = acc + cur.price!
                    return Number(total.toFixed(2))
                  }, 0)}
                </TableCaption>
              ) : (
                <TableCaption className='flex items-center flex-col gap-4 '>
                  <span
                    className='flex justify-center
                      items-center gap-1'
                  >
                    Your <BsFillCartFill /> Cart is Empty
                  </span>
                  <>
                    <Link
                      className='w-fit hover:bg-slate-400 hover:text-white bg-slate-200 p-3 rounded-xl duration-300'
                      to='/all-products'
                    >
                      <SheetTrigger>
                        <span className='p-3'>Shop Now</span>
                      </SheetTrigger>
                    </Link>
                  </>
                </TableCaption>
              )}
              {tempCartData?.length > 0 && (
                // Header
                <TableHeader>
                  <TableRow className='flex justify-between px-2'>
                    <TableHead className='w-fit relative left-4 sm:left-10'>
                      Product
                    </TableHead>
                    <TableHead className='text-right'>Price</TableHead>
                  </TableRow>
                </TableHeader>
              )}

              <TableBody>
                {tempCartData?.map((item: CartItem) => {
                  const { name, quantity, link, price } = item
                  const productId = item.productId || item._id

                  return (
                    quantity! > 0 && (
                      <TableRow
                        key={productId}
                        className='flex justify-between items-center border-0'
                      >
                        <TableCell className='flex flex-col gap-2 items-center'>
                          {/* item image */}
                          <img
                            className='w-14 m-auto'
                            src={link}
                            alt='item image'
                          />
                          <span className='text-xs w-20 min-[425px]:text-sm sm:text-base text-center sm:w-36'>
                            {name}
                          </span>
                          {/* item quantity buttons */}
                          <div className='flex gap-2'>
                            {/* minus */}
                            <button
                              disabled={
                                isUpdating ||
                                (isFetching === 1 &&
                                  currentUpdating === productId)
                              }
                              onClick={(e) => {
                                CpdateCartItemQuantity(e, productId!)
                              }}
                              value='minus'
                              className={`btn-xs btn-warning rounded-full hover:bg-yellow-400 duration-300 ${
                                isUpdating && currentUpdating === productId
                                  ? 'opacity-50'
                                  : 'opacity-100'
                              }`}
                            >
                              <AiOutlineMinus />
                            </button>
                            <button
                              value='minus'
                              className={`btn-xs rounded-full cursor-context-menu bg-black ${
                                quantity!.toString().length > 2 ? 'w-7' : 'w-6'
                              } text-white font-semibold flex justify-center items-center`}
                            >
                              {/* quantity */}
                              {isUpdating && currentUpdating === productId ? (
                                <span className='loading loading-spinner text-white w-3 h-3'></span>
                              ) : (
                                quantity
                              )}
                            </button>
                            {/* plus */}
                            <button
                              disabled={
                                isUpdating ||
                                (isFetching === 1 &&
                                  currentUpdating === productId)
                              }
                              onClick={(e) => {
                                CpdateCartItemQuantity(e, productId!)
                              }}
                              value='plus'
                              className={`btn-xs ${
                                isUpdating && currentUpdating === productId
                                  ? 'opacity-50'
                                  : 'opacity-100'
                              } rounded-full btn-warning hover:bg-yellow-400 duration-300`}
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </TableCell>
                        {/* price and delete button */}
                        <TableCell className='flex justify-between flex-col gap-2 items-center'>
                          <span>${price?.toFixed(2)}</span>
                          <div
                            className='tooltip tooltip-warning '
                            data-tip='Delete'
                          >
                            <Button
                              className='relative top-2'
                              onClick={() => handleDeleteItem(productId!)}
                              variant='outline'
                              size='icon'
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )
                })}
              </TableBody>
            </Table>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </aside>
  )
}
export default Cart
