import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchSendMsg = createAsyncThunk("chat/fetchSendMsg", async (message: string) => {
    try {
        const response = await fetch(`http://localhost:3000/multimodal-chat/ai/chat?input=${message}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        return { userSendMsg: message, aiContent: data };
    } catch (error) {
        console.error("Error fetching data:", error);
        return Promise.reject("当前网络繁忙,请稍后再试!");
    }
});


export const fetchGetChatList = createAsyncThunk("chat/getChatList", async (userId: string = 'allen') => {
    try {
        const resultList = await fetch(`http://localhost:3000/multimodal-chat/ai/chat-list?userId=${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        const data = await resultList.json()
        return data.data
    } catch (error) {
        return Promise.reject("不存在当前用户");
    }
})