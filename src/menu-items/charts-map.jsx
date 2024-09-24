// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { PieChartOutlined, EnvironmentOutlined } from '@ant-design/icons';

// icons
const icons = {
  PieChartOutlined,
  EnvironmentOutlined
};

// ==============================|| MENU ITEMS - FORMS & TABLES ||============================== //

const chartsMap = {
  id: 'group-charts-map',
  title: <FormattedMessage id="charts-map" />,
  icon: icons.PieChartOutlined,
  type: 'group',
  children: [
    {
      id: 'react-chart',
      title: <FormattedMessage id="charts" />,
      type: 'collapse',
      icon: icons.PieChartOutlined,
      children: [
        {
          id: 'apexchart',
          title: <FormattedMessage id="apexchart" />,
          type: 'item',
          url: '/charts/apexchart'
        },
        {
          id: 'org-chart',
          title: <FormattedMessage id="org-chart" />,
          type: 'item',
          url: '/charts/org-chart'
        }
      ]
    },
    {
      id: 'map',
      title: <FormattedMessage id="map" />,
      type: 'item',
      url: '/map',
      icon: icons.EnvironmentOutlined
    }
  ]
};

export default chartsMap;
