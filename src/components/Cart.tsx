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
import { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Cart = () => {
  const { data, isLoading } = useGetAllProducts('a-z', 0, 0)
  const anonCart = JSON.parse(sessionStorage.getItem('anonCart')!) || []

  const getTempCartData = () => {
    if (isLoading || !data) {
      return []
    }
    const tempCart = data?.data.filter((item1: ProductInterface) =>
      anonCart.some((item2: cartItem) => item2.id === item1._id)
    )
    tempCart.map((item1: ProductInterface) =>
      anonCart.map((item2: cartItem) => {
        item1.quantity = Number(item2.quantity)
      })
    )
    return tempCart
  }

  return (
    <aside>
      <Sheet>
        <SheetTrigger className='text-3xl flex justify-center'>
          <AiOutlineShoppingCart />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
            {getTempCartData().map((item) => {
              return (
                <div key={item._id}>
                  <p>{item.name}</p>
                </div>
              )
            })}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </aside>
  )
}
export default Cart
