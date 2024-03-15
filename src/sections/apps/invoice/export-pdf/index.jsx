import PropTypes from 'prop-types';

// third-party
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';

// project import
import Header from './Header';
import Content from './Content';

const styles = StyleSheet.create({
  page: {
    padding: 30
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column'
    }
  }
});

// ==============================|| INVOICE EXPORT ||============================== //

const ExportPDFView = ({ list }) => {
  let title = list?.invoiceId || list?.invoice_id;
  let customer_name = list?.customer_name || list?.from?.name || list?.customerInfo?.name;

  return (
    <Document title={`${title} ${customer_name}`}>
      <Page size="A4" style={styles.page}>
        <Header list={list} />
        <View style={styles.container}>
          <Content list={list} />
        </View>
      </Page>
    </Document>
  );
};

ExportPDFView.propTypes = {
  list: PropTypes.object
};

export default ExportPDFView;
