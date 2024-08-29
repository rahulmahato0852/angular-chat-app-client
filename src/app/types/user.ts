export interface User {
    name: string,
    hero: string,
    email: string,
    mobile: string,
    createdAt: string,
    updatedAt: string,
    _id: string
}

export interface MessagesType { sender?: User, message: string, chat?: String }


export interface getMessagesReponse {
    message: string,
    result: MessagesType[]
}