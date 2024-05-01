import { useEffect, useRef, useState } from 'react'
import Timer from './components/Timer'
import { handleConfetti } from './utils/confetti'

export default function App() {
  const mcgrawRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState<number>(0)
  const [timerStatus, setTimerStatus] = useState<boolean>(false)
  const [isPc, setIsPc] = useState<boolean>(false)

  useEffect(() => {
    setIsPc(!/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent))
  }, [isPc])

  const handleStart = (
    e: React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement>,
    deviceCheck: boolean
  ): void => {
    if (
      !deviceCheck ||
      (e.target as HTMLElement).tagName === 'BUTTON' ||
      (!timerStatus && count !== 0)
    ) {
      return
    }

    setTimerStatus(true)

    if (mcgrawRef.current) {
      mcgrawRef.current.style.transform = 'scale(1.15)'
    }

    setCount(prev => {
      handleConfetti(prev + 1)
      return prev + 1
    })
  }

  const handleEnd = (deviceCheck: boolean): void => {
    if (!deviceCheck) {
      return
    }

    if (mcgrawRef.current) {
      mcgrawRef.current.style.transform = 'scale(1)'
    }
  }

  return (
    <main
      className='w-full min-h-screen bg-[#23252c] sm:pt-[10vh] pt-[9vh] cursor-pointer'
      onMouseDown={e => handleStart(e, isPc)}
      onMouseUp={() => handleEnd(isPc)}
      onTouchStart={e => handleStart(e, !isPc)}
      onTouchEnd={() => handleEnd(!isPc)}
    >
      <div className='flex flex-col items-center justify-center sm:h-[120px] h-[25vw]'>
        <Timer timerStatus={timerStatus} />

        {count > 0 && (
          <button
            type='button'
            onClick={() => {
              setTimerStatus(prev => !prev)
            }}
            className={`select-none text-white border-none sm:mt-7 mt-[7vw] sm:text-xl text-[3.75vw] sm:rounded-lg rounded-[1vw] sm:py-2 sm:px-4 p-[1.75vw_4vw] ${
              timerStatus ? 'bg-[#ff8400]' : 'bg-[#3660f7]'
            }`}
          >
            {timerStatus ? 'PAUSE' : 'RESUME'}
          </button>
        )}
      </div>
      <div
        className='relative sm:w-[300px] sm:h-[600px] w-[65vw] h-[130vw] bg-no-repeat bg-cover bg-center transition-[all_ease_.3s] mx-auto mt-10 sm:mt-14 bg-[url("/mcgraw.png")]'
        ref={mcgrawRef}
      >
        <p className='absolute top-[60%] left-[52%] translate-x-[-50%] bg-none border-none outline-none font-semibold sm:text-3xl text-[6vw] select-none'>
          {count}
        </p>
      </div>
    </main>
  )
}
