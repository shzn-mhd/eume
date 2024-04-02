import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

// project-import

import IconButton from 'components/@extended/IconButton';
import EmptyReactTable from 'pages/tables/react-table/empty';

import {IndeterminateCheckbox} from 'components/third-party/react-table';

import { useGetCustomer } from 'api/customer';  

// assets
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
// import UniversityModal from './components/AdminModal';
import RoomModal from './components/RoomModal';
// import AlertUniversityDelete from './components/AlertAdminDelete';
// import AlertAdminDelete from './components/AlertAdminDelete';
import AlertRoomDelete from './components/AlertRoomDelete';
import ReactTable from './components/RoomTable';
// import { getUniversities } from 'store/reducers/university';
//import { getSystemAdmins } from 'store/reducers/admin';
//import { dispatch } from 'store';
// import { getUniversities } from 'store/reducers/university';
import { getRooms } from 'store/reducers/room';
import { dispatch } from 'store';


// ==============================|| CUSTOMER LIST ||============================== //


const RoomListPage = () => {
    const theme = useTheme();
  
    // const {universities: {universities, total}} = useSelector((state)=> state.university);
    const { customersLoading, customers: lists } = useGetCustomer();
  
    const [open, setOpen] = useState(false);
  
    const [customerModal, setCustomerModal] = useState(false);
    console.log("cus mod", customerModal);
    const [selectedRoom, setSelectedRoom] = useState(null);
  
    console.log("uni", selectedRoom);
    const [customerDeleteId, setCustomerDeleteId] = useState(null);

    const [viewType, setViewType] = useState('')

    /*useEffect(() => {
      dispatch(getSystemAdmins());
    }, []);*/
  
    useEffect(() => {
      dispatch(getRooms());
    }, []);
  
    const handleClose = () => {
      setOpen(!open);
    };
  //start
  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      {
        header: 'Room ID',
        accessorKey: 'roomId',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Hotel ID',
        accessorKey: 'hotelId',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Type',
        accessorKey: 'type',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Capacity',
        accessorKey: 'capacity',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Price',
        accessorKey: 'price',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Commission Rate',
        accessorKey: 'commissionRate',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Admin Approval',
        accessorKey: 'adminApproval',
        meta: {
          className: 'cell-center'
        },
        // cell: ({ row }) => (
        //   <Typography variant="subtitle1">
        //     {row.values.adminApproval ? 'Yes' : 'No'}
        //   </Typography>
        // )
      },
      {
        header: 'Room Type',
        accessorKey: 'roomType',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Bedding Options',
        accessorKey: 'beddingOptions',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Room Size',
        accessorKey: 'roomSize',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Room View',
        accessorKey: 'roomView',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Room Occupancy',
        accessorKey: 'roomOccupancy',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Bathroom',
        accessorKey: 'bathroom',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Room Accessibility',
        accessorKey: 'roomAccessibility',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Room Features',
        accessorKey: 'roomFeatures',
        meta: {
          className: 'cell-center'
        },
      },
      {
        header: 'Actions',
        meta: {
          className: 'cell-center'
        },
        disableSortBy: true,
        cell: ({ row }) => {
          const collapseIcon =
            row.getCanExpand() && row.getIsExpanded() ? (
              <PlusOutlined style={{ color: theme.palette.error.main, transform: 'rotate(45deg)' }} />
            ) : (
              <EyeOutlined />
            );
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>

            <Tooltip title="View">
              <IconButton 
                color="secondary" 
                // onClick={row.getToggleExpandedHandler()}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRoom(row.original);
                  setCustomerModal(true);
                  setViewType('view');
                }}
                >
                {collapseIcon}
              </IconButton>
            </Tooltip>

              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRoom(row.original);
                    setCustomerModal(true);
                    setViewType('edit');
                  }}
                >
                  <EditOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                    setCustomerDeleteId(row.original);
                    console.log("original", row.original);
                  }}
                >
                  <DeleteOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line
    [theme]
  );
  
  
    if (customersLoading) return <EmptyReactTable />;
  
    
    return (
      <>
        <ReactTable
          {...{
            // data: universities,
            columns,
            modalToggler: () => {
              setCustomerModal(true);
              setSelectedRoom(null);
              // setAdminType('create');
            }
            // bulkModalToggler: () => {
            //   setCustomerModal(true);
            //   setSelectedUniversity(null);
            //   setUniversityType('file');
              
            // }
          }}
        />
        <AlertRoomDelete id={customerDeleteId?._id} title={customerDeleteId?.firstName} open={open} handleClose={handleClose} />
        <RoomModal open={customerModal} modalToggler={setCustomerModal} room={selectedRoom} viewType={viewType}/>
      </>
    );
  };
  
  export default RoomListPage;


