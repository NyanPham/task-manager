import NavigationCard from './Navigation/navigation-card'

const DUMMY_DATA = [
    {
        title: 'Daily Tasks',
        image: 'daily-tasks.jpg',
        href: 'daily-tasks',
    },
    {
        title: 'Progress',
        image: 'progress.jpg',
        href: 'progress',
    },
    {
        title: 'Schedule',
        image: 'schedule.jpg',
        href: 'schedule',
    },
]

const ViewNavigation = () => {
    return (
        <ul className="flex w-96 gap-8 flex-wrap">
            {DUMMY_DATA.map((navigationData) => (
                <NavigationCard
                    key={navigationData.title}
                    {...navigationData}
                />
            ))}
        </ul>
    )
}

export default ViewNavigation
