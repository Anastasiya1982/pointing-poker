/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { FC, useCallback } from 'react';
import './modalView.scss';

interface PropsModal {
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode;
}

const ModalView: FC<PropsModal> = ({ active, setActive, children }) => {
  const closeModal = useCallback(() => {
    setActive(false);
  }, [setActive]);

  return (
    <div aria-hidden="true" className={active ? 'modal active' : 'modal'} onClick={closeModal}>
      <div
        role="table"
        className={active ? 'modal-content active' : 'modal-content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalView;
