import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import AuthLayout from '../../components/auth-layout'
import { getCookies } from 'cookies-next'

const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn(e) {
        e.preventDefault()

        if (!email || !password) {
            return alert('Please provide email and password') // todo
        }

        const res = await axios.post('http://localhost:3000/api/auth/login', {
            email,
            password,
        })
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
                        className="w-full text-base font-semibold rounded-sm bg-teal-500 py-2 px-4 text-white transition transform duration-300 hover:bg-teal-400 hover:-translate-y-1 hover:shadow-md active:bg-cyan-500"
                        type="submit"
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
