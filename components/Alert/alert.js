import { useAppContext } from '../../context/context'
import { useEffect, useRef } from 'react'

function Alert() {
    const { state } = useAppContext()
    const { title, status, message, showAlert } = state
    const alertRef = useRef()

    useEffect(() => {
        if (showAlert && alertRef.current.getAttribute('open'))
            return alertRef.current.showModal()

        return alertRef.current.close()
    }, [showAlert])

    let classes
    if (status === 'success') classes = 'bg-green-500'
    if (status === 'fail') classes = 'bg-red-500'
    if (status === 'loading') classes = 'bg-cyan-500'

    return (
        <dialog ref={alertRef}>
            <div
                className={`fixed bottom-0 left-0 w-full bg-black text-white ${classes}`}
            >
                <h3 className="block text-center py-4 border-b border-white">
                    {title}
                </h3>
                <div>{message}</div>
            </div>
        </dialog>
    )
}

export default Alert
