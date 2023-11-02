import { useGetSingleProduct } from '@/hooks/useGetSingleProduct'

const SingleProduct = () => {
  const { data } = useGetSingleProduct()
  const product = data?.data.product
  return <div></div>
}
export default SingleProduct
