import React, { FC } from 'react';
import './plate.css';
import classNames from 'classnames';
import Avatar from '../avatar/Avatar';

type PropsPlate = {
  name: string;
  job: string;
  // className: string;
};

const Plate: FC<PropsPlate> = ({ name, job }) => {
  // const g = classNames('plate', className);
  const classDate = classNames('name');
  const classJob = classNames('job');
  return (
    <div className="plate">
      <div className={classDate}>{name}</div>
      <div className={classJob}> {job}</div>
      <Avatar fallbackText="MN" />
    </div>
  );
};

export default Plate;
