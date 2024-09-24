import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "store";
import axios from "utils/axios";
import { openSnackbar } from "./snackbar";

const initialState = {
    action: false,
    error: null,
    university: {},
    universities: {
        universities: [],
        page: null,
        total: null,
        limit: null,
    },
    deletedUniversity: {},
}; 

const universitySlice = createSlice({
    name: 'universities',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },

        getUniversitySuccess(state, action) {
            state.universities = action.payload;
        },

        deleteUniversitySuccess(state, action) {
            state.deletedUniversity = action.payload;
        },

        setAction(state) {
            state.action = !state.action;
        },

        findUniversitySuccess(state, action) {
            state.university = action.payload;
        },

    },
});

export default universitySlice.reducer;

export function setActionUniversity() {
    dispatch(universitySlice.actions.setAction());
}

export function getUniversities(
    pageIndex = 0, pageSize = 10, name) {
    // console.log("university get all");
    return async () => {
        try {
            let requestUrl = `/university/?page=
            ${pageIndex + 1}&limit=${pageSize}`;

            if (name) {
                requestUrl = `${requestUrl}&name=${name}`;
              }
            const response = await axios.get(requestUrl);
            console.log("uni res", response);
            if(response.status === 200) {
                dispatch(universitySlice.actions.
                    getUniversitySuccess(response.data));
            }
        } catch (error) {
            dispatch(universitySlice.actions.hasError(error));
        }
    }
}

export function createUniversity(values) {
    return async () => {
        try {
            const response = await axios.post(
                `/university`, {...values});
            if(response.status === 200) {
                setActionUniversity();
            }
        } catch (error) {
            dispatch(universitySlice.actions.hasError(error));
        }
    }
}


export function createBulkUpload(values) {
    return async () => {
        try {

            console.log('createBulk: ',values);
            const formData = new FormData();
            // Append values to the FormData object
           
                formData.append('file', values);
           

            // Append a dummy file value under the key 'file'
            // formData.append('file', ''); // Add your file value here if you have it

            const response = await axios.post(`/university/uplaod`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for sending form data
                }
            });

            if (response.status === 200) {
                // Assuming setActionUniversity is a function defined elsewhere
                setActionUniversity();
            }
        } catch (error) {
            // Assuming dispatch and universitySlice are defined elsewhere
            dispatch(universitySlice.actions.hasError(error));
        }
    }
}



export function updateUniversity(universityId, values) {
    return async () => {
        console.log("update unii",values);
        try {
            const response = await axios.patch(
                `/university/update/${universityId}`,
                 {...values});
            if(response.status === 200) {
                setActionUniversity();
            }
        } catch (error) {
            dispatch(universitySlice.actions.hasError(error));
        }
    }
}

export function deleteUniversity(universityId) {
    return async () => {
        try {
            const response = await axios.delete(`/university/${universityId}`);
            if(response.status === 200) {
                dispatch(universitySlice.actions.deleteUniversitySuccess(response.data))
            }
        } catch (error) {
            dispatch(universitySlice.actions.hasError(error));
        }
    }
}