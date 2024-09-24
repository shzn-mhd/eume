import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  IconButton,
  Chip,
  FormControl,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
  Skeleton
} from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';

// project import
import MainCard from 'components/MainCard';
import LogoSection from 'components/logo';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import LoadingButton from 'components/@extended/LoadingButton';

import { APP_DEFAULT_PATH } from 'config';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';
import { useGetInvoice, useGetInvoiceMaster } from 'api/invoice';
import ExportPDFView from 'sections/apps/invoice/export-pdf';

// assets
import { DownloadOutlined, EditOutlined, PrinterFilled, ShareAltOutlined } from '@ant-design/icons';

const PDFIconButton = ({ list }) => {
  const theme = useTheme();
  return (
    <PDFDownloadLink document={<ExportPDFView list={list} />} fileName={`${list.invoice_id}-${list.customer_name}.pdf`}>
      <IconButton>
        <DownloadOutlined style={{ color: theme.palette.grey[900] }} />
      </IconButton>
    </PDFDownloadLink>
  );
};

PDFIconButton.propTypes = {
  list: PropTypes.object
};

// ==============================|| INVOICE - DETAILS ||============================== //

const Details = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigation = useNavigate();

  const { menuMaster } = useGetMenuMaster();
  const { invoiceLoading, invoice } = useGetInvoice();
  const { invoiceMaster, invoiceMasterLoading } = useGetInvoiceMaster();
  const [list, seList] = useState(null);

  useEffect(() => {
    if (menuMaster.openedItem !== 'invoice-details') handlerActiveItem('invoice-details');
    if (id && !invoiceLoading) {
      seList(invoice.filter((item) => item.id.toString() === id)[0] || invoice[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, invoiceLoading]);

  const today = new Date(`${list?.date}`).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  const due_dates = new Date(`${list?.due_date}`).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  const subtotal = list?.invoice_detail?.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  const taxRate = (Number(list?.tax) * subtotal) / 100;
  const discountRate = (Number(list?.discount) * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;
  const componentRef = useRef(null);

  const isLoader = invoiceLoading || invoiceMasterLoading || invoiceMaster === undefined || list === null;

  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Invoice', to: '/apps/invoice/dashboard' },
    { title: 'Details' }
  ];

  return (
    <>
      <Breadcrumbs custom heading="Invoice Summary" links={breadcrumbLinks} />
      <MainCard content={false}>
        <Stack spacing={2.5}>
          <Box sx={{ p: 2.5, pb: 0 }}>
            <MainCard content={false} sx={{ p: 1.25, bgcolor: 'primary.lighter', borderColor: theme.palette.primary[100] }}>
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <IconButton onClick={() => navigation(`/apps/invoice/edit/${id}`)}>
                  <EditOutlined style={{ color: theme.palette.grey[900] }} />
                </IconButton>
                {isLoader ? <LoadingButton loading>X</LoadingButton> : <PDFIconButton {...{ list }} />}
                <ReactToPrint
                  trigger={() => (
                    <IconButton>
                      <PrinterFilled style={{ color: theme.palette.grey[900] }} />
                    </IconButton>
                  )}
                  content={() => componentRef.current}
                />
                <IconButton>
                  <ShareAltOutlined style={{ color: theme.palette.grey[900] }} />
                </IconButton>
              </Stack>
            </MainCard>
          </Box>
          <Box sx={{ p: 2.5 }} id="print" ref={componentRef}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                  <Box>
                    <Stack direction="row" spacing={2}>
                      <LogoSection />
                      <Chip label="Paid" color="success" size="small" variant="outlined" />
                    </Stack>
                    <Typography color="secondary">{isLoader ? <Skeleton /> : list.invoice_id}</Typography>
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Typography variant="subtitle1">Date</Typography>
                      <Typography color="secondary">{today}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Typography sx={{ overflow: 'hidden' }} variant="subtitle1">
                        Due Date
                      </Typography>
                      <Typography color="secondary">{due_dates}</Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Stack spacing={1}>
                    <Typography variant="h5">From:</Typography>
                    {isLoader ? (
                      <Stack spacing={0.5}>
                        <Skeleton />
                        <Skeleton width={60} />
                        <Skeleton />
                      </Stack>
                    ) : (
                      <FormControl sx={{ width: '100%' }}>
                        <Typography color="secondary">{list.cashierInfo.name}</Typography>
                        <Typography color="secondary">{list.cashierInfo.address}</Typography>
                        <Typography color="secondary">{list.cashierInfo.phone}</Typography>
                        <Typography color="secondary">{list.cashierInfo.email}</Typography>
                      </FormControl>
                    )}
                  </Stack>
                </MainCard>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MainCard>
                  <Stack spacing={1}>
                    <Typography variant="h5">To:</Typography>
                    {isLoader ? (
                      <Stack spacing={0.5}>
                        <Skeleton />
                        <Skeleton width={60} />
                        <Skeleton />
                      </Stack>
                    ) : (
                      <FormControl sx={{ width: '100%' }}>
                        <Typography color="secondary">{list.customerInfo.name}</Typography>
                        <Typography color="secondary">{list.customerInfo.address}</Typography>
                        <Typography color="secondary">{list.customerInfo.phone}</Typography>
                        <Typography color="secondary">{list.customerInfo.email}</Typography>
                      </FormControl>
                    )}
                  </Stack>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoader &&
                        [1, 2, 3].map((row) => (
                          <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                            <TableCell>
                              <Skeleton />
                            </TableCell>
                          </TableRow>
                        ))}
                      {!isLoader &&
                        list.invoice_detail?.map((row, index) => (
                          <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{invoiceMaster.country?.prefix + '' + Number(row.price).toFixed(2)}</TableCell>
                            <TableCell align="right">
                              {invoiceMaster.country?.prefix + '' + Number(row.price * row.qty).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ borderWidth: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6} md={8}></Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color={theme.palette.grey[500]}>Sub Total:</Typography>
                    <Typography>
                      {isLoader ? <Skeleton width={80} /> : invoiceMaster.country?.prefix + '' + subtotal?.toFixed(2)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color={theme.palette.grey[500]}>Discount:</Typography>
                    <Typography variant="h6" color={theme.palette.success.main}>
                      {isLoader ? <Skeleton width={50} /> : invoiceMaster.country?.prefix + '' + discountRate?.toFixed(2)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color={theme.palette.grey[500]}>Tax:</Typography>
                    <Typography>{isLoader ? <Skeleton width={60} /> : invoiceMaster.country?.prefix + '' + taxRate?.toFixed(2)}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">Grand Total:</Typography>
                    <Typography variant="subtitle1">
                      {isLoader ? (
                        <Skeleton width={100} />
                      ) : total % 1 === 0 ? (
                        invoiceMaster.country?.prefix + '' + total
                      ) : (
                        invoiceMaster.country?.prefix + '' + total?.toFixed(2)
                      )}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                  <Typography color="secondary">Notes: </Typography>
                  <Typography>
                    It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank
                    You!
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ p: 2.5, a: { textDecoration: 'none', color: 'inherit' } }}>
            <PDFDownloadLink document={<ExportPDFView list={list} />} fileName={`${list?.invoice_id}-${list?.customer_name}.pdf`}>
              <LoadingButton
                loading={isLoader}
                color="primary"
                variant="contained"
                loadingPosition="center"
                sx={{ color: 'secondary.lighter' }}
              >
                Download
              </LoadingButton>
            </PDFDownloadLink>
          </Stack>
        </Stack>
      </MainCard>
    </>
  );
};

export default Details;
