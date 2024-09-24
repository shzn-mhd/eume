import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Rating,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';

// project imports
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';

import { getRelatedProducts } from 'api/products';
import { openSnackbar } from 'api/snackbar';
import { getImageUrl, ImagePath } from 'utils/getImageUrl';

// assets
import { HeartFilled, HeartOutlined, StarFilled, StarOutlined } from '@ant-design/icons';

const ListProduct = ({ product }) => {
  const theme = useTheme();
  const history = useNavigate();

  const [wishlisted, setWishlisted] = useState(false);
  const addToFavourite = () => {
    setWishlisted(!wishlisted);
    openSnackbar({
      open: true,
      message: 'Added to favourites',
      variant: 'alert',
      alert: {
        color: 'success'
      }
    });
  };

  const linkHandler = (id) => {
    history(`/apps/e-commerce/product-details/${id}`);
  };

  return (
    <ListItemButton divider onClick={() => linkHandler(product.id)}>
      <ListItemAvatar>
        <Avatar
          alt="Avatar"
          size="xl"
          color="secondary"
          variant="rounded"
          type="combined"
          src={product.image ? getImageUrl(`thumbs/${product.image}`, ImagePath.ECOMMERCE) : ''}
          sx={{ borderColor: theme.palette.divider, mr: 1 }}
        />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={<Typography variant="h5">{product.name}</Typography>}
        secondary={
          <Stack spacing={1}>
            <Typography color="textSecondary">{product.description}</Typography>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="h5">{product.salePrice ? `$${product.salePrice}` : `$${product.offerPrice}`}</Typography>
                {product.salePrice && (
                  <Typography variant="h6" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                    ${product.offerPrice}
                  </Typography>
                )}
              </Stack>
              <Rating
                name="simple-controlled"
                value={product.rating < 4 ? product.rating + 1 : product.rating}
                icon={<StarFilled style={{ fontSize: 'small' }} />}
                emptyIcon={<StarOutlined style={{ fontSize: 'small' }} />}
                readOnly
                precision={0.1}
              />
            </Stack>
          </Stack>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          size="medium"
          color="secondary"
          sx={{ opacity: wishlisted ? 1 : 0.5, '&:hover': { bgcolor: 'transparent' } }}
          onClick={addToFavourite}
        >
          {wishlisted ? (
            <HeartFilled style={{ fontSize: '1.15rem', color: theme.palette.error.main }} />
          ) : (
            <HeartOutlined style={{ fontSize: '1.15rem' }} />
          )}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};

ListProduct.propTypes = {
  product: PropTypes.object
};

// ==============================|| PRODUCT DETAILS - RELATED PRODUCTS ||============================== //

const RelatedProducts = ({ id }) => {
  const [related, setRelated] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      await getRelatedProducts(id).then((response) => {
        setRelated(response.data);
        setLoader(false);
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  let productResult = (
    <List>
      {[1, 2, 3].map((index) => (
        <ListItem key={index}>
          <ListItemAvatar sx={{ minWidth: 72 }}>
            <Skeleton variant="rectangular" width={62} height={62} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton animation="wave" height={22} />}
            secondary={
              <>
                <Skeleton animation="wave" height={14} width="60%" />
                <Skeleton animation="wave" height={18} width="20%" />
                <Skeleton animation="wave" height={14} width="35%" />
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  if (related && !loader) {
    productResult = (
      <List
        component="nav"
        sx={{
          '& .MuiListItemButton-root': {
            '& .MuiListItemSecondaryAction-root': {
              alignSelf: 'flex-start',
              ml: 1,
              position: 'relative',
              right: 'auto',
              top: 'auto',
              transform: 'none'
            },
            '& .MuiListItemAvatar-root': { mr: '7px' },
            py: 0.5,
            pl: '15px',
            pr: '8px'
          },
          p: 0
        }}
      >
        {related.map((product, index) => (
          <ListProduct key={index} product={product} />
        ))}
      </List>
    );
  }

  return (
    <SimpleBar sx={{ height: { xs: '100%', md: 'calc(100% - 62px)' } }}>
      <Grid item>
        <Stack>
          {productResult}
          <Button color="secondary" variant="outlined" sx={{ mx: 2, my: 4, textTransform: 'none' }}>
            View all Products
          </Button>
        </Stack>
      </Grid>
    </SimpleBar>
  );
};

RelatedProducts.propTypes = {
  id: PropTypes.string
};

export default RelatedProducts;
