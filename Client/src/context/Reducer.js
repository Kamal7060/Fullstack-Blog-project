const Reducer= (state, action)=>{
    switch(action.type){
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
                dispatch: state.dispatch
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
                dispatch: state.dispatch
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
                dispatch: state.dispatch
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
                dispatch: state.dispatch
            };
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
                dispatch: state.dispatch
            };
        case "UPDATE_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
                dispatch: state.dispatch
            };
        default:
            return state;
    }
};

export default Reducer;