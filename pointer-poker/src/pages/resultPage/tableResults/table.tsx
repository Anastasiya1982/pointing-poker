import React from 'react';
import { ExportCSV } from './ExportCSV';
import { useAppSelector } from '../../../redux/hooks';
import { countResults } from '../../../utils/utils';
import Plate from '../../../components/plate/Plate';
import Cup from '../../../assets/littleCup.png';
import './table.scss';
import { CSVLink } from 'react-csv';

export const TableResults = () => {
  const issues = useAppSelector((state) => state.issie.issues);
  const users = useAppSelector((state) => state.game.users);
  console.log(users);


  const filterColumns=(issues:any)=>{
    let headers = issues.map((issue: any) => issue.title);
    console.log(headers);
    return headers;

  }



// const getTableData=()=>{
//     let results=[];
//     // @ts-ignore
//   for(let i=0;i<issues[0].results.length;i++){
//     let res=countResults(issues[0].results)
//       results.push({voite:``})
//   }
//
//     // let columns=data.map((issue: { results: any; })=>issue.results);
//     // let columnsData=countResults(columns);
//     // return columnsData;
// }

  return (
    <>
      {/*<CSVLink data={getTableData(issues)} headers={filterColumns(issues)} filename={"results.csv"}>*/}
      {/*  Download as CSV*/}
      {/*</CSVLink>*/}
      <ExportCSV csvData={issues} filename="results" headers={filterColumns(issues)} />
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

      {/*<table>*/}
      {/*  <thead>*/}
      {/*    <tr>*/}
      {/*      <th style={{ textAlign: 'center' }}>Issue</th>*/}
      {/*      <th style={{ textAlign: 'center' }}>Priority</th>*/}
      {/*      <th style={{ textAlign: 'center' }}>Results</th>*/}
      {/*    </tr>*/}
      {/*  </thead>*/}
      {/*  <tbody>*/}
      {/*    {issues.map((issue, i) => (*/}
      {/*      <tr key={i}>*/}
      {/*        <React.Fragment>*/}
      {/*          <td>{issue.title}</td>*/}
      {/*          <td>{issue.priority}</td>*/}
      {/*          <table>*/}
      {/*            {issue.results?.map((res) => (*/}
      {/*              <tr>*/}
      {/*                <td>{res}</td>*/}
      {/*              </tr>*/}
      {/*            ))}*/}
      {/*          </table>*/}
      {/*        </React.Fragment>*/}
      {/*      </tr>*/}
      {/*    ))}*/}
      {/*  </tbody>*/}
      {/*</table>*/}
    </>
  );
};
