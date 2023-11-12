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

const Cart = () => {
  const { data, isLoading } = useGetAllProducts('a-z', 0, 0)
  const { cartStatus } = useContext(CartContext)
  const [tempCartData, setTempCartData] = useState([])

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
    console.log(target.value, id)
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
      data?.data.filter((item1: ProductInterface) =>
        anonCart.some((item2: cartItem) => item2.id === item1._id)
      ) || []

    tempCart.map((item1: ProductInterface) =>
      anonCart.map((item2: cartItem) => {
        if (item1._id === item2.id) item1.quantity = Number(item2.quantity)
      })
    )
    setTempCartData(tempCart)
    sessionStorage.setItem('anonCart', JSON.stringify(anonCart))
  }

  return (
    <aside>
      <Sheet>
        <SheetTrigger className='text-3xl flex justify-center'>
          <AiOutlineShoppingCart />
        </SheetTrigger>
        <SheetContent className='overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
            <Table>
              <TableCaption>
                Total:{' '}
                {tempCartData.reduce((acc: number, cur: cartItem) => {
                  const total = acc + cur.price! * cur.quantity
                  return Number(total.toFixed(2))
                }, 0)}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-fit'>Image</TableHead>
                  <TableHead className='w-fit'>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className='text-right'>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tempCartData.map((item: ProductInterface) => {
                  return (
                    item.quantity! > 0 && (
                      <TableRow key={item._id}>
                        <TableCell>
                          <img src={item.link} alt='item image' />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className='flex gap-2'>
                          <button
                            onClick={(e) => {
                              updateCartItemQuantity(e, item._id)
                            }}
                            value='minus'
                            className='btn-sm btn-warning rounded-full hover:bg-yellow-400 duration-300'
                          >
                            <AiOutlineMinus />
                          </button>
                          <kbd className='kbd rounded-full text-white h-fit w-fit'>
                            {item.quantity}
                          </kbd>
                          <button
                            onClick={(e) => {
                              updateCartItemQuantity(e, item._id)
                            }}
                            value='plus'
                            className='btn-sm  rounded-full btn-warning hover:bg-yellow-400 duration-300'
                          >
                            <AiOutlinePlus />
                          </button>
                        </TableCell>
                        <TableCell>
                          {(Number(item.price) * item.quantity!).toFixed(2)}
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
