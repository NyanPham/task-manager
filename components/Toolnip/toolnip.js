import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCaretUp,
    faCaretLeft,
    faCaretRight,
    faCaretDown,
} from '@fortawesome/free-solid-svg-icons'

function getIcon(position) {
    let icon
    if (position === 'left') icon = faCaretRight
    if (position === 'right') icon = faCaretLeft
    if (position === 'top') icon = faCaretDown
    if (position === 'bottom') icon = faCaretUp

    return icon
}

function getClasses(position) {
    let classes

    if (position === 'left')
        classes = 'top-1/2 -translate-y-1/2 right-full -translate-x-2'
    if (position === 'right')
        classes = 'top-1/2 -translate-y-1/2 left-full translate-x-2'
    if (position === 'top')
        classes = 'left-1/2 -translate-x-1/2 bottom-full -translate-y-2'
    if (position === 'bottom')
        classes = 'left-1/2 -translate-x-1/2 top-full translate-y-2'

    return classes
}

function getCaretClasses(position, color) {
    let caretClasses

    if (position === 'left')
        caretClasses = 'top-1/2 -translate-y-1/2 right-0 translate-x-1/2'
    if (position === 'right')
        caretClasses = 'top-1/2 -translate-y-1/2 left-0 -translate-x-1/2'
    if (position === 'top')
        caretClasses = 'left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2'
    if (position === 'bottom')
        caretClasses = 'left-1/2 -translate-x-1/2 top-0 -translate-y-1/2'

    const segments = color.split('-')
    segments[0] = 'text'
    const caretColor = segments.join('-')

    return { caretClasses, caretColor }
}

function Toolnip({ children, content, position, bgColor, textColor }) {
    const icon = getIcon(position)
    const classes = getClasses(position)
    const { caretClasses, caretColor } = getCaretClasses(position, bgColor)

    return (
        <div className="relative group">
            {children}
            <div
                className={`absolute rounded-lg p-2 text-xs opacity-0 pointer-events-none transition duration-200 group-hover:opacity-100 ${classes} ${bgColor} ${textColor}`}
            >
                <FontAwesomeIcon
                    icon={icon}
                    className={`absolute text-lg ${caretColor} ${caretClasses}`}
                />
                {content}
            </div>
        </div>
    )
}

export default Toolnip
