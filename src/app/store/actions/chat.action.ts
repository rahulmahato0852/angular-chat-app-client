import { createAction, props } from "@ngrx/store";
import { MessagesType, User, getMessagesReponse } from "../../types/user";

export const setSelectedUser = createAction("SET SELECTEDUSER", props<{ user: User }>())

export const sendMessage = createAction("SEND MESSAGE", props<{ message: string, recevier: string }>())
export const sendMessageSuccess = createAction("SEND MESSAGE SUCCESS", props<{ message: string, newMsg: string }>())
export const sendMessageRejected = createAction("SEND MESSAGE REJECTED", props<{ error: string }>())

export const getNewMessage = createAction("GET NEW MESSAGE", props<{ newMSG: MessagesType }>())

export const getMessage = createAction("GET MESSAGE", props<{ recevier: string }>())
export const getMessageSuccess = createAction("GET MESSAGE SUCCESS", props<{ res: getMessagesReponse, }>())
export const getMessageRejected = createAction("GET MESSAGE REJECTED", props<{ error: string }>())

