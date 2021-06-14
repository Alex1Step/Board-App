import React, { ReactElement } from 'react'
import styles from './Modal.less'

interface ModalProps {
  visible: boolean
  title: string
  onClose: () => void
  children: ReactElement
}

const Modal = ({visible = false, title = '', onClose, children,}: ModalProps) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
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
    <div className={styles['modal']} onClick={onClose}>
      <div className={styles['modal-dialog']} onClick={e => e.stopPropagation()}>
        <div className={styles['modal-header']}>
          <h3 className={styles['modal-title']}>{title}</h3>
          <span className={styles['modal-close']} onClick={onClose}>
            &times;
          </span>
        </div>
        <div className={styles['modal-body']}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal