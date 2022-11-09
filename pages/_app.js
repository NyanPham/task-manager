import Layout from '../components/layout'
import TaskContextProvider from '../context/taskContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <TaskContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </TaskContextProvider>
    )
}

export default MyApp
