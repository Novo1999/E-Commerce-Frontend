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
        {label === 'Image' ? (
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Input
              onChange={(e) => {
                field.onChange(e.target.files)
              }}
              id='picture'
              name='avatar'
              type='file'
            />
          </div>
        ) : (
          <Input {...field} />
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
export default FormRow
