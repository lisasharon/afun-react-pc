import { DatePicker } from 'antd'
import type { DatePickerProps } from 'antd'
import type { Dayjs } from 'dayjs'
import './index.css'

export type AppDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  value: Dayjs | null
  onChange: (value: Dayjs | null) => void
}

export function AppDatePicker({
  value,
  onChange,
  className,
  allowClear = false,
  format = 'YYYY/M/D',
  ...rest
}: AppDatePickerProps) {
  return (
    <DatePicker
      {...rest}
      className={['app-date-picker', className].filter(Boolean).join(' ')}
      value={value}
      onChange={(date) => {
        if (Array.isArray(date)) return
        onChange(date)
      }}
      allowClear={allowClear}
      format={format}
      inputReadOnly
    />
  )
}
