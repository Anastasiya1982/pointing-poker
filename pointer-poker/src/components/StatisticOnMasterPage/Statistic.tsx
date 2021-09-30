import React, { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import CardsInGame from '../contentGamePageMaster/CardsInGame/CardsInGame';
import { countResults } from '../../utils/utils';
import './Statistic.scss';
import Cup from '../../assets/littleCup.png';


const Statistic = () => {
  const isScrumMusterAPlayer = useAppSelector((state) => state.game.isScrumMasterAPlayer);
  const activeIssue = useAppSelector((state) => state.issie.activeIssue);
  const issues = useAppSelector((state) => state.issie.issues);

  const currentIssueResult = issues.filter((iss) => iss.title === activeIssue?.title);
  const values = currentIssueResult[0].results;
  const procentsResult = countResults(values);
  console.log(procentsResult);

  return (
    <div>
      <div className="scrumMasterGame-container">
        <h5>Statistics:</h5>
        <div className="statistic-container">
          {procentsResult
            ? procentsResult.map((res) => {
                const value = res[0] === '0' || null ? <img  className='statistic-img' src={Cup} alt='cup'/> : res[0];
                return (
                  <div className="statistic-result">
                    <div className="statistic-card">
                      <div className="statistic-card-value">{value}</div>
                    </div>
                    <div className="persent">{res[1]} %</div>
                  </div>
                );
              })
            : ''}
        </div>
        {isScrumMusterAPlayer ? <CardsInGame /> : ''}
      </div>
    </div>
  );
};
export default Statistic;
