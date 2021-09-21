import React, { FC } from 'react';
import './plate.scss';

interface PropsPlate {

  children: React.ReactNode;
  onClick?:()=>void;
}

const Plate: FC<PropsPlate> = ({ children,onClick }) => {

  return <div className="plate" >{children}</div>;
};

export default Plate;
