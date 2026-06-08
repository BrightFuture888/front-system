import { configureStore } from '@reduxjs/toolkit';
import chatSliceReducer from './chat';
import userSliceReducer from './user';


const store = configureStore({
    reducer: {
        chat: chatSliceReducer,
        user: userSliceReducer,
    },
})


export default store;
