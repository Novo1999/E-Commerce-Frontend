import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { Profile } from '.'
import { useEffect, useState } from 'react'

const Tab = () => {
  const [isTabContentOpen, setIsTabContentOpen] = useState(false)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Element
      if (!target.closest('.tabs')) {
        setIsTabContentOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  })

  return (
    <Tabs
      defaultValue='account'
      className='w-[250px] flex items-center gap-4 tabs'
    >
      <TabsList onClick={() => setIsTabContentOpen(true)}>
        <TabsTrigger value='register'>Register</TabsTrigger>
        <TabsTrigger value='login'>Log in</TabsTrigger>
      </TabsList>
      {isTabContentOpen && (
        <TabsContent value='register'>
          <Register />
        </TabsContent>
      )}
      {isTabContentOpen && (
        <TabsContent value='login'>
          <Login />
        </TabsContent>
      )}
      <Profile />
    </Tabs>
  )
}
export default Tab

export const Register = ({ on }: { on?: string }) => {
  return (
    <Card
      className={`absolute w-72 ${
        on === 'mobile' ? 'w-72 top-72 ' : 'right-20 top-16'
      } `}
    >
      <CardHeader>
        <CardTitle>Register Now</CardTitle>
        <CardDescription>Quickly Open an account</CardDescription>
      </CardHeader>
      <CardContent>
        {/* FORM */}
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='Name'>Name</Label>
              <Input name='name' id='Name' placeholder='Name' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='Email'>Email</Label>
              <Input name='email' placeholder='Email' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='Password'>Password</Label>
              <Input name='password' type='password' placeholder='Password' />
            </div>
            {/* BUTTON */}
            <Button>Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export const Login = ({ on }: { on?: string }) => {
  return (
    <Card
      className={`absolute w-72 ${
        on === 'mobile' ? 'w-72 top-72 ' : 'right-20 top-16'
      } `}
    >
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Log in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='Email'>Email</Label>
              <Input name='email' placeholder='Email' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='Password'>Password</Label>
              <Input name='password' type='password' placeholder='Password' />
            </div>
            <Button>Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
