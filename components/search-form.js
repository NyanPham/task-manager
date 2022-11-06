import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchForm = () => {
    return (
        <div className="mt-8 p-4 rounded-3xl w-80 bg-white/50 flex gap-4 items-center justify-center">
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-4 h-4 text-white"
            />
            <input
                className="bg-transparent flex-shrink-0 grow outline-none text-base text-white/80 placeholder:text-white/70 placeholder:text-sm"
                type="search"
                placeholder="Search Task or Project..."
            />
        </div>
    )
}

export default SearchForm
