import MuiModal from '@mui/material/Modal'
import { useState, useRef } from 'react'
import { HiSearch, HiBell } from 'react-icons/hi'
import AccountMenu from './AcountMenu'
import { Movie } from '../typings/typings'

import Row from './Row'
interface Props {
  movies: Movie[]
}
const Search = ({ movies }: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [foundMoives, setFoundMovies] = useState<Movie[]>([])

  const [searched, setSearched] = useState(false)
  if (searchInputRef && searchInputRef.current) searchInputRef.current.focus()
  const changeInputhandler = () => {
    const enteredSearchRef = searchInputRef.current!.value
    searchInputRef.current!.focus()
    const filterMovie = movies.filter((movie) =>
      movie?.title?.toLowerCase().includes(enteredSearchRef.toLowerCase())
    )
    // this part of code is removing every Repetitious objects in array
    const removeRepetitiousMovies = (arr: Movie[]) => {
      let shit = Object.values(
        arr.reduce(
          (acc: any, movie: any) =>
            Object.assign(acc, { [movie.title]: movie }),
          {}
        )
      )
      return shit
    }
    let resultMovies: any = removeRepetitiousMovies(filterMovie)
    setFoundMovies(resultMovies)
    setSearched(true)
  }
  const closeSearchHandler = () => {
    setSearched(false)
  }
  const onClickFirstInput = () => {
    setSearched(true)
    if (searchInputRef && searchInputRef.current) searchInputRef.current.focus()
  }
  return (
    <div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="z-50 transition duration-500 sm:inline"
        >
          <HiSearch className=" my-2 hidden h-8 w-[50px] rounded  text-xl font-semibold text-white  transition duration-500  hover:text-green-600 sm:inline" />

          <input
            type="text"
            placeholder="search"
            className=" my-2 h-8 w-[100px] rounded p-4 text-center text-xl font-semibold 
            text-black"
            onClick={onClickFirstInput}
            onChange={() => setSearched(true)}
          />
        </form>

        <MuiModal
          open={searched}
          onClose={closeSearchHandler}
          className="fixed !top-[200px] left-0 right-0  mx-auto w-full max-w-5xl overflow-hidden 
        overflow-y-scroll rounded-md scrollbar-hide"
        >
          <div className="h-[80%] w-[100%] rounded-[20px] bg-black p-6 text-center text-black">
            <form
              className="text-end right-0 flex h-16 w-full transition duration-500"
              onSubmit={(e) => e.preventDefault()}
            >
              <HiSearch className=" my-2 h-8 w-[50px] rounded  text-xl font-semibold text-white  transition duration-500  hover:text-green-600 sm:inline" />

              <input
                type="text"
                placeholder="search"
                className="  my-2 h-8 w-[200px] rounded p-4 text-center text-xl font-semibold 
            text-black focus:bg-green-100 lg:inline"
                onChange={changeInputhandler}
                ref={searchInputRef}
              />
            </form>
            <ul>
              {foundMoives.length > 0 ? (
                <li>
                  <Row title={'found movies'} movies={foundMoives} />
                </li>
              ) : (
                <li className="top-12 m-auto text-2xl text-white">
                  There is no movie with that name{' '}
                </li>
              )}
            </ul>
          </div>
        </MuiModal>
        <HiBell className=" h-6 w-6 " />
        <AccountMenu />
      </div>
    </div>
  )
}
export default Search
