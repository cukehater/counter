import { useEffect, useRef, useState } from 'react'
import { timeFormat } from '../utils/timeFormat'

export default function Timer({ timerStatus }: { timerStatus: boolean }) {
  const intervalRef = useRef<number | undefined>(undefined)
  const [time, setTime] = useState<number>(0)

  useEffect(() => {
    if (timerStatus) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [timerStatus])

  return (
    <p className='m-0 text-white select-none sm:text-5xl text-[8vw]'>
      {timeFormat(time)}
    </p>
  )
}
