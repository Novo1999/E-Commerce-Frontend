import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Link, useSearchParams } from 'react-router-dom'
import { Spinner } from '@/components'
import { MouseEvent, useEffect, useState } from 'react'
import { handleSortQuery, handleURLSortQuery } from '@/utils/handleQueryString'

export interface Product {
  _id: string
  name: string
  brand: string
  price: string
  category: string
  description: string
  link: string
}

const AllProducts = () => {
  const [sortBy, setSortBy] = useState('a-z')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  // calculating the total pages
  const { data: totalData } = useGetAllProducts('a-z', 0, 0)
  const totalPages = Math.ceil(totalData?.data.length / limit)
  const [searchParams, setSearchParams] = useSearchParams()

  const { data, isLoading } = useGetAllProducts(sortBy, page, limit)

  // get details from query string and render the products
  useEffect(() => {
    const urlLimit = searchParams.get('limit')
    const urlPage = searchParams.get('page')
    const urlSort = searchParams.get('sort')
    if (urlLimit && sortBy && urlSort) {
      setSortBy(handleURLSortQuery(urlSort)!)
      setPage(Number(urlPage))
      setLimit(Number(urlLimit))
    }
    if (data?.data.length === 0) throw new Error('No available products')
  }, [data, searchParams, sortBy, totalPages])

  const handlePagination = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement
    setPage(Number(target.value))
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const handleSortBy = (value: string) => {
    setSortBy(value)

    const sortQuery = handleSortQuery(value)

    // reset page when any of the sort option is selected
    setSearchParams({ page: '1', sort: sortQuery!, limit: limit.toString() })
  }

  const handleLimit = (value: string) => {
    setLimit(Number(value))
    setPage(1)
    const sortQuery = handleSortQuery(sortBy)
    setSearchParams({ page: '1', sort: sortQuery!, limit: value })
  }

  return (
    <div className='flex flex-col items-center p-10 relative'>
      <div className='flex justify-between gap-4 w-full xl:px-10'>
        <div>
          <Select onValueChange={(value) => handleLimit(value)}>
            <SelectTrigger className='sm:w-[180px] w-fit'>
              <SelectValue placeholder='Show' />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: totalData?.data.length / 10 },
                (_, i) => i + 1
              ).map((page) => (
                <SelectItem key={page} value={(page * 10).toString()}>
                  {page * 10}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Select onValueChange={(value) => handleSortBy(value)}>
          <SelectTrigger className='sm:w-[180px] w-fit'>
            <SelectValue placeholder='Sort By' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='a-z'>Name (A - Z)</SelectItem>
            <SelectItem value='z-a'>Name (Z - A)</SelectItem>
            <SelectItem value='price[a-z]'>Price (Low-High)</SelectItem>
            <SelectItem value='price[z-a]'>Price (High-Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='min-h-screen p-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center'>
        {isLoading ? (
          <Spinner />
        ) : (
          data?.data?.map((product: Product) => {
            const { _id: id, name, brand, price, category, link } = product
            return (
              <div
                className='card shadow-xl w-fit min-[375px]:w-64 min-[425px]:w-72 border-2 pt-4 sm:p-4 sm:gap-2 border-black'
                key={id}
              >
                <Link
                  to={`/products/product/${id}`}
                  className='p-4 h-full cursor-pointer tooltip tooltip-info flex justify-center items-center'
                  data-tip='View details'
                >
                  <img className='h-24 sm:h-32' src={link} alt='Shoes' />
                </Link>
                <div className='card-body'>
                  <h2 className='card-title text-sm sm:text-lg'>{name}</h2>
                  <p className='text-sm'>By {brand}</p>
                  <p className='font-bold text-sm'>Price: ${price}</p>
                  <div className='card-actions justify-end'>
                    <div className='badge text-xs lg:text-md badge-outline'>
                      {category}
                    </div>
                  </div>
                  <div className='flex justify-between items-center gap-2'>
                    <button className='btn-sm rounded-lg btn-warning'>
                      <AiOutlineMinus />
                    </button>
                    <kbd className='kbd text-white h-full w-full'>0</kbd>
                    <button className='btn-sm rounded-lg btn-warning'>
                      <AiOutlinePlus />
                    </button>
                  </div>
                  <button className='btn-sm rounded-lg btn-active btn-accent mt-4'>
                    Add To Cart
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
      <div
        onClick={(e) => {
          // console.log(e.target.value)
          handlePagination(e)
        }}
        className='join'
      >
        {page > 1 && (
          <Link
            to={{
              pathname: '/all-products',
              search: `?page=${page - 1}&sort=${handleSortQuery(
                sortBy
              )}&limit=${limit}`,
            }}
          >
            <button value={page - 1} className='join-item btn btn-md'>
              {'<'}
            </button>
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Link
            key={pageNum}
            to={{
              pathname: '/all-products',
              search: `?page=${pageNum}&sort=${handleSortQuery(
                sortBy
              )}&limit=${limit}`,
            }}
          >
            <button
              value={pageNum}
              className={`join-item btn btn-md ${
                pageNum === page
                  ? 'btn-active bg-red-500 text-black hover:bg-red-500'
                  : ''
              }`}
            >
              {pageNum}
            </button>
          </Link>
        ))}

        {page < totalPages && (
          <Link
            to={{
              pathname: '/all-products',
              search: `?page=${page + 1}&sort=${handleSortQuery(
                sortBy
              )}&limit=${limit}`,
            }}
          >
            <button value={page + 1} className='join-item btn btn-md'>
              {'>'}
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
export default AllProducts
