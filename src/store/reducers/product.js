import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from 'store';
import axios from 'utils/axios';
import { openSnackbar } from './snackbar';

const initialState = {
  action: false,
  error: null,
  product: {},
  offersmanegments: {
    offersmanegments: [],
    page: null,
    total: null,
    limit: null
  },
  deletedProduct: {}
};

const productSlice = createSlice({
  name: 'offersmanegments',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getProductSuccess(state, action) {
      state.offersmanegments = action.payload;
    },

    deleteProductSuccess(state, action) {
      state.deletedProduct = action.payload;
    },

    setAction(state) {
      state.action = !state.action;
    },

    findProductSuccess(state, action) {
      state.product = action.payload;
    }
  }
});

export default productSlice.reducer;

export function setActionProduct() {
  dispatch(productSlice.actions.setAction());
}



export function getProducts(pageIndex = 0, pageSize = 10, name, offerType = 'HealthBeauty', category ='Product') {
  return async () => {
    try {
      let requestUrl = `/offers-manegment/?page=${pageIndex + 1}&limit=${pageSize}&offerType=${offerType}&category=${category}`;
  
      if (name) {
        requestUrl = `${requestUrl}&name=${name}`;
      

      }

      const response = await axios.get(requestUrl);

      console.log('Response:', response);

      if (response.status === 200) {
        dispatch(productSlice.actions.getProductSuccess(response.data));
      }
    } catch (error) {
      dispatch(productSlice.actions.hasError(error));
    }
  };
}

export function createProduct(values, offerType = 'HealthBeauty', category = 'Product') {
  return async () => {
    try {
      // Add offerType and category to the payload
      const payload = {
        ...values,
        offerType,
        category
      };

      const response = await axios.post(`/offers-manegment`, payload);

      if (response.status === 200) {
        setActionProduct();
      }
    } catch (error) {
      dispatch(productSlice.actions.hasError(error));
    }
  };
}

export function updateProduct(id, values) {
  return async () => {
    try {
      const response = await axios.put(`/offers-manegment/${id}`, { ...values });
      if (response.status === 200) {
        setActionProduct();
      }
    } catch (error) {
      dispatch(productSlice.actions.hasError(error));
    }
  };
}

export function deleteProduct(id) {
  return async () => {
    try {
      const response = await axios.delete(`/offers-manegment/${id}`);
      if (response.status === 200) {
        dispatch(productSlice.actions.deleteProductSuccess(response.data));
      }
    } catch (error) {
      dispatch(productSlice.actions.hasError(error));
    }
  };
}
