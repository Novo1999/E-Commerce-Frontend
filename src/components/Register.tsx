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
import { useForm, SubmitHandler } from 'react-hook-form'
import customFetch from '@/utils/customFetch'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name Must be at least 3 characters' })
    .max(50, { message: 'Name cannot be more than 50 characters' }),
  email: z.string().email({ message: 'Invalid Email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})
type formSchemaType = z.infer<typeof formSchema>

const Register = ({ on }: { on?: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // Add errors from useForm
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<formSchemaType> = async (data) => {
    try {
      const user = await customFetch.post('/auth/register', data)
      toast.success(user.data?.msg)
      // reset the form field
      reset()
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
        <CardTitle>Register Now</CardTitle>
        <CardDescription>Quickly Open an account</CardDescription>
      </CardHeader>
      <CardContent>
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='Name'>Name</Label>
              <Input
                {...register('name')}
                name='name'
                id='Name'
                placeholder='Name'
              />
              {/* Display error message if exists */}
              {errors.name && (
                <span className='text-red-500 text-xs'>
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='Email'>Email</Label>
              <Input {...register('email')} name='email' placeholder='Email' />
              {/* Display error message if exists */}
              {errors.email && (
                <span className='text-red-500 text-xs'>
                  {errors.email.message}
                </span>
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
                <span className='text-red-500 text-xs'>
                  {errors.password.message}
                </span>
              )}
            </div>
            {/* BUTTON */}
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default Register
