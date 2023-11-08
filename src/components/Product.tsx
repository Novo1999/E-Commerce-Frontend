import { Link } from 'react-router-dom'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { ProductInterface } from '@/pages/AllProducts'
import { CartContext, cartStatus } from '@/App'
import { useContext } from 'react'
import { useHandleQuantity } from '@/hooks/useHandleQuantity'

const Product = ({ product }: { product: ProductInterface }) => {
  const { cartStatus } = useContext(CartContext)
  const { handleIncreaseQuantity, handleDecreaseQuantity } = useHandleQuantity()

  const handleAddToCart = () => {}

  const { _id: id, name, brand, price, category, link } = product
  return (
    <div
      className='card shadow-xl w-60 min-[375px]:w-64 min-[425px]:w-72 xl:w-80 lg:h-fit border-2 transition-colors pt-4 sm:p-4 sm:gap-2 border-black font-poppins'
      key={id}
    >
      <Link
        to={`/products/product/${id}`}
        className='p-4 cursor-pointer tooltip tooltip-info flex justify-center items-center'
        data-tip='View details'
      >
        <img className='h-24 sm:h-32 xl:h-40' src={link} alt='Shoes' />
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
          <button
            onClick={() => handleDecreaseQuantity(id)}
            className='btn-sm rounded-lg btn-warning hover:bg-yellow-400 duration-300'
          >
            <AiOutlineMinus />
          </button>
          <kbd className='kbd text-white h-full w-full'>
            {cartStatus.find((item: cartStatus) => item.id === id)?.quantity ||
              0}
          </kbd>
          <button
            onClick={() => handleIncreaseQuantity(id)}
            className='btn-sm rounded-lg btn-warning hover:bg-yellow-400 duration-300'
          >
            <AiOutlinePlus />
          </button>
        </div>

        <button
          className={`btn-sm rounded-lg btn-active btn-accent ${
            cartStatus.find((item: cartStatus) => item.id === id)?.quantity
              ? 'visible'
              : 'invisible'
          } mt-4 hover:bg-cyan-700 duration-300`}
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}
export default Product
