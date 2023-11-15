import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthInputs } from './Register'
import customFetch from '@/utils/customFetch'
import { useContext } from 'react'
import { CartContext } from '@/App'
import { cartItem } from '@/hooks/useHandleCart'

const Login = ({ on }: { on?: string }) => {
  const { register, handleSubmit, reset } = useForm<AuthInputs>()
  const { tempCartData, setTempCartData } = useContext(CartContext)

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    try {
      const user = await customFetch.post('/auth/login', data)
      console.log(user)
      toast.success(user.data?.msg)
      // reset the form field
      reset()
      if (user && tempCartData.length > 0) {
        tempCartData.map((item: cartItem) => {
          const { name, _id: id, quantity, price } = item
          return customFetch.post('/cart', {
            name,
            productId: id,
            quantity,
            price: (quantity! * price!).toFixed(2),
          })
        })
      }
      return user
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error?.response?.data?.msg, {
          style: {
            textTransform: 'capitalize',
          },
        })
    }
  }

  return (
    <Card
      className={`absolute w-72 ${
        on === 'mobile' ? 'w-72 sm:w-96 top-80' : 'right-20 top-16'
      } `}
    >
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Log in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='Email'>Email</Label>
              <Input {...register('email')} name='email' placeholder='Email' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='Password'>Password</Label>
              <Input
                {...register('password')}
                name='password'
                type='password'
                placeholder='Password'
              />
            </div>
            <Button>Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login
