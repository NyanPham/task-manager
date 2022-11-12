import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import AuthLayout from '../../components/auth-layout'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    async function handleCreateAccount(e) {
        e.preventDefault()

        if (!email || !password) {
            return alert('Please provide email and password') // todo
        }

        if (password !== passwordConfirm) {
            return alert('Passwords do not match')
        }

        const res = await axios.post('http://localhost:3000/api/auth/signup', {
            email,
            password,
            passwordConfirm,
        })
        // todo
    }

    return (
        <AuthLayout>
            <h1 className="mt-7 text-2xl text-teal-600 font-semibold">
                Sign Up
            </h1>
            <p className="mt-2 text-base font-medium text-slate-600">
                Enter the information below to sign up
            </p>
            <div className="w-3/5 mt-7 md:w-lg">
                <form className="space-y-7" onSubmit={handleCreateAccount}>
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
                    <fieldset className="flex flex-col justify-center items-start gap-1">
                        <label htmlFor="password-confirm">
                            Password Confirm
                        </label>
                        <input
                            className="outline-none rounded-md border border-gray-800 w-full py-2 px-4 transition focus:ring focus:ring-offset-1 focus:ring-teal-600"
                            type="password"
                            name="password-confirm"
                            id="password-confirm"
                            placeholder="Confirm your password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </fieldset>
                    <button
                        className="w-full text-base font-semibold rounded-sm bg-teal-500 py-2 px-4 text-white transition transform duration-300 hover:bg-teal-400 hover:-translate-y-1 hover:shadow-md active:bg-cyan-500"
                        type="submit"
                    >
                        Create Account
                    </button>
                </form>
                <p className="mt-5 text-center">
                    Already have an account?{' '}
                    <Link
                        href="/auth/login"
                        className="underline underline-offset-3 text-teal-500 hover:text-teal-400 active:text-teal-800"
                    >
                        Log in now
                    </Link>
                </p>
            </div>
        </AuthLayout>
    )
}

export default SignUp
