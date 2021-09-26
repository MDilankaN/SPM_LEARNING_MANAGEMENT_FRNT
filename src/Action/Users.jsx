import {
    ADD_USER,
    GET_USER,
    UPDATE_USER,
    DELETE_USER,
    FETCH_USERS,
    VALID_USER,
    ERROR_USER,
    GET_USER_COUNT
} from "./types";
import axios from "axios";
import * as api from '../API'
import {useDispatch} from "react-redux";



export const fetchStudents = () => dispatch => {
    console.log('fetching');
    axios.get(api.baseURL + 'students')
        .then(response => {
            dispatch({
                type: FETCH_USERS,
                payload: response
            })}

        ).catch((err) => {

        console.log(err);
    })
}

export const fetchTeachers = () => dispatch => {
    console.log('fetching');
    axios.get(api.baseURL + '/teachers')
        .then(response => {
            dispatch({
                type: FETCH_USERS,
                payload: response
            })}

        ).catch((err) => {

        console.log(err);
    })
}

// const { user } = useSelector((store) => store?.user);
export const fetchUser = () => dispatch => {
    console.log('fetching');
    axios.get(api.baseURL + '/students')//api.baseURL + 'deleteuser'
        .then(response => {
            dispatch({
                type: FETCH_USERS,
                payload: response
            })}
        ).catch((err) => {
        console.log(err);
    })
}

export const addUsers = (PostData) => async (dispatch) => {
    try {
        const response = await axios.post(api.baseURL + 'useradd', PostData)
        console.log(response)
        if (response.status === 200) {
            if (response.data === 'username exists'){
                dispatch({
                    type: ERROR_USER,
                    payload: response.data
                })
            }else if (response.data.username != null){

                dispatch({
                    type: ADD_USER,
                    payload: response.data
                })
            }

        } else {
            console.log('else ',response.data)
            dispatch({
                type: ERROR_USER,
                payload: response.data
            })
        }

    }catch(err) {
        console.log(err);
    }

}

// export const loginUserValidation = (user) => async (dispatch) => {
//     console.log('creating');
//     try {
//         const data= await api.validateUser(user);
//         console.log('data ', data);
//         dispatch({type: VALID_USER, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// }


export const deleteUsers = (id) => dispatch => {
    console.log('creating');
    axios.delete(api.baseURL + 'deleteuser/'+ id)
        .then(response => {
                dispatch({
                    type: DELETE_USER,
                    payload: id
                })
                // alert("data deleted sucessfully");
            }

        ).catch((err) => {
        console.log(err);
    })
}

// export const getUserByID = async (id) => {
//     const dispatch = useDispatch();
//     console.log('get user by id');
//     try {
//         const response = await axios.get(api.baseURL + 'getsingleuser/' + id)
//
//         dispatch({
//             type: GET_USER,
//             payload: response
//         })
//     }catch(err) {
//         console.log(err);
//     }
// }



export const getUserByID = (id) => dispatch => {
    console.log('get user by id');
    axios.get(api.baseURL + 'getsingleuser/'+ id)
        .then(response => {
                dispatch({
                    type: GET_USER,
                    payload: response
                })
            }

        ).catch((err) => {
        console.log(err);
    })
}

export const loggedUser = (PostData) => dispatch => {
    dispatch({type: VALID_USER, payload: PostData });
}


export const upDateUser = (id, PostData) => dispatch => {
    axios.put(api.baseURL + 'updateuser/' + id , PostData)
        .then(response => {
            console.log(response)
            if(response.status === 200){
                console.log(response.data)
                dispatch({
                    type: UPDATE_USER,
                    payload: response.data
                })
            }
            else{
                console.log('error123')
            }
        })


        //alert("data updated successfully");


        .catch((err) => {
            console.log(err);
        })
}

export const getUserCount = () => dispatch => {
    //console.log('get user by id');
    axios.get(api.baseURL + 'usercount/')
        .then(response => {
                dispatch({
                    type: GET_USER_COUNT,
                    payload: response
                })
            }

        ).catch((err) => {
        console.log(err);
    })
}