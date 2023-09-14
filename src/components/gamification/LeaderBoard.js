
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
  Box
} from '@mui/material';

import Label from '../label/Label';
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
import LEADERBORDLIST from '../../_mock/leaderboard'
//
import LeaderBoardUserListHead from '../../sections/@dashboard/user/LeaderBoardUserList';
import { getConfig } from '@edx/frontend-platform';


// Table Head 
const TABLE_HEAD = [
  { id: 'name', label: 'Nom', alignRight: false },
  { id: 'rank', label: 'Classement', alignRight: false },
  { id: 'points', label: 'Points', alignRight: false },
  { id: 'badge', label: 'Badge', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function LeaderBoard({userLeaderBord}) {

  
const [open, setOpen] = useState(null);

const [page, setPage] = useState(0);

const [order, setOrder] = useState('asc');

const [selected, setSelected] = useState([]);

const [orderBy, setOrderBy] = useState('name');

const [filterName, setFilterName] = useState('');

const [rowsPerPage, setRowsPerPage] = useState(5);

const handleOpenMenu = (event) => {
  setOpen(event.currentTarget);
};

const handleCloseMenu = () => {
  setOpen(null);
};

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelecteds = LEADERBORDLIST.map((n) => n.name);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

const handleClick = (event, name) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [];
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  }
  setSelected(newSelected);
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setPage(0);
  setRowsPerPage(parseInt(event.target.value, 10));
};

const handleFilterByName = (event) => {
  setPage(0);
  setFilterName(event.target.value);
};

const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - LEADERBORDLIST.length) : 0;

const filteredUsers = applySortFilter(LEADERBORDLIST, getComparator(order, orderBy), filterName);

const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
        
        <Card>
            {userLeaderBord ? 
            <Scrollbar>
              <TableContainer sx={{minWidth: 1000 }}>
                <Table>
                  <LeaderBoardUserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={LEADERBORDLIST.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {userLeaderBord.map((row) => {
                      const {rank,username,score,badge} = row
                      return (
                        <TableRow  hover  tabIndex={-1} role="checkbox">
                                
                                <TableCell  align="left">
                                    <Typography variant="subtitle2" noWrap>
                                      {username}
                                    </Typography>
                                </TableCell>
        
                                <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {rank}
                                  </Typography>
                                </TableCell>
        
                                <TableCell align="left">
                                  <Typography variant="subtitle2" noWrap>
                                    {score}
                                  </Typography>
                                </TableCell>
                                {/* <TableCell align="left">{badge}</TableCell> */}
                                <TableCell component="th" scope="row" padding="none">
                                  <Stack direction="row" alignItems="center" spacing={2}>
                                    {badge && 
                                    <>
                                      <img width={40} src={getConfig().LMS_BASE_URL+""+badge.badge_image} />
                                      <Typography variant="subtitle2" noWrap>
                                        {badge.name}
                                      </Typography>
                                    </>
                                    }
                                  </Stack>
                                </TableCell>
        
                                
                        </TableRow>
                        )
                    })}
                  
                  
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            :
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            }
        </Card>

   
    </>
  );
} 