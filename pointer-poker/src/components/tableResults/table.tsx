import React from 'react'
import Table from 'react-bootstrap/Table';
import { ExportCSV } from './ExportCSV';

export const TableResults = () => {
  let players=[
    {firstName:"Nan",
     lastName:"ddjsjdjs",
      voite:5,
      index:1
    },
    {firstName:"Bob",
      lastName:"ddjsjdjs",
      voite:7,
      index:5
    },
    {firstName:"HJ<Jhj,h",
      lastName:"ddjsjdjs",
      voite:3,
      index:10
    }
  ]

   const CustomerRow = (props:any) => {
    return(
      <tr key = {props.index} className='even'>
        <td> {props.ndex + 1} </td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.voite}</td>
      </tr>
    )
  };


  const CustomerTable = players.map((user,index) => CustomerRow(user))
  const tableHeader = <thead className='bgvi'>
  <tr>
    <th>#</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Voite</th>
  </tr>
  </thead>

  return (
    <>
      <ExportCSV csvData={players} filename="results" />
      <Table striped bordered hover>
        {tableHeader}
        <tbody>
        {CustomerTable}
        </tbody>
      </Table>
      </>
  )
}
