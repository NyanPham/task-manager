import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import AuthLayout from '../../components/auth-layout'
import { useAppContext } from '../../context/context'
import { useRouter } from 'next/router'

const LogIn = () => {
    const { state, setAlertLoading, setAlertContent, setShowAlert } =
        useAppContext()
    const { isLoading } = state
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn(e) {
        e.preventDefault()

        if (!email || !password) {
            setAlertLoading(false)
            setAlertContent({
                title: 'Failed to login',
                message: 'Please provide email and password',
                status: 'fail',
            })
            setShowAlert(true)
            return
        }

        try {
            setAlertLoading(true)
            setAlertContent({
                title: 'Logging in',
                message: 'Logging you in',
                status: 'waiting',
            })
            setShowAlert(false)

            const res = await axios.post(
                'http://localhost:3000/api/auth/login',
                {
                    email,
                    password,
                }
            )

            const { token, currentUser } = res.data
            localStorage.setItem('jwt', JSON.stringify(token))
            localStorage.setItem('currentUser', JSON.stringify(currentUser))

            setAlertLoading(false)
            setAlertContent({
                title: 'Signin',
                message: 'Logged in successfully',
                status: 'success',
            })

            setShowAlert(true)
            setTimeout(() => {
                router.replace('/daily-tasks')
                setShowAlert(false)
            }, 2000)
        } catch (err) {
            setAlertLoading(false)
            setAlertContent({
                title: 'Signin',
                message: 'Failed to login',
                status: 'fail',
            })
            setShowAlert(true)
        }
    }

    return (
        <AuthLayout>
            <h1 className="mt-7 text-2xl text-teal-600 font-semibold">Login</h1>
            <p className="mt-2 text-base font-medium text-slate-600">
                Enter the information below to sign in
            </p>
            <div className=" mt-7 w-96">
                <form className="space-y-7" onSubmit={handleSignIn}>
                    <fieldset className="flex flex-col justify-center items-start gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                            className="outline-none rounded-md border border-gray-800 w-full py-2 px-4 transition focus:ring focus:ring-offset-1 focus:ring-teal-600"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="flex flex-col justify-center items-start gap-1">
                        <label htmlFor="password">Password</label>
                        <input
                            className="outline-none rounded-md border border-gray-800 w-full py-2 px-4 transition focus:ring focus:ring-offset-1 focus:ring-teal-600"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>
                    <button
                        className="w-full text-base font-semibold rounded-sm bg-teal-500 py-2 px-4 text-white transition transform duration-300 hover:bg-teal-400 hover:-translate-y-1 hover:shadow-md active:bg-cyan-500 disabled:bg-gray-300 disabled:text-gray-700"
                        type="submit"
                        disabled={isLoading}
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-5 text-center">
                    Don&apos;t have an acocunt?{' '}
                    <Link
                        href="/auth/signup"
                        className="underline underline-offset-3 text-teal-500 hover:text-teal-400 active:text-teal-800"
                    >
                        Create now
                    </Link>
                </p>
            </div>
        </AuthLayout>
    )
}

export default LogIn
