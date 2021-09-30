import React from 'react';
import './HeaderplaningIssue.scss';

import { getCurrentData } from '../../utils/utils';
import { useAppSelector } from '../../redux/hooks';

const HeaderPlaningIssue = () => {
  const issues = useAppSelector((state) => state.issie.issues);

  const currentData = getCurrentData();
  return (
    <div className="date">
      <span className='currentData'>{currentData}</span> planning issues:{' '}
      {issues
        ? issues.map((iss) => {
            return <span className='planingIssue'>{iss.title},</span>;
          })
        : ''}....
    </div>
  );
};
export default HeaderPlaningIssue;
