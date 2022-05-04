import Image from 'next/image'
import { useRef, useState } from 'react'
import { Movie } from '../typings/typings'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from './../atoms/modalAtom'
interface Props {
  // when using firebase
  // movie: Movie | DocumentData
  movie: Movie
}
const Thumbnail = ({ movie }: Props) => {
  const lazyRootRef = useRef<null>(null)

  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200
    ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 "
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        lazyRoot={lazyRootRef}
        objectFit="cover"
      />
    </div>
  )
}
export default Thumbnail
