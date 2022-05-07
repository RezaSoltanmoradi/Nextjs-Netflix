import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import { RecoilRoot } from 'recoil'
import ProvideTableContext from '../context/TableContext'

function MyApp({ Component, pageProps }: AppProps) {
  // HOC
  return (
    <RecoilRoot>
      {/* Higher Order Component */}
      <AuthProvider>
        <ProvideTableContext>
          <Component {...pageProps} />
        </ProvideTableContext>
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp
