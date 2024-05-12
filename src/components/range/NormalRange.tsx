/**
 * Normal range from min to max number.
 */

'use client'

import { useState } from 'react'
import Draggable, { ControlPosition } from 'react-draggable'

export type NormalRangeProps = {
  max: number
  min: number
  onChange: (minValue: number, maxValue: number) => void
}

type HoverBullet = 'max' | 'min' | undefined

export const NormalRange: React.FC<NormalRangeProps> = ({
  max,
  min,
  onChange
}) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [hoverBullet, setHoverBullet] = useState<HoverBullet>(undefined)

  const [maxValue, setMaxValue] = useState(max)
  const [maxInput, setMaxInput] = useState<string | number>(max)
  const [maxPosition, setMaxPosition] = useState<ControlPosition>({
    x: maxValue - min,
    y: 0
  })

  const [minValue, setMinValue] = useState(min)
  const [minInput, setMinInput] = useState<string | number>(min)
  const [minPosition, setMinPosition] = useState<ControlPosition>({
    x: minValue - min,
    y: 0
  })

  const handleMaxChange = (newValue: number) => {
    if (newValue >= minValue && newValue <= max) {
      setMaxValue(newValue)
      setMaxPosition({ x: newValue - min, y: 0 })
      setError('')
      onChange(minValue, newValue)
    } else if (newValue < minValue) {
      setError('Maximum value cannot be less than the minimum value.')
      setMaxValue(maxValue)
      setMaxInput(maxValue)
    } else if (newValue > max) {
      setError('Maximum value cannot be greater than the max prop.')
      setMaxValue(maxValue)
      setMaxInput(maxValue)
    }
  }

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setMaxInput(newValue)
    const parsed = parseInt(newValue)
    if (isNaN(parsed)) {
      setError('Maximum value must be a number.')
    } else {
      setError('')
      handleMaxChange(parsed)
    }
  }

  const handleMinChange = (newValue: number) => {
    if (newValue <= maxValue && newValue >= min) {
      setMinValue(newValue)
      setMinPosition({ x: newValue - min, y: 0 })
      setError('')
      onChange(newValue, maxValue)
    } else if (newValue > maxValue) {
      setError('Minimum value cannot be greater than the maximum value.')
      setMinValue(minValue)
      setMinInput(minValue)
    } else if (newValue < min) {
      setError('Minimum value cannot be less than the min prop.')
      setMinValue(minValue)
      setMinInput(minValue)
    }
  }

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setMinInput(newValue)
    const parsed = parseInt(newValue)
    if (isNaN(parsed)) {
      setError('Minimum value must be a number.')
    } else {
      setError('')
      handleMinChange(parsed)
    }
  }

  // Guard condition.
  if (min >= max) {
    return null
  }

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center'>
        <div className='w-fit flex items-center text-right pr-2'>
          <input
            className='w-12 bg-black text-right ring-0 outline-none hover:cursor-pointer'
            onChange={handleMinInput}
            type='text'
            value={minInput}
          />
          <span className='ml-2 mr-4'>€</span>
        </div>

        <div
          className='flex items-center relative'
          style={{ width: max - min + 10 }}
        >
          <Draggable
            axis='x'
            bounds={{ left: 0, right: max - min }}
            defaultPosition={{ x: 0, y: 0 }}
            onDrag={(_, data) => setMinInput(Math.round(data.x))}
            onStop={(_, data) => handleMinChange(Math.round(data.x))}
            position={minPosition}
          >
            <div
              className={`absolute cursor-pointer rounded-full z-10 bg-gray-300 ${
                hoverBullet === 'min' ? 'w-6 h-6' : 'w-4 h-4'
              }`}
              onMouseEnter={() => setHoverBullet('min')}
              onMouseLeave={() => setHoverBullet(undefined)}
            ></div>
          </Draggable>

          <Draggable
            axis='x'
            bounds={{ left: 0, right: max - min }}
            defaultPosition={{ x: max, y: 0 }}
            onDrag={(_, data) => setMaxInput(Math.round(data.x))}
            onStop={(_, data) => handleMaxChange(Math.round(data.x))}
            position={maxPosition}
          >
            <div
              className={`absolute cursor-pointer bg-gray-300 rounded-full z-10 ${
                hoverBullet === 'max' ? 'w-6 h-6' : 'w-4 h-4'
              }`}
              onMouseEnter={() => setHoverBullet('max')}
              onMouseLeave={() => setHoverBullet(undefined)}
            ></div>
          </Draggable>

          <div className='bg-gray-300 h-1 absolute left-0 right-0'></div>
        </div>

        <div className='w-fit flex items-center text-right pl-5'>
          <input
            className='w-12 bg-black text-right ring-0 outline-none hover:cursor-pointer'
            id='max-value'
            onChange={handleMaxInput}
            type='text'
            value={maxInput}
          />
          <span className='ml-2 mr-4'>€</span>
        </div>
      </div>

      <div className='text-xs text-center text-neutral-600'>
        Valid range: [{min}-{max}]
      </div>
      <div className='text-center text-red-500 h-2'>{error}</div>
    </div>
  )
}
