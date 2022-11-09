import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const dev = process.env.NODE_ENV !== 'production'

export const server_url = dev ? 'http://localhost:3000' : ''

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        router.push('/daily-tasks')
    }, [])

    return (
        <div>
            <Head>
                <title>Task Manager</title>
                <meta
                    name="description"
                    content="Task Manager: My life savior"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1 className="text-cyan-500 text-5xl">Hello World</h1>
            </main>
        </div>
    )
}
