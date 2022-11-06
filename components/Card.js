const Card = ({ children, bg }) => {
    return (
        <div
            className={`w-full h-full rounded-xl shadow-xl overflow-hidden relative ${bg}`}
        >
            {children}
        </div>
    )
}

export default Card
