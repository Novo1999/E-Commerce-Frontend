import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useEffect, useState } from 'react'
import { Login, Register } from '.'
import { useGetCart } from '@/hooks/useGetCart'
import { UserCart } from './Cart'

const Tab = () => {
  const [isTabContentOpen, setIsTabContentOpen] = useState(false)
  const { data } = useGetCart()
  const email = (data as UserCart)?.data?.currentUser?.email || ''

  // closing the tabs when clicking outside
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
      className='w-[250px] flex items-center gap-4 tabs relative sm:right-2 lg:right-10'
    >
      <TabsList onClick={() => setIsTabContentOpen(true)}>
        <TabsTrigger value='register'>Register</TabsTrigger>
        {!email && <TabsTrigger value='login'>Log in</TabsTrigger>}
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
    </Tabs>
  )
}
export default Tab
