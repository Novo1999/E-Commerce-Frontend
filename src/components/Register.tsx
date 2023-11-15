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

export type AuthInputs = {
  name?: string
  email: string
  password: string
}

const Register = ({ on }: { on?: string }) => {
  const { register, handleSubmit, reset } = useForm<AuthInputs>()

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
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
            </div>
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
            {/* BUTTON */}
            <Button>Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default Register
