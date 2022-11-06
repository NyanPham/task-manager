function SectionHeader({ title, description }) {
    return (
        <div className="pb-7">
            <h1 className="text-2xl font-semibold text-gray-800">
                Daily Tasks
                {title}
            </h1>
            <p className="mt-4 text-base font-semibold tracking-tight text-gray-600 leading-7 w-2/3">
                {description}
            </p>
        </div>
    )
}

export default SectionHeader
