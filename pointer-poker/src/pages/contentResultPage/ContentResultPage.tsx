import React from 'react';
import './contentResultPage.scss';
import { useAppSelector } from '../../redux/hooks';
import { TableResults } from '../resultPage/table';
import Button from '../../components/button/Button';

import { exportToCSV } from '../../utils/utils';

const ContentResultPage = () => {

  const onDowloadFile = (e: any) => exportToCSV(players, "results");
  const players = useAppSelector((state) => state.game.users);

  return (
    <div className="wrapper-contentResult-page">
      <div className="heder-result">
        <div className="btn-download">
          <Button onClick={onDowloadFile} TypeBtn="filled" label="Download" />
          <TableResults />
        </div>
      </div>
      <div className="wrapper-issue" />
    </div>
  );
};

export default ContentResultPage;
