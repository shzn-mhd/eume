import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "store";
import axios from "utils/axios";
import { openSnackbar } from "./snackbar";

const initialState = {
    action: false,
    error: null,
    systemAdmin: {},
    systemAdmins: {
        systemAdmins: [],
        page: null,
        total: null,
        limit: null,
    },
    deletedSystemAdmin: {},
}; 

const systemAdminSlice = createSlice({
    name: 'systemAdmins',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },

        getSystemAdminSuccess(state, action) {
            state.systemAdmins = action.payload;
        },

        deleteSystemAdminSuccess(state, action) {
            state.deletedSystemAdmin = action.payload;
        },

        setAction(state) {
            state.action = !state.action;
        },

        findSystemAdminSuccess(state, action) {
            state.systemAdmin = action.payload;
        },

    },
});

export default systemAdminSlice.reducer;

export function setActionSystemAdmin() {
    dispatch(systemAdminSlice.actions.setAction());
}



export function getSystemAdmins(pageIndex = 0, pageSize = 10, name) {
    // console.log("university get all");
    return async () => {
        try {
            let requestUrl = `/system-admin/?page=${pageIndex + 1}&limit=${pageSize}`;
            

            if (name) {
                // requestUrl = `${requestUrl}&name=${name}`;
                requestUrl += `&name=${encodeURIComponent(name)}`;
              }
            const response = await axios.get(requestUrl);
            console.log("admin res", response);
            if(response.status === 200) {
                dispatch(systemAdminSlice.actions.getSystemAdminSuccess(response.data));
            }
        } catch (error) {
            dispatch(systemAdminSlice.actions.hasError(error));
        }
    }
}

// export function getAdmins(pageIndex = 0, pageSize = 10, name) {
//     return async (dispatch) => { // Assuming dispatch is available in scope
//         try {
//             let requestUrl = `/system-admin/?page=${pageIndex + 1}&limit=${pageSize}`;

//             if (name) {
//                 requestUrl += `&name=${encodeURIComponent(name)}`; // Encode name to handle special characters
//             }

//             const response = await axios.get(requestUrl);
//             console.log("admin res", response);
//             if (response.status === 200) {
//                 dispatch(adminSlice.actions.getAdminSuccess(response.data));
//             }
//         } catch (error) {
//             dispatch(adminSlice.actions.hasError(error));
//         }
//     }
// }



export function createSystemAdmin(values) {
    return async () => {
        try {
            const response = await axios.post(
                `/system-admin`, {...values});
            if(response.status === 200) {
                setActionAdmin();
            }
        } catch (error) {
            dispatch(adminSlice.actions.hasError(error));
        }
    }
}


export function updateSystemAdmin(adminId, values) {
    return async () => {
        console.log("update admin",values);
        try {
            const response = await axios.patch(
                `/system-admin/update/${adminId}`,
                 {...values});
            if(response.status === 200) {
                setActionSystemAdmin();
            }
        } catch (error) {
            dispatch(systemAdminSlice.actions.hasError(error));
        }
    }
}

export function deleteSystemAdmin(adminId) {
    return async () => {
        try {
            const response = await axios.delete(`/system-admin/${adminId}`);
            if(response.status === 200) {
                dispatch(systemAdminSlice.actions.deleteSystemAdminSuccess(response.data))
            }
        } catch (error) {
            dispatch(systemAdminSlice.actions.hasError(error));
        }
    }
}