import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Table, TableBody, TableContainer, TableHead } from '@mui/material';
import MainCard from 'components/MainCard';
import { CSVExport, CellEditable } from 'components/third-party/react-table';
import ScrollX from 'components/ScrollX';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { db } from 'config/firebase';
import {getDocs, collection} from 'firebase/firestore'
// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = ({ data }) => {
  const [tableData, setTableData] = useState(data); 

  const [empList, setEmpList] = useState([])

  const empCollectionRef = collection(db, "survey_data");

  useEffect(() => {
    const getEmpList = async () => {

      try{
      const data = await getDocs(empCollectionRef);
      const filteredData = data.docs.map((doc)=>({
        ...doc.data(), 
        id: doc.id,
      }));
      console.log(filteredData);
      setEmpList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getEmpList();
  }, []);

  const table = useReactTable({
    data: empList,
    columns: useMemo(
      () => [
        {
          header: 'Date',
          accessorKey: 'date',
          dataType: 'text',
        },
        {
          header: 'Feedback',
          accessorKey: 'feedback',
          dataType: 'text',
        },
        {
          header: 'Gender',
          accessorKey: 'gender',
          dataType: 'text',
        },
        {
          header: 'Language',
          accessorKey: 'language',
          dataType: 'text',
        },
        {
          header: 'Motivation',
          accessorKey: 'motivation',
          dataType: 'text',
        },
        {
          header: 'Number of Days',
          accessorKey: 'numOfDays',
          dataType: 'text',
        },
        {
          header: 'Number of People',
          accessorKey: 'numOfPeople',
          dataType: 'text',
        },
        {
          header: 'Origin',
          accessorKey: 'placeOfOrigin',
          dataType: 'text',
        },
        {
          header: 'Rating',
          accessorKey: 'rating',
          dataType: 'text',
        },
        {
          header: 'Reason',
          accessorKey: 'reason',
          dataType: 'text',
        },
        {
          header: 'Stay',
          accessorKey: 'stayOvernight',
          dataType: 'text',
        },
        {
          header: 'Place',
          accessorKey: 'stayPlace',
          dataType: 'text',
        },
        {
          header: 'Pet',
          accessorKey: 'withPet',
          dataType: 'text',
        },
        // {
        //   header: 'Age',
        //   accessorKey: 'age',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-right',
        //   },
        // },
        // {
        //   header: 'Visits',
        //   accessorKey: 'visits',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-right',
        //   },
        // },
        // {
        //   header: 'Profile Progress',
        //   accessorKey: 'progress',
        //   dataType: 'progress',
        // },
      ],
      []
    ),
    defaultColumn: {
      cell: CellEditable,
    },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setEmpList((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  let headers = [];
  table.getAllColumns().forEach((columns) => {
    if (columns.columnDef.accessorKey) {
      headers.push({
        label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
        key: columns.columnDef.accessorKey,
      });
    }
  });

  return (
    <MainCard
      content={false}
      title="EUME Table"
      secondary={<CSVExport data={table.getRowModel().flatRows.map((row) => row.original)} headers={headers} filename="editable-cell.csv" />}
    >
      <ScrollX>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default EditableTable;
