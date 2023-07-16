export const Login_Start= ()=>{
    return {
        type: "LOGIN_START"
    }
};

export const Login_Success= (user)=>{
    return {
        type: "LOGIN_SUCCESS",
        payload: user
    }
};

export const Login_Failure= ()=>{
    return {
        type: "LOGIN_FAILURE"
    }
};

export const LogOut= ()=>{
    return {
        type: "LOGOUT"
    }
};

export const Update_Start= ()=>{
    return {
        type: "UPDATE_START"
    };
}

export const Update_Success= (user)=>{
    return {
        type: "UPDATE_SUCCESS",
        payload: user
    };
}

export const Update_Failure= ()=>{
    return {
        type: "UPDATE_FAILURE"
    };
}