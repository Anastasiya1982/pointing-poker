import React from 'react';
import { ExportCSV } from './ExportCSV';
import { useAppSelector } from '../../../redux/hooks';
import { countResults } from '../../../utils/utils';
import Plate from '../../../components/plate/Plate';
import Cup from '../../../assets/littleCup.png';
import './table.scss';

export const TableResults = () => {
  const issues = useAppSelector((state) => state.issie.issues);
  const users= useAppSelector((state) => state.game.users);
  console.log(users);

  return (
    <>
      <ExportCSV csvData={JSON.stringify(issues)} filename="results" />
      <table>
        {issues.map((issue) => {
          const procentsResult = countResults(issue.results);
          return (
            <>
              <thead>
              <tr><Plate>Issue: {issue.title}</Plate></tr>
              </thead>
              <tbody>
                {procentsResult?.map((res) => {
                  const value = res[0] === '0' || null ? <img  className='statistic-img' src={Cup} alt='cup'/> : res[0];
                  return(
                    <td>
                      <div className="statistic-result">
                        <div className="statistic-card">
                          <div className="statistic-card-value">{value}</div>
                        </div>
                        <div className="persent">{res[1]} %</div>
                      </div>
                    </td>
                  ) ;
                })}
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};
