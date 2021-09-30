import React from 'react';
import './contentResultPage.scss';
import { TableResults } from '../resultPage/tableResults/table';

const ContentResultPage = () => {
  return (
    <div className="wrapper-contentResult-page">
      <div className="heder-result">
        <div className="results-content">
          <TableResults  />
        </div>
      </div>
      <div className="wrapper-issue" />
    </div>
  );
};

export default ContentResultPage;
