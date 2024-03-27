import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "store";
import axios from "utils/axios";
import { openSnackbar } from "./snackbar";

const initialState = {
    action: false,
    error: null,
    offers: {},
    offers: {
        offers: [],
        page: null,
        total: null,
        limit: null,
    },
    deletedOffers: {},
}; 

const offerSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },

        getOfferSuccess(state, action) {
            state.offers = action.payload;
        },

        deleteOfferSuccess(state, action) {
            state.deletedOffer = action.payload;
        },

        setAction(state) {
            state.action = !state.action;
        },

        findOfferSuccess(state, action) {
            state.offer = action.payload;
        },

    },
});

export default offerSlice.reducer;

export function setActionOffer() {
    dispatch(offerSlice.actions.setAction());
}



export function getOffers(pageIndex = 0, pageSize = 10, name) {
    // console.log("university get all");
    return async () => {
        try {
            let requestUrl = `/offers/?page=${pageIndex + 1}&limit=${pageSize}`;
            

            if (name) {
                // requestUrl = `${requestUrl}&name=${name}`;
                requestUrl += `&name=${encodeURIComponent(name)}`;
              }
            const response = await axios.get(requestUrl);
            console.log("offer res", response);
            if(response.status === 200) {
                dispatch(offerSlice.actions.getOfferSuccess(response.data));
            }
        } catch (error) {
            dispatch(offerSlice.actions.hasError(error));
        }
    }
}


export function createOffer(values) {
    return async () => {
      try {
        const convertedValues = {
          ...values,
          //commissionRate: parseInt(values.commissionRate)
        };
        const response = await axios.post(`/offers`, convertedValues);
        if (response.status === 200) {
      setActionOffer();
      console.log( "created offer ", response );
    } else {
      console.error('Unexpected status:', response.status);
    }
        
      } catch (error) {
        console.error('Error creating offer:', error);
        dispatch(offerSlice.actions.hasError(error));
    }
   };
  }

  export function updateOffer(offerId, values) {
    return async () => {
      try {
  
        const updatedValues = {
          ...values,
          //commissionRate: parseInt(values.commissionRate)
        };
  
  
        const response = await axios.patch(`/offers/${offerId}`,updatedValues)
         console.log("hiiiiiii",values)
        if (response.status === 200) {
          setActionOffer();
        }
      } catch (error) {
        dispatch(offerSlice.actions.hasError(error));
        }
    };
  }

export function deleteOffer(offerId) {
    return async () => {
        try {
            const response = await axios.delete(`/offers/${offerId}`);
            if(response.status === 200) {
                dispatch(offerSlice.actions.deleteOfferSuccess(response.data))
            }
        } catch (error) {
            dispatch(offerSlice.actions.hasError(error));
        }
    }
}