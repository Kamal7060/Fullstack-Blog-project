import { createContext, useEffect, useReducer } from 'react';
import Reducer from './Reducer';

const INTIAL_STATE= {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false,
    dispatch: ()=>{}
}

export const Context= createContext(INTIAL_STATE);

export const ContextProvider= (props)=>{
    const [userState, dispatch]= useReducer(Reducer, INTIAL_STATE);
    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(userState.user));
    },[userState.user]);
    return <Context.Provider value= {{
        user: userState.user,
        isFetching: userState.isFetching,
        error: userState.error,
        dispatch: dispatch
    }}>
        {props.children}
    </Context.Provider>
}