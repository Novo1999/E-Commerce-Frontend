import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { CrossButton, FormRow } from '@/components'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetCart } from '@/hooks/useGetCart'
import { UserCart } from './Cart'
import customFetch from '@/utils/customFetch'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name Must be at least 3 characters' })
    .max(50, { message: 'Name cannot be more than 50 characters' }),
  email: z.string().email({ message: 'Invalid Email' }),
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, {
      message:
        'Password character limit exceeded.Please use less than 50 characters',
    }),
})

const Edit = ({
  setIsEditing,
}: {
  setIsEditing: Dispatch<SetStateAction<boolean>>
}) => {
  const { data } = useGetCart()
  const queryClient = useQueryClient()
  const name = (data as UserCart)?.data.currentUser?.name
  const email = (data as UserCart)?.data.currentUser?.email
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      email,
      currentPassword: '',
      newPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const {
      name,
      email,
      currentPassword: oldPassword,
      newPassword: password,
    } = values
    try {
      await customFetch.patch('/user/edit', {
        name,
        email,
        password,
        oldPassword,
      })
      toast.success('User edited successfully')
      setIsEditing(false)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    } catch (error) {
      if (error instanceof AxiosError) toast.error(error?.response?.data?.msg)
    }
  }

  return (
    <div className='flex flex-col items-center relative'>
      <CrossButton setIsEditing={setIsEditing} />
      <h2 className='text-xl'>My Account</h2>
      <div className='mt-6'>
        <Avatar className='h-24 w-24'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback className='text-xs'>Image</AvatarFallback>
        </Avatar>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => <FormRow label='Name' field={field} />}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => <FormRow label='Email' field={field} />}
          />
          <FormField
            control={form.control}
            name='currentPassword'
            render={({ field }) => (
              <FormRow label='Current Password' field={field} />
            )}
          />
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormRow label='New Password' field={field} />
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
export default Edit
