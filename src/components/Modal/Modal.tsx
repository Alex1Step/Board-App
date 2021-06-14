import React, { ReactElement } from 'react'
import './Modal.css'

interface ModalProps {
  visible: boolean
  title: string
  onClose: () => void
  children: ReactElement
}

const Modal = ({
  visible = false,
  title = '',
  onClose,
  children,
}: ModalProps) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose()
        break
      case 'Enter':
        onClose()
        break
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  if (!visible) return null

  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-dialog' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h3 className='modal-title'>{title}</h3>
          <span className='modal-close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal