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
import customFetch from '@/utils/customFetch'
import { useContext } from 'react'
import { CartContext } from '@/App'
import { CartItem } from '@/hooks/useHandleCart'
import { useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  email: z.string().email({ message: 'invalid email' }),
  password: z.string(),
})
type formSchemaType = z.infer<typeof formSchema>

const Login = ({ on }: { on?: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  })
  const { tempCartData, setTempCartData } = useContext(CartContext)
  const queryClient = useQueryClient()

  const onSubmit: SubmitHandler<formSchemaType> = async (data) => {
    try {
      const user = await customFetch.post('/auth/login', data)
      toast.success(user.data?.msg)
      // reset the form field
      reset()

      // adding product from temporary cart to online cart after logging in
      if (user && tempCartData.length > 0) {
        for (const item of tempCartData) {
          const { name, _id: id, quantity, price, link } = item as CartItem
          const product = {
            name,
            productId: id,
            quantity,
            price: Number(quantity! * price!).toFixed(2),
            link,
          }
          // Send each product individually to the server
          await customFetch.post('/cart', product)
        }
      }
      // invalidate after log in
      queryClient.invalidateQueries({ queryKey: ['user'] })
      sessionStorage.clear()
      setTempCartData([])
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
              {/* Display error message if exists */}
              {errors.email && (
                <span className='text-red-500'>{errors.email.message}</span>
              )}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='Password'>Password</Label>
              <Input
                {...register('password')}
                name='password'
                type='password'
                placeholder='Password'
              />
              {/* Display error message if exists */}
              {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
              )}
            </div>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login
