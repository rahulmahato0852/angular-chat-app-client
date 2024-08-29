import { createReducer, on } from "@ngrx/store";
import { MessagesType, User } from "../../types/user";
import { getMessage, getMessageRejected, getMessageSuccess, getNewMessage, sendMessage, sendMessageRejected, sendMessageSuccess, setSelectedUser } from "../actions/chat.action";


export type chatStateType = {
    selectedUser: User | null,
    loading: boolean,
    sendloading: boolean,
    message: string,
    error: any,
    getMessageSuccess: boolean,
    allMessages: MessagesType[],
}


const initialState: chatStateType = {
    selectedUser: null,
    loading: false,
    sendloading: false,
    getMessageSuccess: false,
    message: "",
    error: "",
    allMessages: [],

}

export const chatReducer = createReducer(
    initialState,

    on(setSelectedUser, (state, { user }) => ({ ...state, selectedUser: user })),

    on(sendMessage, (state, action) => ({ ...state, sendloading: true })),
    on(sendMessageSuccess, (state, { message, newMsg }) => ({ ...state, sendloading: false, message, allMessages: [...state.allMessages, { message: newMsg }] })),
    on(sendMessageRejected, (state, { error }) => ({ ...state, sendloading: false, error })),

    on(getMessage, (state, action) => ({ ...state, loading: true, getMessageSuccess: false })),
    on(getMessageSuccess, (state, { res }) => ({ ...state, loading: false, message: res.message, allMessages: res.result, getMessageSuccess: true })),
    on(getMessageRejected, (state, { error }) => ({ ...state, loading: false, error, getMessageSuccess: false })),

    on(getNewMessage, (state, { newMSG }) => ({ ...state, allMessages: [...state.allMessages, newMSG] }))

)