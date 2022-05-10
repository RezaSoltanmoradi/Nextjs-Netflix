import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Movie } from '../typings/typings'
import BasicMenu from './BasicMenu'
import Search from './Search'
interface Props {
  allMovies: Movie[][]
}
const Header = ({ allMovies }: Props) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const Movies = allMovies[0]
    .concat(allMovies[1])
    .concat(allMovies[2])
    .concat(allMovies[3])
    .concat(allMovies[4])
    .concat(allMovies[5])
    .concat(allMovies[6])
    .concat(allMovies[7])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          alt=""
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <BasicMenu />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & popular</li>
          <li className="headerLink">
            <Link href="/myList">Favorite List</Link>
          </li>
        </ul>
      </div>
      <Search movies={Movies} />
    </header>
  )
}
export default Header
