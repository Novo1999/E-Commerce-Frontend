import { useGetAllProducts } from '@/hooks/useGetAllProducts'
import { debounce } from 'lodash'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Link, useSearchParams } from 'react-router-dom'
import { Product, Spinner } from '@/components'
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react'
import {
  handleSelectPlaceholderValue,
  handleSortQuery,
  handleURLSortQuery,
} from '@/utils/handleQueryString'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useGetProductByName } from '@/hooks/useGetProductByName'

export interface ProductInterface {
  _id: string
  name: string
  brand: string
  price: string
  category: string
  description: string
  link: string
  quantity?: number
}

const AllProducts = () => {
  const [sortBy, setSortBy] = useState('a-z')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [productNameInput, setProductNameInput] = useState('')
  // calculating the total pages
  const { data: totalData } = useGetAllProducts('a-z', 0, 0)
  const totalPages = Math.ceil(totalData?.data.length / limit)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { data: allProducts, isLoading } = useGetAllProducts(
    sortBy,
    page,
    limit
  )

  const { data: productsByName, isLoading: isProductsByNameLoading } =
    useGetProductByName(productNameInput!)

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
    if (allProducts?.data.length === 0) throw new Error('No available products')
  }, [allProducts, searchParams, sortBy, totalPages])

  // handle pagination buttons
  const handlePagination = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement
    setPage(Number(target.value))
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  // handle sort by selections
  const handleSortBy = (value: string) => {
    setSortBy(value)

    const sortQuery = handleSortQuery(value)

    // reset page when any of the sort option is selected
    setSearchParams({ page: '1', sort: sortQuery!, limit: limit.toString() })
  }

  // handle limit
  const handleLimit = (value: string) => {
    setLimit(Number(value))
    setPage(1)
    const sortQuery = handleSortQuery(sortBy)
    setSearchParams({ page: '1', sort: sortQuery!, limit: value })
  }

  // input change event
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setProductNameInput(e.target.value)
  }
  // Debounce
  const debouncedResults = useMemo(() => {
    return debounce(handleChangeInput, 400)
  }, [])

  useEffect(() => {
    return () => {
      debouncedResults.cancel()
    }
  })

  return (
    <div className='flex flex-col items-center p-10 relative'>
      <div className='flex justify-between gap-4 w-full lg:px-[2rem] xl:px-[4rem] 2xl:px-[13rem]'>
        {!isSearchOpen && (
          <div className='flex justify-center gap-4'>
            {/* SELECT */}
            <Select onValueChange={(value) => handleLimit(value)}>
              <SelectTrigger className='sm:w-[180px] w-fit'>
                <SelectValue
                  placeholder={searchParams.get('limit') || 'Show'}
                />
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
            {/* SEARCH BTN*/}
            <Button
              onClick={() => setIsSearchOpen(true)}
              variant='outline'
              size='icon'
            >
              <Search className='h-4 w-4' />
            </Button>
          </div>
        )}
        {/* SEARCH INPUT */}
        {isSearchOpen && (
          <div className='flex flex-row w-36 min-[375px]:w-40 min-[425px]:w-52 lg:w-60 gap-2'>
            <Input
              autoFocus
              onChange={debouncedResults}
              className=' border border-slate-200'
              type='name'
              placeholder='Search'
            />
            <Button
              className='sm:px-3'
              onClick={() => {
                setIsSearchOpen(false)
                setProductNameInput('')
              }}
              variant='outline'
              size='icon'
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        )}
        {/* SORT */}
        {productNameInput.length < 1 && (
          <Select onValueChange={(value) => handleSortBy(value)}>
            <SelectTrigger className='sm:w-[180px] w-fit'>
              <SelectValue placeholder={handleSelectPlaceholderValue(sortBy)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='a-z'>Name (A - Z)</SelectItem>
              <SelectItem value='z-a'>Name (Z - A)</SelectItem>
              <SelectItem value='price[a-z]'>Price (Low-High)</SelectItem>
              <SelectItem value='price[z-a]'>Price (High-Low)</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* GET ALL PRODUCTS OR BY SEARCH */}
      <div className='p-10 pb-60 sm:pb-0 grid grid-cols-1 gap-8 sm:grid-cols-2 min-h-screen lg:grid-cols-3 xl:grid-cols-4 place-items-center sm:place-items-start mb-6'>
        {productNameInput ? (
          isProductsByNameLoading ? (
            <Spinner />
          ) : (
            productsByName?.data?.map((product: ProductInterface) => {
              return <Product key={product._id} product={product} />
            })
          )
        ) : isLoading ? (
          <Spinner />
        ) : (
          allProducts?.data?.map((product: ProductInterface) => {
            return <Product key={product._id} product={product} />
          })
        )}
      </div>
      {/* PAGINATION */}
      {productNameInput.length < 1 && (
        <div
          onClick={(e) => {
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
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
            )
          )}

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
      )}
    </div>
  )
}
export default AllProducts
