import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './features/usersSlice/usersSlice';



export default configureStore({
    reducer:{
        users: usersSlice,
       
    }
})