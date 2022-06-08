import axios from "axios";

export const loginCall = async (userCredential, dispatch)=>{
    dispatch({type: 'LOGIN_START'});

    const path = require('./Path');

    try{
        const res = await axios.post(
            path.buildPath('/users/loginUser'),
            userCredential
        )
        dispatch({type:'LOGIN_SUCCESS', payload: res.data});
        localStorage.setItem('user', JSON.stringify(res.data));
    }catch(err){
        dispatch({type:'LOGIN_FAILURE', payload: err});
    }
}