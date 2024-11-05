import { useLayoutEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, List, Typography, useMediaQuery } from '@mui/material';

// project import
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { MenuFromAPI } from 'menu-items/dashboard';

import useConfig from 'hooks/useConfig';
import { HORIZONTAL_MAX_ITEM } from 'config';
import { useGetMenu, useGetMenuMaster } from 'api/menu';
import { MenuOrientation } from 'config';
import { useMenuConfig } from 'menu-items/applications';
import { useFirebase } from 'contexts/FirebaseContextUpdated'; 
import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const PERMISSION_MAP = {
  '/users/UserListPage': { module: 'Users', action: 'view' },
  '/roles/RoleListPage': { module: 'Roles', action: 'view' },
  '/eume/EditableTablePage': { module: 'Basic Survey', action: 'view' },
  '/optional-survey/OptionalSurveyPage': { module: 'Optional Survey', action: 'view' },
  '/dashboard/cabanas': { module: 'Cabanas', action: 'view' },
  // Add more mappings as needed
};


const Navigation = () => {
  const theme = useTheme();
  const { menuOrientation } = useConfig();
  // const { menuLoading } = useGetMenu();
  // const { menuMaster } = useGetMenuMaster();
  // const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { applications } = useMenuConfig(); // Get the menu configuration from context
  const { user } = useFirebase()

  const drawerOpen = true;
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const [selectedItems, setSelectedItems] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);
  // const [menuItems, setMenuItems] = useState({ items: [] });

  // let dashboardMenu = MenuFromAPI();

  // useLayoutEffect(() => {
  //   const isFound = menuItem.items.some((element) => {
  //     if (element.id === 'group-dashboard') {
  //       return true;
  //     }
  //     return false;
  //   });

  //   if (menuLoading) {
  //     menuItem.items.splice(0, 0, dashboardMenu);
  //     setMenuItems({ items: [...menuItem.items] });
  //   } else if (!menuLoading && dashboardMenu?.id !== undefined && !isFound) {
  //     menuItem.items.splice(0, 1, dashboardMenu);
  //     setMenuItems({ items: [...menuItem.items] });
  //   } else {
  //     setMenuItems({ items: [...menuItem.items] });
  //   }
  //   // eslint-disable-next-line
  // }, [menuLoading]);
console.log(user)
  // Add permission check helper
  const hasPermission = (item) => {
    // Allow dashboard and other non-restricted pages
    if (!item.url || item.url === '/dashboard/default') return true;
    
    // Get required permissions from the mapping
    const requiredPermissions = PERMISSION_MAP[item.url];
    if (!requiredPermissions) return true; // If no mapping found, show by default
    
    if (!user?.rolePermissions) return false;
    
    const { module, action } = requiredPermissions;
    return user.rolePermissions[module]?.[action] === true;
  };

  const filteredChildren = applications.children.filter(hasPermission);

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  // let lastItemIndex = menuItems.items.length - 1;
  let lastItemIndex = filteredChildren.length - 1;

  let remItems = [];
  let lastItemId;

  //  first it checks menu item is more than giving HORIZONTAL_MAX_ITEM after that get lastItemid by giving horizontal max
  // item and it sets horizontal menu by giving horizontal max item lastly slice menuItem from array and set into remItems

  // if (lastItem && lastItem < menuItems.items.length) {
  //   lastItemId = menuItems.items[lastItem - 1].id;
  //   lastItemIndex = lastItem - 1;
  //   remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
  //     title: item.title,
  //     elements: item.children,
  //     icon: item.icon,
  //     ...(item.url && {
  //       url: item.url
  //     })
  //   }));
  // }
  // Update remItems calculation
  if (lastItem && lastItem < filteredChildren.length) {
    lastItemId = filteredChildren[lastItem - 1].id;
    lastItemIndex = lastItem - 1;
    remItems = filteredChildren.slice(lastItem - 1, filteredChildren.length).map((item) => ({
      title: item.title,
      elements: item.children?.filter(hasPermission), // Filter nested items too
      icon: item.icon,
      ...(item.url && { url: item.url })
    }));
  }

  // const navGroups = menuItems.items.slice(0, lastItemIndex + 1).map((item, index) => {
  //   switch (item.type) {
  //     case 'group':
  //       if (item.url && item.id !== lastItemId) {
  //         return (
  //           <List key={item.id} {...(isHorizontal && { sx: { mt: 0.5 } })}>
  //             {!isHorizontal && index !== 0 && <Divider sx={{ my: 0.5 }} />}
  //             <NavItem item={item} level={1} isParents />
  //           </List>
  //         );
  //       }

  //       return (
  //         <NavGroup
  //           key={item.id}
  //           setSelectedItems={setSelectedItems}
  //           setSelectedLevel={setSelectedLevel}
  //           selectedLevel={selectedLevel}
  //           selectedItems={selectedItems}
  //           lastItem={lastItem}
  //           remItems={remItems}
  //           lastItemId={lastItemId}
  //           item={item}
  //         />
  //       );
  //     default:
  //       return (
  //         <Typography key={item.id} variant="h6" color="error" align="center">
  //           Fix - Navigation Group 
  //         </Typography>
  //       );
  //   }
  // });
  const navGroups = filteredChildren.slice(0, lastItemIndex + 1).map((item, index) => {

    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          return (
            <List key={item.id} {...(isHorizontal && { sx: { mt: 0.5 } })}>
              {!isHorizontal && index !== 0 && <Divider sx={{ my: 0.5 }} />}
              <NavItem item={item} level={1} isParents />
            </List>
          );
        }

        return (
          <NavGroup
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      case 'item':
        return <NavItem key={item.id} item={item} level={1} />;  
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        ...(!isHorizontal && {
          '& > ul:first-of-type': { mt: 0 }
        }),
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block'
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
