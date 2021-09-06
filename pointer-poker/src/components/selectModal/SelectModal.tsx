import React, { FC } from 'react';
import './selectModal.scss';

interface PropsSelect {
  value: string;
  onChange: () => void;
}

const SelectModal: FC<PropsSelect> = ({ value, onChange }) => {
  return (
    <div>
      <label className="label-select-modal" htmlFor="priority">
        <select className="select-modal" name="priority" onChange={onChange} value={value}>
          <option>Low</option>
          <option>Middle</option>
          <option>Hight</option>
        </select>
      </label>
    </div>
  );
};

export default SelectModal;
