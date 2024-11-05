import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
  Tooltip,
  useTheme
} from '@mui/material';
import MainCard from 'components/MainCard';
import { CSVExport, CellEditable, SelectColumnSorting, TablePagination } from 'components/third-party/react-table';
// import ScrollX from 'components/ScrollX';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { db } from 'config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import usePagination from 'hooks/usePagination';
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PopupTransition } from 'components/@extended/Transitions';
import FilterModal from './components/FilterModal';
import Filter from './components/Filter';
import { useTranslation } from 'react-i18next';
import IconButton from 'components/@extended/IconButton';
import NewUserForm from './components/NewUserForm';
import AlertUserDelete from './components/AlertUserDelete';
// import UserView from './components/UserView';
import UserModal from './components/UserModal';
import RolesCSVExport from './components/userRoles-csv-export-component';
import useAuth from 'hooks/useAuth';
// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = ({ data }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // console.log({empList});

  const [selectedRole, setSelectedRole] = useState('');
  const [basicSurveyView, setBasicSurveyView] = useState(null);
  const [basicSurveyAdd, setBasicSurveyAdd] = useState(null);
  const [basicSurveyEdit, setBasicSurveyEdit] = useState(null);
  const [basicSurveyDelete, setBasicSurveyDelete] = useState(null);

  const [optionalSurveyView, setoptionalSurveyView] = useState(null);
  const [optionalSurveyAdd, setoptionalSurveyAdd] = useState(null);
  const [optionalSurveyEdit, setoptionalSurveyEdit] = useState(null);
  const [optionalSurveyDelete, setoptionalSurveyDelete] = useState(null);

  const [userView, setuserView] = useState(null);
  const [userAdd, setuserAdd] = useState(null);
  const [userEdit, setuserEdit] = useState(null);
  const [userDelete, setuserDelete] = useState(null);

  const [rolesView, setrolesView] = useState(null);
  const [rolesAdd, setrolesAdd] = useState(null);
  const [rolesEdit, setrolesEdit] = useState(null);
  const [rolesDelete, setrolesDelete] = useState(null);

  const [selectedAcc, setSelectedAcc] = useState('');

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openStoryDrawer, setOpenStoryDrawer] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [userToView, setUserToView] = useState(null);
  const [openView, setOpenView] = useState(false);

  const handleStoryDrawerOpen = () => {
    setOpenStoryDrawer((prevState) => !prevState);
  };

  const handleClickOpen = () => {
    setOpenFormDialog(true);
  };

  const handleClickClose = () => {
    setOpenFormDialog(false);
    setSelectedUser(null);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleUserView = () => {
    setOpenView(!openView);
  };

  const [sorting, setSorting] = useState([
    {
      id: 'date',
      desc: true
    }
  ]);

  const [sortValue, setSortValue] = useState('');

  const empCollectionRef = collection(db, 'roles');

  useEffect(() => {
    const getEmpList = async () => {
      try {
        const data = await getDocs(empCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));

        let searchedData = filteredData;

        if (selectedRole) {
          // Filter out items with no accommodation value
          const filteredDataWithAccommodation = searchedData.filter((item) => item.roleStatus);
          searchedData = filteredDataWithAccommodation.filter((item) => item.roleStatus === selectedRole);
        }

        if (basicSurveyView !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.['Basic Survey'].view === basicSurveyView);
        }

        if (basicSurveyAdd !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.['Basic Survey'].add === basicSurveyAdd);
        }

        if (basicSurveyEdit !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.['Basic Survey'].edit === basicSurveyEdit);
        }

        if (basicSurveyDelete !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.['Basic Survey'].delete === basicSurveyDelete);
        }

        if (optionalSurveyView !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.['Optional Survey'].view === optionalSurveyView);
        }

        if (optionalSurveyAdd !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.['Optional Survey'].add === optionalSurveyAdd);
        }

        if (optionalSurveyEdit !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.['Optional Survey'].edit === optionalSurveyEdit);
        }

        if (optionalSurveyDelete !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.['Optional Survey'].delete === optionalSurveyDelete);
        }

        if (userView !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.Users?.view === userView);
        }

        if (userAdd !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.Users?.add === userAdd);
        }

        if (userEdit !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.Users?.edit === userEdit);
        }

        if (userDelete !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.Users?.delete === userDelete);
        }

        if (rolesView !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.Roles?.view === rolesView);
        }

        if (rolesAdd !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.Roles?.add === rolesAdd);
        }

        if (rolesEdit !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.Roles?.edit === rolesEdit);
        }

        if (rolesDelete !== null) {
          searchedData = searchedData.filter((item) => item.permissions?.Roles?.delete === rolesDelete);
        }

        setEmpList(searchedData);
      } catch (err) {
        console.log(err);
      }
    };

    getEmpList();
  }, [
    selectedRole,
    basicSurveyView,
    basicSurveyAdd,
    basicSurveyEdit,
    basicSurveyDelete,
    optionalSurveyView,
    optionalSurveyAdd,
    optionalSurveyEdit,
    optionalSurveyDelete,
    userView,
    userAdd,
    userEdit,
    userDelete,
    rolesView,
    rolesAdd,
    rolesEdit,
    rolesDelete
  ]); // Add both searchValue and selectedGender as dependencies

  const PER_PAGE = 10;
  // console.log('empList.length', empList.length);
  const count = Math.ceil(empList.length / PER_PAGE);
  let _DATA = usePagination(empList, PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSortingChange = (columnId) => {
    if (!columnId) return;

    setSorting((oldSorting) => {
      // If the column was already being sorted by, toggle the direction
      if (oldSorting.length > 0 && oldSorting[0].id === columnId) {
        return [{ id: columnId, desc: !oldSorting[0].desc }];
      }
      // Otherwise, sort by the new column in ascending order
      return [{ id: columnId, desc: false }];
    });

    // Sort the empList data based on the columnId and sort direction
    setEmpList((prevEmpList) =>
      prevEmpList.slice().sort((a, b) => {
        // Handle nested permissions objects
        if (columnId.includes('permissions.')) {
          const [section, subsection] = columnId.split('.');
          const valueA = a[section]?.[subsection];
          const valueB = b[section]?.[subsection];
          
          // Compare the nested objects based on their properties
          const compareValue = (objA, objB) => {
            if (!objA || !objB) return 0;
            // Compare based on number of true values in permissions
            const trueCountA = Object.values(objA).filter(Boolean).length;
            const trueCountB = Object.values(objB).filter(Boolean).length;
            return trueCountA - trueCountB;
          };
  
          const result = compareValue(valueA, valueB);
          return sorting[0]?.desc ? -result : result;
        }
  
        // Handle regular fields
        const sortValueA = a[columnId];
        const sortValueB = b[columnId];
  
        if (sortValueA < sortValueB) {
          return sorting[0]?.desc ? 1 : -1;
        }
        if (sortValueA > sortValueB) {
          return sorting[0]?.desc ? -1 : 1;
        }
        return 0;
      })
    );
  };

  useEffect(() => {
    console.log('sorting id', sortValue);

    handleSortingChange(sortValue);
  }, [sortValue]);

  const table = useReactTable({
    // data: _DATA.currentData(),
    // data: empList,
    data: useMemo(() => {
      const begin = (page - 1) * rowsPerPage;
      const end = begin + rowsPerPage;
      return empList.slice(begin, end);
    }, [empList, page, rowsPerPage]),
    columns: useMemo(
      () => [
        {
          header: t('Role'),
          accessorKey: 'roleName',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const roleName = row.original.roleName;
            return t(roleName);
          }
        },
        {
          header: t('Status'),
          accessorKey: 'roleStatus',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const roleStatus = row.original.roleStatus;
            return t(roleStatus);
          }
        },
        {
          header: t('Permissions - Basic Survey'),
          accessorKey: 'permissions.Basic Survey',
          // dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const permissions = row.original.permissions?.['Basic Survey'] || {};
            return (
              <>
                <Grid container md={12} spacing={1}>
                  <Grid md={6} item>
                    <Chip color={permissions.add ? 'success' : 'error'} label={t('Add')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.edit ? 'success' : 'error'} label={t('Edit')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.view ? 'success' : 'error'} label={t('View')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.delete ? 'success' : 'error'} label={t('Delete')} size="small" variant="light" />
                  </Grid>
                </Grid>
              </>
            );
          }
        },
        {
          header: t('Permissions - Optional Survey'),
          accessorKey: 'permissions.Optional Survey',
          // dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const permissions = row.original.permissions?.['Optional Survey'] || {};
            return (
              <>
                <Grid container md={12} spacing={1}>
                  <Grid md={6} item>
                    <Chip color={permissions.add ? 'success' : 'error'} label={t('Add')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.edit ? 'success' : 'error'} label={t('Edit')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.view ? 'success' : 'error'} label={t('View')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.delete ? 'success' : 'error'} label={t('Delete')} size="small" variant="light" />
                  </Grid>
                </Grid>
              </>
            );
          }
        },
        // {
        //   header: t('Permissions - Cabanas'),
        //   accessorKey: 'permissions.Cabanas',
        //   // dataType: 'text',
        //   meta: {
        //     className: 'cell-center'
        //   },
        //   cell: ({ row }) => {
        //     const permissions = row.original.permissions?.['Cabanas'] || {};
        //     return (
        //       <>
        //         <Grid container md={12} spacing={1}>
        //           <Grid md={6} item>
        //             <Chip color={permissions.add ? 'success' : 'error'} label={t("Add")} size="small" variant="light" />
        //           </Grid>
        //           <Grid md={6} item>
        //             <Chip color={permissions.edit ? 'success' : 'error'} label={t("Edit")} size="small" variant="light" />
        //           </Grid>
        //           <Grid md={6} item>
        //             <Chip color={permissions.view ? 'success' : 'error'} label={t("View")} size="small" variant="light" />
        //           </Grid>
        //           <Grid md={6} item>
        //             <Chip color={permissions.delete ? 'success' : 'error'} label={t("Delete")} size="small" variant="light" />
        //           </Grid>
        //         </Grid>
        //       </>
        //     );
        //   }
        // },
        {
          header: t('Permissions - Users'),
          accessorKey: 'permissions.Users',
          // dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const permissions = row.original.permissions?.['Users'] || {};
            return (
              <>
                <Grid container md={12} spacing={1}>
                  <Grid md={6} item>
                    <Chip color={permissions.add ? 'success' : 'error'} label={t('Add')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.edit ? 'success' : 'error'} label={t('Edit')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.view ? 'success' : 'error'} label={t('View')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.delete ? 'success' : 'error'} label={t('Delete')} size="small" variant="light" />
                  </Grid>
                </Grid>
              </>
            );
          }
        },
        {
          header: t('Permissions - Roles'),
          accessorKey: 'permissions.Roles',
          // dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const permissions = row.original.permissions?.['Roles'] || {};
            return (
              <>
                <Grid container md={12} spacing={1}>
                  <Grid md={6} item>
                    <Chip color={permissions.add ? 'success' : 'error'} label={t('Add')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.edit ? 'success' : 'error'} label={t('Edit')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.view ? 'success' : 'error'} label={t('View')} size="small" variant="light" />
                  </Grid>
                  <Grid md={6} item>
                    <Chip color={permissions.delete ? 'success' : 'error'} label={t('Delete')} size="small" variant="light" />
                  </Grid>
                </Grid>
              </>
            );
          }
        },
        {
          header: t('Export data'),
          accessorKey: 'exportData',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const basicSurvey = row.original.permissions['Basic Survey'];
            const optionalSurvey = row.original.permissions['Optional Survey'];
            return (
              <Grid container md={12} spacing={1}>
                <Grid md={12} item>
                  B/S: {t(basicSurvey.exportData ? 'Enabled' : 'Disabled')}
                </Grid>
                <Grid md={12} item>
                  O/S: {t(optionalSurvey.exportData ? 'Enabled' : 'Disabled')}
                </Grid>
              </Grid>
            );
          }
        },
        {
          header: t('Import data'),
          accessorKey: 'importData',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const basicSurvey = row.original.permissions['Basic Survey'];
            const optionalSurvey = row.original.permissions['Optional Survey'];
            return (
              <Grid container md={12} spacing={1}>
                <Grid md={12} item>
                  B/S: {t(basicSurvey.importData ? 'Enabled' : 'Disabled')}
                </Grid>
                <Grid md={12} item>
                  O/S: {t(optionalSurvey.importData ? 'Enabled' : 'Disabled')}
                </Grid>
              </Grid>
            )
          }
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
                      handleUserView();
                      setUserToView(row.original);
                    }}
                  >
                    {collapseIcon}
                  </IconButton>
                </Tooltip>

                {user?.rolePermissions.Roles.edit && (
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(row.original);
                        setOpenFormDialog(true);
                      }}
                    >
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>
                )}

                {user?.rolePermissions.Roles.delete && (
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                        setUserToDelete(row.original);
                        console.log('original', row.original);
                      }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            );
          }
        }
      ],
      [t, theme]
    ),
    state: {
      sorting
    },
    defaultColumn: {
      // cell: CellEditable
    },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setEmpList((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value
              };
            }
            return row;
          })
        );
      }
    },
    onSortingChange: setSorting,
    debugTable: true
  });

  let headers = [];
  table.getAllColumns().forEach((columns) => {
    if (columns.columnDef.accessorKey) {
      headers.push({
        label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
        key: columns.columnDef.accessorKey
      });
    }
  });

  const handleModalClose = () => {
    setOpenFilterModal(false);
  };

  const ResetTable = () => {
    setSelectedRole('');
    setBasicSurveyView(null);
    setBasicSurveyAdd(null);
    setBasicSurveyEdit(null);
    setBasicSurveyDelete(null);
    setoptionalSurveyView(null);
    setoptionalSurveyAdd(null);
    setoptionalSurveyEdit(null);
    setoptionalSurveyDelete(null);
    setuserView(null);
    setuserAdd(null);
    setuserEdit(null);
    setuserDelete(null);
    setrolesView(null);
    setrolesAdd(null);
    setrolesEdit(null);
    setrolesDelete(null);
  };

  return (
    <MainCard
      content={false}
      title={t('User Roles Table')}
      secondary={
        <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
          <SelectColumnSorting {...{ setSortValue, getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />

          {user?.rolePermissions.Roles.add && (
            <Button
              size="small"
              sx={{ minWidth: '130px', minHeight: '41.13px' }}
              startIcon={<PlusOutlined />}
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
            >
              {t('Add Role')}
            </Button>
          )}

          <Button
            size="small"
            sx={{ minWidth: '130px', minHeight: '41.13px' }}
            startIcon={<SearchOutlined />}
            color="primary"
            variant="contained"
            onClick={() => setOpenStoryDrawer((prevState) => !prevState)}
          >
            {t('Filter Roles')}
          </Button>

          <Button
            size="small"
            sx={{ minWidth: '130px', minHeight: '41.13px' }}
            color="error"
            variant="contained"
            onClick={() => ResetTable()}
          >
            {t('Reset Filter')}
          </Button>

          {/* <CSVExport
            // data={table.getRowModel().flatRows.map((row) => row.original)}
            data={empList}
            headers={headers}
            filename="user-roles.csv"
          /> */}
          <RolesCSVExport
            data={empList}
            filename="user-roles.csv"
          />
        </Stack>
      }
    >
      <Box sx={{ overflowX: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        <Table>
          <TableHead
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: '100',
              // backgroundColor: theme.palette.background.default
              backgroundColor: '#eeedfc'
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} {...header.column.columnDef.meta} width={5}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody sx={{ overflowY: 'auto', zIndex: '-100' }}>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            <TableRow sx={{ position: 'sticky', bottom: 0, zIndex: '100', backgroundColor: 'white' }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={11}>
                <Pagination count={count} variant="outlined" color="primary" size="medium" page={page} onChange={handleChange} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Dialog TransitionComponent={PopupTransition} onClose={handleModalClose} open={openFilterModal} scroll="body">
        <FilterModal onClose={handleModalClose} selectedAcc={selectedAcc} setSelectedAcc={setSelectedAcc} />
      </Dialog>
      <Filter
        empList={empList}
        open={openStoryDrawer}
        ResetTable={ResetTable}
        handleDrawerOpen={handleStoryDrawerOpen}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        basicSurveyView={basicSurveyView}
        setBasicSurveyView={setBasicSurveyView}
        basicSurveyAdd={basicSurveyAdd}
        setBasicSurveyAdd={setBasicSurveyAdd}
        basicSurveyEdit={basicSurveyEdit}
        setBasicSurveyEdit={setBasicSurveyEdit}
        basicSurveyDelete={basicSurveyDelete}
        setBasicSurveyDelete={setBasicSurveyDelete}
        optionalSurveyView={optionalSurveyView}
        setoptionalSurveyView={setoptionalSurveyView}
        optionalSurveyAdd={optionalSurveyAdd}
        setoptionalSurveyAdd={setoptionalSurveyAdd}
        optionalSurveyEdit={optionalSurveyEdit}
        setoptionalSurveyEdit={setoptionalSurveyEdit}
        optionalSurveyDelete={optionalSurveyDelete}
        setoptionalSurveyDelete={setoptionalSurveyDelete}
        userView={userView}
        setuserView={setuserView}
        userAdd={userAdd}
        setuserAdd={setuserAdd}
        userEdit={userEdit}
        setuserEdit={setuserEdit}
        userDelete={userDelete}
        setuserDelete={setuserDelete}
        rolesView={rolesView}
        setrolesView={setrolesView}
        rolesAdd={rolesAdd}
        setrolesAdd={setrolesAdd}
        rolesEdit={rolesEdit}
        setrolesEdit={setrolesEdit}
        rolesDelete={rolesDelete}
        setrolesDelete={setrolesDelete}
      />
      <Dialog open={openFormDialog} onClose={handleClickClose} TransitionComponent={PopupTransition} fullWidth maxWidth="md">
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle>{selectedUser ? t('Edit Role') : t('New Role')}</DialogTitle>
          <NewUserForm setEmpList={setEmpList} handleClickClose={handleClickClose} role={selectedUser} />
        </Box>
      </Dialog>

      {userToDelete && (
        <AlertUserDelete
          open={open}
          handleClose={handleClose}
          setEmpList={setEmpList}
          userId={userToDelete.id}
          userName={userToDelete.roleName}
        />
      )}

      <UserModal open={openView} modalToggler={setOpenView} user={userToView} />
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default EditableTable;
