import Image from 'next/image'
import Link from 'next/link'
import Card from '../Card'
import useToggleNavigationActive from '../../hooks/useToggleNavigationActive'

const NavigationCard = ({ title, image, href }) => {
    const isActive = useToggleNavigationActive(href)

    const cardWrapperClasses = isActive
        ? 'w-24 h-24 ring-2 ring-pink-500 ring-offset-4 rounded-xl transition duration-250'
        : 'w-24 h-24 transition duration-250'

    return (
        <li className="transition transform duration-250 hover:-translate-y-2 hover:rotate-6 ring-offset-">
            <Link href={href}>
                <div className={cardWrapperClasses}>
                    <Card>
                        <Image
                            src={`/images/types/${image}`}
                            alt={title}
                            fill={true}
                        />
                    </Card>
                </div>
                <h3 className="text-sm text-white text-center font-medium mt-3">
                    {title}
                </h3>
            </Link>
        </li>
    )
}

export default NavigationCard
