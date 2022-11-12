function AuthLayout({ children }) {
    return (
        <div>
            <header className="flex justify-between items-center py-4 px-12 shadow-lg">
                <div>Logo</div>
                <button className="text-base font-semibold rounded-sm bg-teal-500 py-2 px-4 text-white transition transform duration-300 hover:bg-teal-400 hover:-translate-y-1 hover:shadow-md active:bg-cyan-500">
                    Login
                </button>
            </header>
            <main className="flex flex-col justify-center items-center">
                {children}
            </main>
        </div>
    )
}

export default AuthLayout
