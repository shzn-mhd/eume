import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
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
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PopupTransition } from 'components/@extended/Transitions';
import FilterModal from './components/FilterModal';
import Filter from './components/Filter';
import { useTranslation } from 'react-i18next';
import IconButton from 'components/@extended/IconButton';
import NewUserForm from './components/NewUserForm';
import AlertUserDelete from './components/AlertUserDelete';
// import UserView from './components/UserView';
import UserModal from './components/UserModal';
import useAuth from 'hooks/useAuth';
// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = ({ data }) => {
  const theme = useTheme();
  const { user } = useAuth();
  // console.log("Auth User >>>>>>", user);
  const { t, i18n } = useTranslation();
  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedRole, setSelectedRole] = useState('');
  const [selectedAcc, setSelectedAcc] = useState('');

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openStoryDrawer, setOpenStoryDrawer] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [userToView, setUserToView] = useState(null);
  const [openView, setOpenView] = useState(false);

  console.log("User", user);

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

  const empCollectionRef = collection(db, 'users');

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
          const filteredDataWithAccommodation = searchedData.filter((item) => item.role);
          searchedData = filteredDataWithAccommodation.filter((item) => item.role === selectedRole);
        }
        setEmpList(searchedData);
      } catch (err) {
        console.log(err);
      }
    };

    getEmpList();
  }, [selectedRole]); // Add both searchValue and selectedGender as dependencies

  const [roles, setRoles] = useState([]);
  const [roleMapping, setRoleMapping] = useState({});

  useEffect(() => {
    const fetchRoles = async () => {
      const roleCollectionRef = collection(db, 'roles');
      const roleSnapshot = await getDocs(roleCollectionRef);
      const roleList = roleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setRoles(roleList);

      // Create a mapping of role IDs to role names
      const roleMap = roleList.reduce((map, role) => {
        map[role.id] = t(role.roleName);
        return map;
      }, {});
      console.log('roleMap', roleMap);
      setRoleMapping(roleMap);
    };

    fetchRoles();
  }, [t]);

  const PER_PAGE = 10;
  // console.log('empList.length', empList.length);
  const count = Math.ceil(empList.length / PER_PAGE);
  let _DATA = usePagination(empList, PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSortingChange = (columnId) => {
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
        const sortValueA = a[columnId];
        const sortValueB = b[columnId];

        if (sortValueA < sortValueB) {
          return sorting[0].desc ? 1 : -1;
        }
        if (sortValueA > sortValueB) {
          return sorting[0].desc ? -1 : 1;
        }
        return 0;
      })
    );
  };

  useEffect(() => {
    // console.log('sorting id', sortValue);

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
          header: t('First Name'),
          accessorKey: 'firstName',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: t('Last Name'),
          accessorKey: 'lastName',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: t('Email'),
          accessorKey: 'email',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: t('Role'),
          accessorKey: 'role',
          dataType: 'text',
          meta: {
            className: 'cell-center'
            // Render role name instead of role ID
          },
          cell: ({ row }) => {
            // roleMapping[row.original.role] || row.original.role
            const roleNames = row.original.role.map((id) => roleMapping[id] || id);
            return (
              <div>
                {roleNames.join(', ')} {/* Change ', ' to '\n' if you want new lines */}
              </div>
            );
          }
        },
        {
         header: t('Actions'),
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

                {user.rolePermissions.Users.edit && (
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

                {user.rolePermissions.Users.delete && (
                  <Tooltip title="Delete">
                    <IconButton
                      disabled={user.email===row.original.email}
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
      [t, theme, roleMapping]
    ),
    state: {
      sorting
    },
    defaultColumn: {
      cell: CellEditable
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
  };

  return (
    <MainCard
      content={false}
      title={t('User Table')}
      secondary={
        <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
          <SelectColumnSorting {...{ setSortValue, getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />

          {user.rolePermissions.Users.add && (
            <Button
              size="small"
              sx={{ minWidth: '130px', minHeight: '41.13px' }}
              startIcon={<PlusOutlined />}
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
            >
              {t('Add Users')}
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
            {t('Filter Users')}
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

          <CSVExport
            // data={table.getRowModel().flatRows.map((row) => row.original)}
            data={empList}
            headers={headers}
            filename="users.csv"
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
                  <TableCell key={header.id} {...header.column.columnDef.meta}>
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
      />
      <Dialog open={openFormDialog} onClose={handleClickClose} TransitionComponent={PopupTransition} fullWidth maxWidth="md">
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle>{selectedUser ? t('Edit User') : t('New User')}</DialogTitle>
          <NewUserForm setEmpList={setEmpList} handleClickClose={handleClickClose} user={selectedUser} />
        </Box>
      </Dialog>

      {userToDelete && (
        <AlertUserDelete
          open={open}
          handleClose={handleClose}
          setEmpList={setEmpList}
          userId={userToDelete.id}
          userName={userToDelete.firstName + ' ' + userToDelete.lastName}
        />
      )}

      {/* {userToView && (
        <UserView closeModal={handleUserView} user={userToView}/>
      )} */}

      <UserModal open={openView} modalToggler={setOpenView} user={userToView} />
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default EditableTable;
