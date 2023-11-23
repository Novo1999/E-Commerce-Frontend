import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import emailSchema from './ui/FormSchema'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useTheme } from './ThemeProvider'

const Contact = () => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })
  const { reset } = form

  const { theme } = useTheme()

  function onSubmit() {
    toast.success('Thank you for your co-operation')
    reset()
  }
  return (
    <div className='container my-12 mx-auto md:px-6 relative '>
      <section className='mb-12 '>
        <div className="relative h-[300px] rounded-lg overflow-hidden bg-cover bg-[50%] bg-no-repeat bg-[url('https://mdbcdn.b-cdn.net/img/new/textures/full/284.jpg')]"></div>
        <div
          className={`${
            theme === 'dark' ? 'bg-black' : 'bg-white'
          }  container px-6 md:px-12 absolute shadow-xl w-fit min-[425px]:w-80 sm:w-96 flex flex-col items-center bottom-4 left-0 right-0 rounded-lg p-14`}
        >
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className='w-fit sm:w-60'
                        placeholder='Email'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Keep in touch</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className={`${theme === 'dark' ? 'bg-white ' : 'bg-black'}`}
                type='submit'
              >
                Subscribe
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  )
}
export default Contact
