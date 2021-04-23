import { IBlogPost } from '../Domain/IBlogPost';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IUser, IUserFormValues } from '../Domain/IUserFormValues';
import { toast } from 'react-toastify';

const uri = "blogpost";
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(undefined, error => {
    if(error.message === 'Network Error' && !error.response){
        toast.error('Unable to reach server');
    }
    const {status} = error.response;
    if(status === 500){
        toast.error('Server error - check terminal for more info.');
    }
    if(status === 401){
        toast.error("Incorrect username or password");
    }
});

const requests = {
    get: (url: string, config: AxiosRequestConfig | undefined) => axios.get(url, config).then(responseBody),
    post: (url: string, body: {}, config: AxiosRequestConfig | undefined) => axios.post(url, body, config).then(responseBody),
    put: (url: string, body: {}, config: AxiosRequestConfig | undefined) => axios.put(url, body, config).then(responseBody),
    del: (url: string, config: AxiosRequestConfig | undefined) => axios.delete(url, config).then(responseBody)
};

const BlogPost = {
    list: (): Promise<IBlogPost[]> => requests.get(`${uri}`, undefined),
    details: (id: string, config: AxiosRequestConfig | undefined) => requests.get(`${uri}/${id}`, config),
    create: (post: IBlogPost, config: AxiosRequestConfig | undefined) => requests.post(`${uri}`, post, config),
    update: (post: IBlogPost, config: AxiosRequestConfig | undefined) => requests.put(`${uri}/${post.id}`, post, config),
    delete: (id: string, config: AxiosRequestConfig | undefined) => requests.del(`${uri}/${id}`, config),
    upload: (id: string, data: FormData, config: AxiosRequestConfig | undefined) => requests.put(`${uri}/${id}/images`, data, config)
}

const User = {
    login: (user: IUserFormValues): Promise<IUser> => requests.post("user/login", user, undefined),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`user/register`, user, undefined)
}

export default{
    BlogPost,
    User
}