import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { CrossButton, FormRow } from '@/components'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetCart } from '@/hooks/useGetCart'
import { UserCart } from './Cart'
import customFetch from '@/utils/customFetch'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name Must be at least 3 characters' })
    .max(50, { message: 'Name cannot be more than 50 characters' }),
  email: z.string().email({ message: 'Invalid Email' }),
  currentPassword: z.string(),
  newPassword: z
    .string()
    .refine(
      (password) =>
        !password || (password.length >= 6 && password.length <= 50),
      { message: 'Password must be between 6 and 50 characters' }
    ),
  avatar: z.any(),
})

let toastId: string
const Edit = ({
  setIsEditing,
  avatar,
}: {
  setIsEditing: Dispatch<SetStateAction<boolean>>
  avatar: string
}) => {
  const { data } = useGetCart()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const name = (data as UserCart)?.data.currentUser?.name || ''
  const email = (data as UserCart)?.data.currentUser?.email || ''

  useEffect(() => {
    if (email === '') navigate('/')
  }, [email, navigate])

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
      avatar,
    } = values

    const formData = new FormData()
    if (avatar) {
      formData.append('avatar', avatar[0])
    }
    formData.append('name', name)
    formData.append('email', email)
    formData.append('oldPassword', oldPassword)
    formData.append('password', password)

    try {
      toastId = toast.loading('Updating..')
      await customFetch.patch('/user/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('User edited successfully', {
        id: toastId,
      })
      setIsEditing(false)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error?.response?.data?.msg, { id: toastId })
    }
  }

  return (
    <div className='flex flex-col items-center relative'>
      <CrossButton setIsEditing={setIsEditing} />
      <h2 className='text-xl'>My Account</h2>

      <div className='mt-6'>
        <Avatar className='h-24 w-24 mx-10 lg:h-48 lg:w-48'>
          <AvatarImage className='w-48 h-72 lg:h-72 lg:w-96' src={avatar} />
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
          <FormField
            control={form.control}
            name='avatar'
            render={({ field }) => <FormRow label='Image' field={field} />}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
export default Edit
