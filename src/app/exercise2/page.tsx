'use client'

import { Range } from '@/components'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageExercise2() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const [apiPoints, setApiPoints] = useState<number[] | undefined>(undefined)

  const fetchData = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_MOCKABLE_REST_FIXED_RANGE as string
    )

    if (response.ok) {
      const data = await response.json()
      setApiPoints(data.points)
      setError(undefined)
    } else {
      setError('Error fetching data')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return isLoading ? (
    <div className='flex flex-col gap-1'>
      <div className='text-center'>Loading data...</div>
      <div className='text-sm text-neutral-600'>
        {process.env.NEXT_PUBLIC_MOCKABLE_REST_FIXED_RANGE}
      </div>
    </div>
  ) : error ? (
    <div className='flex flex-col gap-1'>
      <div className='text-center text-red-500'>{error}</div>
      <div className='text-sm text-neutral-600'>
        Please review the messages in the javascript console.
      </div>
    </div>
  ) : (
    <>
      <Range
        onChange={(min, max) => console.log(`Range: [${min}, ${max}]`)}
        values={apiPoints as number[]}
        variant='fixed'
      />
      <button
        className='w-fit px-4 py-2 rounded-md border-2 transition font-semibold border-neutral-700 hover:border-white text-neutral-400 hover:text-white'
        onClick={() => router.push('/')}
      >
        Back to Home
      </button>
    </>
  )
}
