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
import OfferModal from './components/OfferModal';
// import AlertUniversityDelete from './components/AlertAdminDelete';
// import AlertAdminDelete from './components/AlertAdminDelete';
import AlertOfferDelete from './components/AlertOfferDelete';
import ReactTable from './components/OfferTable';
// import { getUniversities } from 'store/reducers/university';
import { getOffers } from 'store/reducers/offer';
import { dispatch } from 'store';

// ==============================|| CUSTOMER LIST ||============================== //


const OfferListPage = () => {
    const theme = useTheme();
  
    // const {universities: {universities, total}} = useSelector((state)=> state.university);
    const { customersLoading, customers: lists } = useGetCustomer();
  
    const [open, setOpen] = useState(false);
  
    const [customerModal, setCustomerModal] = useState(false);
    console.log("cus mod", customerModal);
    const [selectedOffer, setSelectedoOffer] = useState(null);
  
    console.log("uni", selectedOffer);
    const [customerDeleteId, setCustomerDeleteId] = useState(null);

    const [viewType, setViewType] = useState('')

    useEffect(() => {
      dispatch(getOffers());
    }, []);
  
  
    const handleClose = () => {
      setOpen(!open);
    };
  
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
          header: 'Sr.No',
          accessorKey: '_id',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            return (
              <Typography variant="subtitle1">{Number(row.id) + 1}</Typography>
            );
          }
        },

        {
          header: 'Name',
          accessorKey: 'name',
          meta: {
            className: 'cell-center'
          },
        },

        {
          header: 'Offer Code',
          accessorKey: 'offerCode',
          meta: {
            className: 'cell-center'
          },
        },

        {
          header: 'Discount',
          accessorKey: 'discount',
          meta: {
            className: 'cell-center'
          },
        },

        {
          header: 'Start Date',
          accessorKey: 'startDate',
          meta: {
            className: 'cell-center'
          },
        },

        {
          header: 'Exp Date',
          accessorKey: 'expDate',
          meta: {
            className: 'cell-center'
          },
        },

        {
          header: 'Time Period',
          accessorKey: 'timePeriod',
          meta: {
            className: 'cell-center'
          },
        },

        {
          header: 'Note',
          accessorKey: 'note',
          meta: {
            className: 'cell-center'
          },
        },

        {
          header: 'Promo Code',
          accessorKey: 'promoCode',
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
                    setSelectedOffer(row.original);
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
                      setSelectedOffer(row.original);
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
              setSelectedOffer(null);
              // setAdminType('create');
            }
            // bulkModalToggler: () => {
            //   setCustomerModal(true);
            //   setSelectedUniversity(null);
            //   setUniversityType('file');
              
            // }
          }}
        />
        <AlertOfferDelete id={customerDeleteId?._id} title={customerDeleteId?.firstName} open={open} handleClose={handleClose} />
        <OfferModal open={customerModal} modalToggler={setCustomerModal} offer={selectedOffer} viewType={viewType}/>
      </>
    );
  };
  
  export default OfferListPage;


