import SearchForm from './search-form'

const Header = () => {
    return (
        <div className="flex flex-col justify-center items-start flex-shrink-0 w-96">
            <h2 className="text-4xl text-white font-semibold">Hello Jack</h2>
            <p className="mt-4 text-gray-600 text-base tracking-tight font-medium">
                I missed you Jack. Have a nice day!
            </p>
            <SearchForm />
        </div>
    )
}

export default Header
