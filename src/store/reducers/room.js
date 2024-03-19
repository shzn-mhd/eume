import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "store";
import axios from "utils/axios";
import { openSnackbar } from "./snackbar";

const initialState = {
    action: false,
    error: null,
    room: {},
    rooms: {
        rooms: [],
        page: null,
        total: null,
        limit: null,
    },
    deletedRoom: {},
  }; 
  
  const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
  
        getRoomSuccess(state, action) {
            state.rooms = action.payload;
        },
  
        deleteRoomSuccess(state, action) {
            state.deletedRoom = action.payload;
        },
  
        setAction(state) {
            state.action = !state.action;
        },
  
        findRoomSuccess(state, action) {
            state.room = action.payload;
        },
  
    },
  });
  
  export default roomSlice.reducer;
  
  export function setActionRoom() {
    dispatch(roomSlice.actions.setAction());
  }
  
  
  
  export function getRooms(pageIndex = 0, pageSize = 10, name) {
    // console.log("university get all");
    return async () => {
        try {
            let requestUrl = `/room/?page=${pageIndex + 1}&limit=${pageSize}`;
            
  
            if (name) {
                // requestUrl = `${requestUrl}&name=${name}`;
                requestUrl += `&name=${encodeURIComponent(name)}`;
              }
            const response = await axios.get(requestUrl);
            console.log("admin res", response);
            if(response.status === 200) {
                dispatch(roomSlice.actions.getRoomSuccess(response.data));
            }
        } catch (error) {
            dispatch(roomSlice.actions.hasError(error));
        }
    }
  }
  
  
  export function createRoom(values) {
    return async () => {
      try {
        const convertedValues = {
          ...values,
          commissionRate: parseInt(values.commissionRate)
        };
        const response = await axios.post(`/room`, convertedValues);
        if (response.status === 200) {
      setActionRoom();
      console.log( "created admin ", response );
    } else {
      console.error('Unexpected status:', response.status);
    }
        
      } catch (error) {
        console.error('Error creating admin:', error);
        dispatch(roomSlice.actions.hasError(error));
    }
   };
  }
  
  export function updateRoom(adminId, values) {
    return async () => {
      try {
  
        const updatedValues = {
          ...values,
          commissionRate: parseInt(values.commissionRate)
        };
  
  
        const response = await axios.patch(`/room/${adminId}`,updatedValues)
         console.log("hiiiiiii",values)
        if (response.status === 200) {
          setActionRoom();
        }
      } catch (error) {
        dispatch(roomSlice.actions.hasError(error));
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
  
  export function deleteRoom(adminId) {
    return async () => {
        try {
            const response = await axios.delete(`/room/${adminId}`);
            if(response.status === 200) {
                dispatch(roomSlice.actions.deleteRoomSuccess(response.data))
            }
        } catch (error) {
            dispatch(roomSlice.actions.hasError(error));
        }
    }
  }