import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'

type DropdownProps = {
  link: string
  pageName: string
  setIsHamburgerMenuOpen: (arg: boolean) => boolean | void
}

const DropDownItem = ({
  link,
  pageName,
  setIsHamburgerMenuOpen,
}: DropdownProps) => {
  return (
    <DropdownMenuItem
      onClick={() => setIsHamburgerMenuOpen(false)}
      className='text-2xl'
    >
      <Link to={link}>{pageName}</Link>
    </DropdownMenuItem>
  )
}
export default DropDownItem
