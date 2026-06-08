import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSendMsg, fetchGetChatList } from "./asyncRequest";
export interface ChatState {
    messages: Record<string, any[]>;
    conversation: any[];
    userSendHistoryMsg: Array<string | number>, //  用户发送历史消息
    userToAiObj: Record<string, any>, //  用户发送历史消息
}


const initialState: ChatState = {
    messages: {},
    conversation: [],
    userSendHistoryMsg: [], //  用户发送历史消息
    userToAiObj: {} //  用户发送给ai的对象，键值对形式
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ChatState["messages"]>) => {
            console.log(state.messages, '打印message的数据');

        }
    },
    extraReducers: async (builder) => {
        builder.addCase(fetchSendMsg.fulfilled, (state, action) => {
            state.userSendHistoryMsg.push(action.payload.userSendMsg)
            state.userToAiObj[action.payload.userSendMsg] = action.payload.aiContent
        })
        builder.addCase(fetchGetChatList.fulfilled, (state, action) => {
            state.conversation = action.payload
            console.log(action.payload, 13);

        })
    },

})

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
