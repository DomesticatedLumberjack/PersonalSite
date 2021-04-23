import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { IBlogPost } from "../Domain/IBlogPost";
import { store } from "./store";

export default class BlogStore {
    loadedBlogPosts: IBlogPost[] = [];
    loadedPostDetails: IBlogPost | null = null;
    loadingInital = false;
    loadingFormSubmission = false;
    loadingDelete = false;
    loadingPostDetails = false;
    selectedFile: Blob | undefined = undefined;
    selectedFileName: string | undefined = undefined;
    loadingFileUpload = false;

    get blogPostsByDate() {
        return Array.from(this.loadedBlogPosts).sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    constructor(){
        makeAutoObservable(this);
        this.loadBlogPosts();
    }

    loadFile = async (file: Blob | undefined, fileName: string) => {
        this.selectedFile = file;
        this.selectedFileName = fileName;
    }

    uploadFile = async (id: string) => {
        if(this.selectedFile !== undefined && this.selectedFileName !== undefined){
            this.loadingFileUpload = true;
            try{
                const formData = new FormData();
                const newFileName = id + '.' + this.selectedFileName.slice().split(".").pop();
                formData.append("formFile", this.selectedFile);
                formData.append("fileName", newFileName);
                formData.append("id", id);
                await agent.BlogPost.upload(id, formData, store.accountStore.uploadRequestConfig);
                runInAction(() => {
                    this.selectedFile = undefined;
                    this.selectedFileName = undefined;
                    this.loadingFileUpload = false;
                });
                return newFileName;
            }
            catch(error){
                console.log(error);
                this.selectedFile = undefined;
                this.selectedFileName = undefined;
                this.loadingFileUpload = false;
            }
        }
        return "";
    }

    loadBlogPostDetails = async (id: string) => {
        this.loadingPostDetails = true;
        try{
            const incomingPost = await agent.BlogPost.details(id, store.accountStore.requestConfig);
            runInAction(() => {
                this.loadedPostDetails = incomingPost;
                this.loadingPostDetails = false;
            })
        }
        catch(error){
            console.log(error);
            this.loadingPostDetails = false;
        }
    }

    loadBlogPosts = async () => {
        this.loadingInital = true;
        try{
            const incomingPosts = await agent.BlogPost.list();
            runInAction(() => {
                this.loadedBlogPosts = incomingPosts;
                this.loadingInital = false;
            })
        }
        catch(error){
            console.log(error);
            this.loadingInital = false;
        }
    }

    createPost = async (postData: IBlogPost) => {
        this.loadingFormSubmission = true;
        console.log(postData.id);
        try{
            await agent.BlogPost.create(postData, store.accountStore.requestConfig);
            runInAction(() => {
                this.loadedBlogPosts.push(postData);
                this.loadingFormSubmission = false;
            })
        }
        catch(error){
            console.log(error);
            this.loadingFormSubmission = false;
        }
    }

    updatePost = async (postData: IBlogPost) => {
        this.loadingFormSubmission = true;
        try{
            await agent.BlogPost.update(postData, store.accountStore.requestConfig);
            runInAction(() => {
                for(let i = 0; i < this.loadedBlogPosts.length; i++){
                    if(this.loadedBlogPosts[i].id === postData.id){
                        this.loadedBlogPosts[i] = postData;
                    }
                }
                this.loadingFormSubmission = false;
            })
        }
        catch(error){
            console.log(error);
            this.loadingFormSubmission = false;
        }
    }

    deletePost = async (id: string) => {
        this.loadingDelete = true;
        try{
            await agent.BlogPost.delete(id, store.accountStore.requestConfig);
            runInAction(() => {
                for(let i = 0; i < this.loadedBlogPosts.length; i++){
                    if(this.loadedBlogPosts[i].id === id){
                        this.loadedBlogPosts.splice(i, 1);
                    }
                }
                this.loadingDelete = false;
            })
        }
        catch(error){
            console.log(error);
            this.loadingDelete = false;
        }
    }
}