import { AxiosRequestConfig } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { IUser, IUserFormValues } from "../Domain/IUserFormValues";

export default class AccountStore{
    currentUser: IUser | undefined = undefined;
    loadingLogin = false;
    loadingRegister = false;

    constructor(){
        makeAutoObservable(this);
    }

    get requestConfig(){
        let config: AxiosRequestConfig = {};
        if(this.currentUser){
            config = {
                headers: {
                    Authorization: "Bearer " + this.currentUser.token
                }
            }
        }
        return config;
    }

    get uploadRequestConfig(){
        let config: AxiosRequestConfig = {};
        if(this.currentUser){
            config = {
                headers: {
                    Authorization: "Bearer " + this.currentUser.token,
                    ContentType: "multipart/form-data"
                }
            }
        }
        return config;
    }

    get isLoggedIn(){
        return !!this.currentUser;
    }

    loginUser = async (formValues: IUserFormValues) => {
        this.loadingLogin = true;
        try{
            const user = await agent.User.login(formValues);
            runInAction(() => {
                this.currentUser = user;
                this.loadingLogin = false;
            })
        }
        catch(error){
            this.loadingLogin = false;
        }
    }

    logoutUser = async () => {
        this.currentUser = undefined;
    }


    //Get rid of this before deploy
    registerUser = async (formValues: IUserFormValues) => {
        this.loadingRegister = true;
        try{
            const user = await agent.User.register(formValues);
            runInAction(() => {
                this.currentUser = user;
                this.loadingRegister = false;
            })
        }
        catch(error){
            console.log(error);
            this.loadingRegister = false;
        }
    }
}