import { useAppContext } from '../../context/context'
import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

function Alert() {
    const { state, setShowAlert } = useAppContext()
    const { title, status, message, showAlert } = state
    const alertRef = useRef()

    useEffect(() => {
        if (showAlert) {
            alertRef.current.close()
            alertRef.current.showModal()

            clearTimeout(window.alertTimeout)
            window.alertTimeout = setTimeout(() => {
                setShowAlert(false)
            }, 3000)
            return
        }

        return alertRef.current.close()
    }, [showAlert, setShowAlert])

    let classes
    if (status === 'success') classes = 'bg-green-500'
    if (status === 'fail') classes = 'bg-red-500'
    if (status === 'loading') classes = 'bg-cyan-500'

    return (
        <dialog
            ref={alertRef}
            className={`p-0 select-none ${
                showAlert
                    ? 'opacity-100 pointer-events-auto transition duration-500 backdrop:opacity-100 backdrop:transition backdrop:duration-500'
                    : 'opacity-0 pointer-events-none transition duration-500 backdrop:opacity-0 backdrop:transition backdrop:duration-500'
            }`}
            onClick={() => {
                setShowAlert(false)
            }}
        >
            <div
                className={`fixed bottom-0 left-0 w-full text-white ${classes}`}
            >
                <h3 className="flex justify-between items-center py-3 px-8 border-b border-white">
                    {title}
                    <button>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </h3>
                <div className="py-4 px-8">{message}</div>
            </div>
        </dialog>
    )
}

export default Alert
