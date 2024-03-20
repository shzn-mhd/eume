import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "store";
import axios from "utils/axios";
import { openSnackbar } from "./snackbar";

import { parseISO } from 'date-fns';


const initialState = {
    action: false,
    error: null,
    systemBooking: {},
    systemBookings: {
        bookings: [],
        page: null,
        total: null,
        limit: null,
    },
    deletedSystemBooking: {},
}; 

const systemBookingSlice = createSlice({
    name: 'systemBookings',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },

        getSystemBookingSuccess(state, action) {
            state.systemBookings = action.payload;
        },

        deleteSystemBookingSuccess(state, action) {
            state.deletedSystemBooking = action.payload;
        },

        setAction(state) {
            state.action = !state.action;
        },

        findSystemBookingSuccess(state, action) {
            state.systemBooking = action.payload;
        },

    },
});

export default systemBookingSlice.reducer;

export function setActionSystemBooking() {
    dispatch(systemBookingSlice.actions.setAction());
}



export function getSystemBookings(pageIndex = 0, pageSize = 10, name) {
    // console.log("university get all");
    return async () => {
        try {
            let requestUrl = `/bookings/?page=${pageIndex + 1}&limit=${pageSize}`;  //fix test
            

            if (name) {
                // requestUrl = `${requestUrl}&name=${name}`;
                requestUrl += `&name=${encodeURIComponent(name)}`;
              }
            const response = await axios.get(requestUrl);
            console.log("booking res", response);
            if(response.status === 200) {
                dispatch(systemBookingSlice.actions.getSystemBookingSuccess(response.data));
            }
        } catch (error) {
            dispatch(systemBookingSlice.actions.hasError(error));
        }
    }
}


export function createSystemBooking(values) {
    return async () => {
      try {
        const convertedValues = {
          ...values,
          commissionRate: parseInt(values.commissionRate)
        };
        const response = await axios.post(`/bookings`, convertedValues);
        if (response.status === 200) {
      setActionSystemBooking();
      console.log( "created booking ", response );
    } else {
      console.error('Unexpected status:', response.status);
    }
        
      } catch (error) {
        console.error('Error creating booking:', error);
        dispatch(systemBookingSlice.actions.hasError(error));
    }
   };
  }

  // export function updateSystemBooking(bookingID, values) {
  //   return async () => {
  //     try {
  
  //       const updatedValues = {
  //         ...values,
  //         commissionRate: parseInt(values.commissionRate)
  //       };
  
  
  //       const response = await axios.patch(`/bookings/${id}`,updatedValues)
  //        console.log("hiiiiiii",values)
  //       if (response.status === 200) {
  //         setActionSystemBooking();
  //       }
  //     } catch (error) {
  //       dispatch(systemBookingSlice.actions.hasError(error));
  //       }
  //   };
  // }

export function updateSystemBooking(bookingID, values) {
    return async () => {
        console.log("Update Booking", values);
        try {
            const response = await axios.patch(
                `/booking/update${bookingID}`,
                 {...values});
            if(response.status === 200) {
                setActionSystemBooking();
               
            }
            
        } catch (error) {
            dispatch(systemBookingSlice.actions.hasError(error));
        }
    }
}

export function deleteSystemBooking(id) {
    return async () => {
        try {
            const response = await axios.delete(`/bookings/${id}`);
            if(response.status === 200) {
                dispatch(systemBookingSlice.actions.deleteSystemBookingSuccess(response.data))
            }
        } catch (error) {
            dispatch(systemBookingSlice.actions.hasError(error));
        }
    }
}