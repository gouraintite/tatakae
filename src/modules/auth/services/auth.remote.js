import axiosInstance from '../../../config/axios';
import {REGISTER, ACTIVATE_EMAIL, LOGIN, LOGOUT, RETRIEVE_MAIL, CHANGE_PASSWORD, RESET_PASSWORD, me, CHANGE_img, RESEND} from '../../../config/ApiUrl';


const root_link = import.meta.env.VITE_BASE_URL

export const register = (user)=> {
     return   axiosInstance.post(root_link + REGISTER, user);

}

export const activate_email = (email)=> {
    return   axiosInstance.post(root_link + ACTIVATE_EMAIL, email);

}

export const login = (logindto)=> {
    return axiosInstance.post(root_link + LOGIN, logindto);

}

export const logout = ()=> {
    return axiosInstance.post(root_link + LOGOUT);

}

export const forgot_password = (identifier)=> {
    return axiosInstance.post(root_link + RETRIEVE_MAIL, identifier);

}

export const change_password = (passwords)=> {
    return axiosInstance.post(root_link + CHANGE_PASSWORD, passwords);

}

export const reset_password = (passwords)=> {
    return axiosInstance.post(root_link + RESET_PASSWORD, passwords);

}

export const resend = (resendData)=> {
    return axiosInstance.post(root_link + RESEND, resendData);

}

export const reset_init = (passwords)=> {
    return axiosInstance.post(root_link + CHANGE_PASSWORD, passwords);

}

// profile 


export const profile = ()=> {
    return axiosInstance.get(root_link + me);

}

export const update_profile = (client)=> {
    console.log(root_link + me, client, 'link client');
    return axiosInstance.patch(root_link + me, client, {
        headers: {
          'accept': 'application/json',
          'Content-Type': `multipart/form-data; boundary=xxBOUNDARYxx`,
        }});

}

export const change_img = (img)=> {
    return axiosInstance.post(root_link + CHANGE_img, img, {
        headers: {
          'accept': 'application/json',
          'Content-Type': `multipart/form-data; boundary=xxBOUNDARYxx`,
        }});

}