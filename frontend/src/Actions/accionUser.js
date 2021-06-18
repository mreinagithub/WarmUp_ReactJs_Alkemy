import axios from 'axios';
import {    
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL,
    
    USER_LOGOUT,

} from '../Constants/userConstants';


export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://challenge-react.alkemy.org/',                                        
            {'email': email, 'password': password},
            config
            )
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ?
            error.response.data.detail : error.message,

        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    
}