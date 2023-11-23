import { useReducer } from 'react'
import Stars from './Stars'
import { reviews } from './ReviewsData'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface State {
  currentReviewIndex: number
  curClicked: string
  applyClass: boolean
  applyClass2: boolean
  btnDisabled: boolean
}

type Action =
  | { type: 'button/disabled'; payload: boolean }
  | { type: 'clicked/current'; payload: string }
  | { type: 'reviews/current'; payload: number }

const initialState = {
  currentReviewIndex: 0,
  curClicked: '',
  applyClass: false,
  applyClass2: false,
  btnDisabled: false,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'button/disabled':
      return { ...state, btnDisabled: action.payload }
    case 'clicked/current':
      return { ...state, curClicked: action.payload }
    case 'reviews/current':
      return { ...state, currentReviewIndex: action.payload }
    default:
      throw new Error('Unknown action type')
  }
}

const CustomerReview = () => {
  const [{ currentReviewIndex, btnDisabled }, dispatch] = useReducer(
    reducer,
    initialState
  )

  // Customer review button logic and animation effect

  const handleLeft = () => {
    let newIndex = currentReviewIndex - 1
    if (newIndex < 0) {
      newIndex = reviews.length - 1
    }
    dispatch({ type: 'reviews/current', payload: newIndex })

    dispatch({ type: 'clicked/current', payload: 'left' })
  }
  const handleRight = () => {
    if (currentReviewIndex === reviews.length - 1) {
      dispatch({ type: 'reviews/current', payload: 0 })
    } else {
      dispatch({ type: 'reviews/current', payload: currentReviewIndex + 1 })
    }
    dispatch({ type: 'clicked/current', payload: 'right' })
  }

  return (
    <section className='mx-2 mt-10 p-4 font-poppins'>
      <h2 className='text-center mb-4'>Our Customers Speak for Us</h2>
      <div className='border-2 border-slate-400 h-80 min-[375px]:w-fit sm:w-[40rem] lg:w-[35rem] w-[17rem] overflow-auto px-2 p-10 flex items-center gap-4 rounded-xl'>
        <Button
          onClick={btnDisabled ? () => {} : handleLeft}
          variant='outline'
          size='icon'
        >
          <ChevronLeft className='h-4 sm:w-10' />
        </Button>

        <div className='sm:p-10'>
          <div className='flex flex-col gap-2'>
            <Stars quantity={reviews[currentReviewIndex].rating} />
            <p className='text-sm'>{reviews[currentReviewIndex].review}</p>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage
                  src={reviews[currentReviewIndex].img}
                  alt='@customer image'
                />
                <AvatarFallback>Customer Image</AvatarFallback>
              </Avatar>
              <p className='text-sm whitespace-nowrap'>
                {reviews[currentReviewIndex].name}
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={btnDisabled ? () => {} : handleRight}
          variant='outline'
          size='icon'
        >
          <ChevronRight className='h-4 sm:w-10' />
        </Button>
      </div>
      <p className='mt-4 text-xs lg:text-sm text-center'>
        4.8 average rating from 1814 reviews
      </p>
    </section>
  )
}

export default CustomerReview
