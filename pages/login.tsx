import Head from 'next/head'
import Image from 'next/image'
import {  useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
interface formInputs {
  email: string
  password: string
}
const Login = () => {
  const [login, setLogin] = useState(false)
  const {  signIn, signUp } = useAuth()
 
  // const {register, handleSubmit, watch,formState: { errors } }=useForm();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formInputs>()

  // const onSubmit=()=> console.log(data);
  const onSubmit: SubmitHandler<formInputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else if (!login) {
      signUp(email, password)
    }
  }

  return (
    <div
      className="relative flex h-screen w-screen flex-col bg-black md:items-center
     md:justify-center md:bg-transparent"
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        className="-z-10 !hidden opacity-60 sm:!inline"
        src="https://rb.gy/p2hphi"
        layout="fill"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute  left-4  top-4 cursor-pointer object-contain text-center md:left-10 md:top-6 "
        width="150"
        height="150"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4 ">
          <label className="inline-block w-full ">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-center text-[13px] font-light text-orange-500">
                please enter a valid email
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-center text-[13px] font-light text-orange-500">
                your password must contain between 4 and 60 charactors.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => {
            setLogin(true)
          }}
        >
          {' '}
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix ?{' '}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            {' '}
            Sign Up now
          </button>
        </div>
      </form>
    </div>
  )
}
export default Login
