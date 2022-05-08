import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'
import { Movie } from '../typings/typings'
interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}
const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})
//-------------------------------------------------
interface AuthProviderProps {
  children: React.ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  // Persisting the user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // logged in ...
        setUser(user)
        setLoading(false)
      } else {
        // not logged in
        setUser(null)
        setLoading(true)
        router.push('/login')
      }
      setInitialLoading(false)
    })
  }, [auth])
  //------------------------------------------------
  const signUp = async (email: string, password: string) => {
    setLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }
  //-------------------------------------------------
  const signIn = async (email: string, password: string) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }
  //-------------------------------------------------
  const logout = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
    const loadedProducts: { product: Movie; starMovie: boolean }[] = []
    function updateStorage(key: string, value: any) {
      const changeToString = JSON.stringify(value)
      localStorage.setItem(key, changeToString)
    }
    updateStorage('products', loadedProducts)
  }
  //-------------------------------------------------
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      logout,
      error,
    }),
    [user, loading, error]
  )
  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}
// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
  return useContext(AuthContext)
}
