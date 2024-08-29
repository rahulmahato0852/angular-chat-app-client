import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ChatService } from "../../user/services/chat.service";
import { getMessage, getMessageRejected, getMessageSuccess, sendMessage, sendMessageRejected, sendMessageSuccess } from "../actions/chat.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()

export class chatEffect {

    constructor(private actions: Actions, private chatservice: ChatService) { }

    $sendMessage = createEffect(() => {
        return this.actions.pipe(
            ofType(sendMessage),
            mergeMap(({ message, recevier }) => this.chatservice.sendMessage({ message, recevier }).pipe(
                map(({ message: resMessage }) => sendMessageSuccess({ message: resMessage, newMsg: message })),
                catchError((error) => of(sendMessageRejected({ error })))
            )),
        )
    })

    $getMessage = createEffect(() => {
        return this.actions.pipe(
            ofType(getMessage),
            mergeMap(({ recevier }) => this.chatservice.getMessages(recevier).pipe(
                map((res) => getMessageSuccess({ res })),
                catchError((error) => of(getMessageRejected({ error })))
            )),
        )
    })





}
