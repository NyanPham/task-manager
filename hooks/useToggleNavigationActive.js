import { useState } from 'react'
import { useRouter } from 'next/router'

export default function useToggleNavigationActive(href) {
    const router = useRouter()
    const [isActive, setIsActive] = useState(false)

    if (router.route.includes(href) && !isActive) {
        setIsActive(true)
    } else if (!router.route.includes(href) && isActive) {
        setIsActive(false)
    }

    return isActive
}
