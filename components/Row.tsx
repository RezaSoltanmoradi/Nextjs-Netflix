import { Movie } from '../typings/typings'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Thumbnail from './Thumbnail'
import { useRef, useState } from 'react'
interface Props {
  title: string
  // when using firebase
  // movie: Movie[] | DocumentData[]
  movies: Movie[]
}
const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }
  // console.log(rowRef.current!.scrollLeft, rowRef.current!.clientWidth) 
  return (
    <div className=" h-40 space-y-0.5 md:space-y-2">
      <h2
        className=" tranition w-56 cursor-pointer text-sm font-semibold
       text-[#c8c6c6] duration-200 hover:text-white md:text-2xl "
      >
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <HiChevronLeft
          onClick={() => handleClick('left')}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer 
          opacity-0 transition duration-200 hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }
        `}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 
        md:p-2
        "
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <HiChevronRight
          onClick={() => handleClick('right')}
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer 
        opacity-0 transition duration-200 hover:scale-125 group-hover:opacity-100
        "
        />
      </div>
    </div>
  )
}
export default Row
