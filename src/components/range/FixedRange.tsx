/**
 * Fixed number of options range.
 */

'use client'

import { useMemo, useState } from 'react'
import Draggable, { ControlPosition } from 'react-draggable'

type HoverBullet = 'max' | 'min' | undefined

export type FixedRangeProps = {
  onChange: (minValue: number, maxValue: number) => void
  values: number[]
}

export const SEGMENT_WIDTH = 80

export const FixedRange: React.FC<FixedRangeProps> = ({ onChange, values }) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [hoverBullet, setHoverBullet] = useState<HoverBullet>(undefined)

  const points = useMemo(
    () => Array.from(new Set(values)).sort((a, b) => a - b),
    [values]
  )

  const max = points.length - 1
  const [maxIndex, setMaxIndex] = useState(max)
  const [maxPosition, setMaxPosition] = useState<ControlPosition>({
    x: (points.length - 1) * SEGMENT_WIDTH,
    y: 0
  })

  const min = 0
  const [minIndex, setMinIndex] = useState(min)
  const [minPosition, setMinPosition] = useState<ControlPosition>({
    x: 0,
    y: 0
  })

  const handleMaxChange = (x: number) => {
    const segment = Math.round(x / SEGMENT_WIDTH)
    if (segment > minIndex && segment <= max) {
      setMaxIndex(segment)
      setMaxPosition({ x: segment * SEGMENT_WIDTH, y: 0 })
      setError('')
      onChange(points[minIndex], points[segment])
    } else if (segment <= minIndex) {
      setError('Maximum value cannot be less than the minimum value.')
    }
  }

  const handleMinChange = (x: number) => {
    const segment = Math.round(x / SEGMENT_WIDTH)
    if (segment < maxIndex && segment >= min) {
      setMinIndex(segment)
      setMinPosition({ x: segment * SEGMENT_WIDTH, y: 0 })
      setError('')
      onChange(points[segment], points[maxIndex])
    } else if (segment >= maxIndex) {
      setError('Minimum value cannot be greater than the maximum value.')
    }
  }

  // Guard conditions.
  // ---------------------------------------------------------------------------
  if (points.length < 2) {
    return null
  }

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center'>
        <div className='w-20 flex items-center text-right pr-4'>
          {points[minIndex]} €
        </div>

        <div
          className='flex items-center relative h-6'
          style={{ width: (points.length - 1) * SEGMENT_WIDTH + 10 }}
        >
          <Draggable
            axis='x'
            bounds={{ left: 0, right: (points.length - 1) * SEGMENT_WIDTH }}
            defaultPosition={{ x: 0, y: 0 }}
            onStop={(_, { x }) => handleMinChange(x)}
            position={minPosition}
          >
            <div
              className={`absolute cursor-pointer rounded-full z-10 bg-gray-300 ${
                hoverBullet === 'min' ? 'w-6 h-6' : 'w-4 h-4'
              }`}
              data-testid='bullet-min'
              onMouseEnter={() => setHoverBullet('min')}
              onMouseLeave={() => setHoverBullet(undefined)}
            ></div>
          </Draggable>

          <Draggable
            axis='x'
            bounds={{ left: 0, right: (points.length - 1) * SEGMENT_WIDTH }}
            defaultPosition={{ x: (points.length - 1) * SEGMENT_WIDTH, y: 0 }}
            onStop={(_, { x }) => handleMaxChange(x)}
            position={maxPosition}
          >
            <div
              className={`absolute cursor-pointer rounded-full z-10 bg-gray-300 ${
                hoverBullet === 'min' ? 'w-6 h-6' : 'w-4 h-4'
              }`}
              data-testid='bullet-max'
              onMouseEnter={() => setHoverBullet('max')}
              onMouseLeave={() => setHoverBullet(undefined)}
            ></div>
          </Draggable>
          <div className='bg-gray-300 h-1 absolute left-0 right-0'></div>
          {Array.from({ length: points.length - 2 }).map((_, i) => (
            <div
              className='absolute bg-neutral-600 w-[2px] h-6'
              style={{
                left: `${(i + 1) * SEGMENT_WIDTH + 7}px`
              }}
              key={`sep-${i}`}
            ></div>
          ))}
        </div>

        <div className='w-fit flex items-center text-right pl-5'>
          {points[maxIndex]} €
        </div>
      </div>

      <div className='text-xs text-center text-neutral-600 pt-2'>
        Valid points: [{points.join(',')}]
      </div>
      <div className='text-center text-red-500 h-2'>{error}</div>
    </div>
  )
}
