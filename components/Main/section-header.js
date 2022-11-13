import Image from 'next/image'
import { useAppContext } from '../../context/context'
import Toolnip from '../Toolnip/toolnip'

function SectionHeader({ title, description }) {
    const { state } = useAppContext()
    const { email, name, photo } = state.currentUser

    return (
        <div className="pb-7 flex flex-row items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    {title}
                </h1>
                <p className="mt-4 text-base font-semibold tracking-tight text-gray-600 leading-7 w-3/4">
                    {description}
                </p>
            </div>
            <Toolnip
                position={'bottom'}
                content={email}
                bgColor="bg-teal-600"
                textColor="text-white"
            >
                <Image
                    className="rounded-full overflow-hidden w-10 h-10"
                    src={`/images/users/${photo}`}
                    alt={name}
                    width={40}
                    height={40}
                />
            </Toolnip>
        </div>
    )
}

export default SectionHeader
