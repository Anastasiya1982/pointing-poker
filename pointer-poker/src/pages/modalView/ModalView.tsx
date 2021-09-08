import React, { FC } from 'react'
import './modalView.scss';

interface PropsModal {
  active: boolean,
  setActive: (active: boolean) => void,
  children: React.ReactNode,
}

const ModalView: FC<PropsModal> = ({active, setActive, children}) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? "modal-content active" : "modal-content"} onClick={e => e.stopPropagation()}>
        {children}
      </div>
      
    </div>
  )
}

export default ModalView;