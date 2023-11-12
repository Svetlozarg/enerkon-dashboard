import { useState, MouseEvent, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  Switch,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  Stack
} from '@mui/material';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { format } from 'date-fns';
// import { format, subHours, subWeeks, subDays } from 'date-fns';

function SecurityTab() {
  const theme = useTheme();

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const logs = [
    // {
    //   id: 1,
    //   browser: ' Safari/537.36',
    //   ipaddress: '3.70.73.142',
    //   location: 'United States',
    //   date: subDays(new Date(), 2).getTime()
    // },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Защита</Typography>
          <Typography variant="subtitle2">
            Променете предпочитанията си за сигурност по-долу
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Промяна на паролата"
                secondary="Можете да промените паролата си тук"
              />
              <Button
                size="large"
                sx={{ color: '#8C7CF0', border: '1px solid #8C7CF0' }}
                disabled
              >
                Промяна на паролата
              </Button>
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Двуфакторно удостоверяване на автентичността"
                secondary="Активиране на проверката на ПИН за всички опити за влизане"
              />
              <Switch color="primary" checked disabled />
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="Активна История"
            subheader="История на влизания в профила"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Browser</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Date/Time</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.length > 0 ? (
                  <>
                    {logs.map((log) => (
                      <TableRow key={log.id} hover>
                        <TableCell>{log.browser}</TableCell>
                        <TableCell>{log.ipaddress}</TableCell>
                        <TableCell>{log.location}</TableCell>
                        <TableCell>
                          {format(log.date, 'dd MMMM, yyyy - h:mm:ss a')}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip placement="top" title="Delete" arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.colors.error.lighter
                                },
                                color: theme.palette.error.main
                              }}
                              color="inherit"
                              size="small"
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <>
                    <TableRow hover>
                      <TableCell colSpan={5}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                          <Typography
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              p: '2rem 0'
                            }}
                          >
                            Няма данни
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SecurityTab;
