import Alert from '../components/Alert/alert'
import Layout from '../components/layout'
import ContextProvider from '../context/context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <ContextProvider>
            <Component {...pageProps} />
        </ContextProvider>
    )
}

export default MyApp
