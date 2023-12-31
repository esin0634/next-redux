import {
    createSlice,
    createAsyncThunk,
    nanoid,
    createAction,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  
  const POSTS_URL = "https://jsonplaceholder.typicode.com/users";
  
  const initialState = {
    users: [],
    status: "idle",
    error: null,
  };
  
  export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    try {
      const response = await axios.get(POSTS_URL);
      return [...response.data];
    } catch (err) {
      return err.message;
    }
  });
  
  const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      userAdded: {
        reducer(state, action) {
          state.users.push(action.payload);
        },
        prepare(name, email, phone) {
          return {
            payload: {
              id: nanoid(),
              name,
              email,
              phone,
            },
          };
        },
      },
      userRemoved(state, action) {
        const userId = action.payload;
        state.users = state.users.filter((user) => user.id !== userId);
      },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchUsers.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.status = "succeeded";
         
          state.users = action.payload; 
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
        
    },
  });
  
  export const selectAllUsers = (state) => state.users.users;
  export const getUsersStatus = (state) => state.users.status;
  export const getUsersError = (state) => state.users.error;
  
  export const { userAdded, userRemoved } = usersSlice.actions;
  
  export default usersSlice.reducer;
  