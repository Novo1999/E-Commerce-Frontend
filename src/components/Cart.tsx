import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { cartItem } from '@/hooks/useHandleCart'
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
import { useCallback, useContext, useEffect, useState } from 'react'
import { CartContext } from '@/App'
import { Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { BsFillCartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { data, isLoading } = useGetAllProducts('a-z', 0, 0)
  const { cartStatus } = useContext(CartContext)
  const [tempCartData, setTempCartData] = useState([])

  // console.log(tempCartData)

  // get temporary cart data
  const getTempCartData = useCallback(() => {
    const anonCart = JSON.parse(sessionStorage.getItem('anonCart')!) || []
    if (isLoading || !data) {
      setTempCartData([])
    }
    const tempCart =
      data?.data.filter((item1: ProductInterface) =>
        anonCart.some((item2: cartItem) => item2.id === item1._id)
      ) || []

    tempCart.map((item1: ProductInterface) =>
      anonCart.map((item2: cartItem) => {
        if (item1._id === item2.id) item1.quantity = Number(item2.quantity)
      })
    )
    return tempCart
  }, [data, isLoading])

  useEffect(() => {
    setTempCartData(getTempCartData())
  }, [getTempCartData, cartStatus])

  // updating the item quantities from the cart
  const updateCartItemQuantity = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const target = e.currentTarget as HTMLButtonElement
    // get the cart from session storage or an empty array if there is none
    const anonCart = JSON.parse(sessionStorage.getItem('anonCart')!) || []
    // check if item exist
    const existingItem = anonCart.find((item: cartItem) => item.id === id)

    // if item exists, update its quantity only
    anonCart.filter((cartItem: cartItem) => {
      if (cartItem.id === id && existingItem && target.value === 'plus') {
        existingItem.quantity += 1
      }
      if (
        cartItem.id === id &&
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
          anonCart.some((item2: cartItem) => item2.id === item1._id) &&
          item1.quantity !== 0
      ) || []

    tempCart.map((item1: ProductInterface) =>
      anonCart.map((item2: cartItem) => {
        if (item1._id === item2.id) item1.quantity = Number(item2.quantity)
      })
    )
    // if quantity becomes 0, remove it
    setTempCartData(tempCart.filter((item: cartItem) => item.quantity !== 0))
    sessionStorage.setItem(
      'anonCart',
      JSON.stringify(anonCart.filter((item: cartItem) => item.quantity !== 0))
    )
  }

  const handleDeleteItem = (id: string) => {
    let anonCart = JSON.parse(sessionStorage.getItem('anonCart')!) || []
    anonCart = anonCart.filter((item: cartItem) => item.id !== id)
    let updatedData = [...tempCartData] || []
    updatedData = updatedData.filter(
      (item: ProductInterface) => item._id !== id
    )
    sessionStorage.setItem('anonCart', JSON.stringify(anonCart))
    setTempCartData(updatedData)
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
            {tempCartData.length}
          </div>
        </SheetTrigger>
        <SheetContent className='overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
            <Table>
              {tempCartData.length > 0 ? (
                <TableCaption>
                  Total: $
                  {tempCartData.reduce((acc: number, cur: cartItem) => {
                    const total = acc + cur.price! * cur.quantity
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
              {tempCartData.length > 0 && (
                <TableHeader>
                  <TableRow className='flex gap-20'>
                    <TableHead className='w-fit'>Product</TableHead>
                    <TableHead className='text-right'>Price</TableHead>
                  </TableRow>
                </TableHeader>
              )}
              <TableBody>
                {tempCartData.map((item: ProductInterface) => {
                  return (
                    item.quantity! > 0 && (
                      <TableRow
                        key={item._id}
                        className='flex justify-between items-center border-0'
                      >
                        <TableCell className='flex flex-col gap-2'>
                          <img
                            className='w-14'
                            src={item.link}
                            alt='item image'
                          />
                          {item.name}
                          <div className='flex gap-2'>
                            <button
                              onClick={(e) => {
                                updateCartItemQuantity(e, item._id)
                              }}
                              value='minus'
                              className='btn-xs btn-warning rounded-full hover:bg-yellow-400 duration-300'
                            >
                              <AiOutlineMinus />
                            </button>
                            <button
                              value='minus'
                              className='btn-xs rounded-full cursor-context-menu bg-black text-white font-semibold'
                            >
                              {item.quantity}
                            </button>
                            <button
                              onClick={(e) => {
                                updateCartItemQuantity(e, item._id)
                              }}
                              value='plus'
                              className='btn-xs  rounded-full btn-warning hover:bg-yellow-400 duration-300'
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </TableCell>
                        <TableCell className='gap-2 space-x-4'>
                          <span>
                            ${(Number(item.price) * item.quantity!).toFixed(2)}
                          </span>
                          <Button
                            onClick={() => handleDeleteItem(item._id)}
                            variant='outline'
                            size='icon'
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
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
