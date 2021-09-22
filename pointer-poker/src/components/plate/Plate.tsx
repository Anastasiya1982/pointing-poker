import React, { FC } from 'react';
import './plate.scss';

interface PropsPlate {
  className?:string
  children: React.ReactNode;
  onClick?: () => void;
}

const Plate: FC<PropsPlate> = ({ children,className }) => {
  return <div className="plate">{children}</div>;
};

export default Plate;
