import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "store";
import axios from "utils/axios";
import { openSnackbar } from "./snackbar";

const initialState = {
    action: false,
    error: null,
    accommodations: {},
    accommodations: {
      accommodations: [],
        page: null,
        total: null,
        limit: null,
    },
    deletedAccommodations: {},
}; 

const accommodationSlice = createSlice({
    name: 'accommodations',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },

        getAccommodationSuccess(state, action) {
            state.accommodations = action.payload;
        },

        deleteAccommodationSuccess(state, action) {
            state.deletedAccommodation = action.payload;
        },

        setAction(state) {
            state.action = !state.action;
        },

        findAccommodationSuccess(state, action) {
            state.accommodation = action.payload;
        },

    },
});

export default accommodationSlice.reducer;

export function setActionAccommodation() {
    dispatch(accommodationSlice.actions.setAction());
}



export function getAccommodations(pageIndex = 0, pageSize = 10, name) {
    // console.log("university get all");
    return async () => {
        try {
            let requestUrl = `/accommodations/?page=${pageIndex + 1}&limit=${pageSize}`;
            

            if (name) {
                // requestUrl = `${requestUrl}&name=${name}`;
                requestUrl += `&name=${encodeURIComponent(name)}`;
              }
            const response = await axios.get(requestUrl);
            console.log("accommodation res", response);
            if(response.status === 200) {
                dispatch(accommodationSlice.actions.getAccommodationSuccess(response.data));
            }
        } catch (error) {
            dispatch(accommodationSlice.actions.hasError(error));
        }
    }
}


export function createAccommodation(values,image) {
    return async () => {
      try {
        const convertedValues = {
          ...values,
          //commissionRate: parseInt(values.commissionRate)
        };
        const formData = new FormData();
        formData.append("files",image)
        for(const key in convertedValues){
          formData.append(key,convertedValues[key])
        }
        // formData.append(convertedValues)
        const response = await axios.post(`/accommodations`, formData,{
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
        if (response.status === 200) {
      setActionAccommodation();
      console.log( "created accommodation ", response );
    } else {
      console.error('Unexpected status:', response.status);
    }
        
      } catch (error) {
        console.error('Error creating accommodation:', error);
        dispatch(accommodationSlice.actions.hasError(error));
    }
   };
  }

  export function updateAccommodation(accommodationId, values,image) {
    return async () => {
      try {
  
        const formData = new FormData();
        formData.append("files", image);
        for (const key in values) {
          formData.append(key, values[key]);
        }
  
        const response = await axios.patch(`/accommodations/${accommodationId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
         console.log("hiiiiiii",values)
        if (response.status === 200) {
          setActionAccommodation();
        }
      } catch (error) {
        dispatch(accommodationSlice.actions.hasError(error));
        }
    };
  }

// export function updateSystemAdmin(adminId, values) {
//     return async () => {
        
//         try {
//             const response = await axios.patch(
//                 `/system-admin${adminId}`,
//                  {...values});
//             if(response.status === 200) {
//                 setActionSystemAdmin();
               
//             }
//             console.log("update admin",values);
//         } catch (error) {
//             dispatch(systemAdminSlice.actions.hasError(error));
//         }
//     }
// }

export function deleteAccommodation(accommodationId) {
    return async () => {
        try {
            const response = await axios.delete(`/accommodations/${accommodationId}`);
            if(response.status === 200) {
                dispatch(accommodationSlice.actions.deleteAccommodationSuccess(response.data))
            }
        } catch (error) {
            dispatch(accommodationSlice.actions.hasError(error));
        }
    }
}