import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Cart = () => {
  return (
    <aside>
      <Sheet>
        <SheetTrigger className='text-3xl flex justify-center'>
          <AiOutlineShoppingCart />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </aside>
  )
}
export default Cart
