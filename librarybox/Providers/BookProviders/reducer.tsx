import {  IBookStateContext } from "./context";
import { BookActionEnums } from "./actions";

export function BookReducer(incomingState:IBookStateContext,action:ReduxActions.Action<IBookStateContext>):IBookStateContext{
    const {type,payload}= action;
    switch(type){
        case BookActionEnums.Shelf:
            return {...payload};
        case BookActionEnums.Category:
            return {...payload}
        case BookActionEnums.Books:
            return {...payload}
        case BookActionEnums.Search:
            return {...payload}
        case BookActionEnums.FetchBook:
            return {...incomingState,...payload}
        default:
            return incomingState;
    }
}