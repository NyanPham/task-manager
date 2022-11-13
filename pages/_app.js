import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Alert from '../components/Alert/alert'
import ContextProvider from '../context/context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <ContextProvider>
            <Component {...pageProps} />
            <Alert />
        </ContextProvider>
    )
}

export default MyApp
