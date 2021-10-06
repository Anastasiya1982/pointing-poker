import React, { FC } from 'react';
import './plate.scss';

interface PropsPlate {
  children: React.ReactNode;
}

const Plate: FC<PropsPlate> = ({ children }) => {
  return <div className="plate">{children}</div>;
};

export default Plate;
