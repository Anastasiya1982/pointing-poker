import React from 'react';
import './selectModal.scss';

const SelectModal = () => {
  return (
    <div>
      <label className="label-select-modal" htmlFor="typepayment">
        <select className="select-modal" name="priority">
          <option>Low</option>
          <option>Middle</option>
          <option>Hight</option>
        </select>
      </label>
    </div>
  );
};

export default SelectModal;
