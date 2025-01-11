import { CheckIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import ModalInfo from '../components/Modal'
import Row from '../components/Row'
import { TableContext } from '../context/TableContext'
import useAuth from '../hooks/useAuth'

const MyList = () => {
  const { logout } = useAuth()
  const { productList } = useContext(TableContext)
  const [showModal, setShowModal] = useRecoilState(modalState)

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix"
            width={150}
            height={50}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={logout}
        >
          Sign Out
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        <div className="mt-4 mb-4 flex flex-col space-y-16">
          <Row
            title="favorite list "
            movies={productList.map((p) => p.product)}
          />
          {showModal && <ModalInfo />}

          <Link href="/">
            <a className="mx-auto mt-10 h-full w-[200px] rounded border-2 bg-red-700  py-4 text-center hover:bg-red-500 ">
              Home
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}
export default MyList
