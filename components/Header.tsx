import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HiSearch, HiBell } from 'react-icons/hi'
import useAuth from '../hooks/useAuth'
import AccountMenu from './AcountMenu'
import BasicMenu from './BasicMenu'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const { logout } = useAuth()
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
        <BasicMenu/>
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & popular</li>
          <li className="headerLink">
            <Link href='/myList'>Favorite List</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <HiSearch className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <HiBell className=" h-6 w-6 " />
        {/* <Link href="/account"> */}
        <AccountMenu/>
        {/* <img
          onClick={logout}
          src="https://rb.gy/g1pwyx"
          alt=""
          className="cursor-pointer rounded"
        /> */}
      </div>
    </header>
  )
}
export default Header
