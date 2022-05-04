import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { baseURL } from '../constants/movie'
import { Movie } from '../typings/typings'
import { FaPlay } from 'react-icons/fa'
import { HiInformationCircle } from 'react-icons/hi'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
interface Props {
  netFlixOrginals: Movie[]
}
function Banner({ netFlixOrginals }: Props) {
  const lazyRootRef = useRef<null>(null)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  useEffect(() => {
    setMovie(
      netFlixOrginals[Math.floor(Math.random() * netFlixOrginals.length)]
    )
  }, [netFlixOrginals])

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        {movie && (
          <Image
            layout="fill"
            src={`${baseURL}${movie?.backdrop_path || movie?.poster_path}`}
            lazyRoot={lazyRootRef}
            objectFit="cover"
          />
        )}
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl ">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black ">
          <FaPlay className="h-4 w-4 text-black md:w-7" /> Play
        </button>
        <button
          className="bannerButton bg-[gray]/70 text-black"
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
        >
          <HiInformationCircle className="h-5 w-5 md:h-8 md:w-8 " /> More Info
        </button>
      </div>
    </div>
  )
}
export default Banner
