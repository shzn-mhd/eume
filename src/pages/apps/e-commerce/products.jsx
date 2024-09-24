import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// project import
import ProductFilterDrawer from 'sections/apps/e-commerce/products/ProductFilterDrawer';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';
import ProductsHeader from 'sections/apps/e-commerce/products/ProductsHeader';
import ProductCard from 'components/cards/e-commerce/ProductCard';
import ProductEmpty from 'sections/apps/e-commerce/products/ProductEmpty';
import useConfig from 'hooks/useConfig';
import FloatingCart from 'components/cards/e-commerce/FloatingCart';
import { resetCart, useGetCart } from 'api/cart';
import { filterProducts } from 'api/products';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'container' })(({ theme, open, container }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  marginLeft: -320,
  ...(container && {
    [theme.breakpoints.only('lg')]: {
      marginLeft: !open ? -240 : 0
    }
  }),
  [theme.breakpoints.down('lg')]: {
    paddingLeft: 0,
    marginLeft: 0
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: 0
  })
}));

const ProductsPage = () => {
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  // product data
  const initialProducts = useLoaderData();
  const [products, setProducts] = useState(initialProducts);

  const { cart } = useGetCart();
  const { container } = useConfig();

  useEffect(() => {
    // clear cart if complete order
    if (cart && cart.step > 2) {
      resetCart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  // filter
  const initialState = {
    search: '',
    sort: 'low',
    gender: [],
    categories: ['all'],
    colors: [],
    price: '',
    rating: 0
  };
  const [filter, setFilter] = useState(initialState);

  const filterData = async () => {
    await filterProducts(filter).then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  let productResult = <></>;
  if (products && products.length > 0) {
    productResult = products.map((product, index) => (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <ProductCard
          id={product.id}
          image={product.image}
          name={product.name}
          brand={product.brand}
          offer={product.offer}
          isStock={product.isStock}
          description={product.description}
          offerPrice={product.offerPrice}
          salePrice={product.salePrice}
          rating={product.rating}
          color={product.colors ? product.colors[0] : undefined}
          open={openFilterDrawer}
        />
      </Grid>
    ));
  } else {
    productResult = (
      <Grid item xs={12} sx={{ mt: 3 }}>
        <ProductEmpty handelFilter={() => setFilter(initialState)} />
      </Grid>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductFilterDrawer
        filter={filter}
        setFilter={setFilter}
        openFilterDrawer={openFilterDrawer}
        handleDrawerOpen={handleDrawerOpen}
        setLoading={setLoading}
        initialState={initialState}
      />
      <Main theme={theme} open={openFilterDrawer} container={container}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <ProductsHeader filter={filter} handleDrawerOpen={handleDrawerOpen} setFilter={setFilter} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {isLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid key={item} item xs={12} sm={6} md={4} lg={4}>
                      <SkeletonProductPlaceholder />
                    </Grid>
                  ))
                : productResult}
            </Grid>
          </Grid>
        </Grid>
      </Main>
      <FloatingCart />
    </Box>
  );
};

export default ProductsPage;
