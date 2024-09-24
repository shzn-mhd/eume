// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { LineChartOutlined, IdcardOutlined, DatabaseOutlined } from '@ant-design/icons';

// icons
const icons = {
  LineChartOutlined,
  IdcardOutlined,
  DatabaseOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const widget = {
  id: 'group-widget',
  title: <FormattedMessage id="widgets" />,
  icon: icons.IdcardOutlined,
  type: 'group',
  children: [
    {
      id: 'statistics',
      title: <FormattedMessage id="statistics" />,
      type: 'item',
      url: '/widget/statistics',
      icon: icons.IdcardOutlined
    },
    {
      id: 'data',
      title: <FormattedMessage id="data" />,
      type: 'item',
      url: '/widget/data',
      icon: icons.DatabaseOutlined
    },
    {
      id: 'chart',
      title: <FormattedMessage id="chart" />,
      type: 'item',
      url: '/widget/chart',
      icon: icons.LineChartOutlined
    }
  ]
};

export default widget;
