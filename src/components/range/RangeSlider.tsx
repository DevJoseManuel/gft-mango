import { FixedRange } from './FixedRange'
import { NormalRange } from './NormalRange'

type FixedRangeProps = {
  onChange: (minValue: number, maxValue: number) => void
  values: number[]
  variant: 'fixed'
}

type NormalRangeProps = {
  max: number
  min: number
  onChange: (minValue: number, maxValue: number) => void
  variant: 'normal'
}

type RangeProps = FixedRangeProps | NormalRangeProps

export const Range: React.FC<RangeProps> = props =>
  props.variant === 'fixed' ? (
    <FixedRange {...props} />
  ) : (
    <NormalRange {...props} />
  )
