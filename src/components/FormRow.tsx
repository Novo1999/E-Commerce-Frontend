import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FieldValues } from 'react-hook-form'

const FormRow = ({ label, field }: { label: string; field: FieldValues }) => {
  return (
    <FormItem className='flex flex-col items-start w-80'>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
export default FormRow
