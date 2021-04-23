import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IBlogPost } from "../../app/Domain/IBlogPost";
import { Button, Form, Jumbotron } from "react-bootstrap";
import {v4 as uuid} from 'uuid';
import { useStore } from "../../app/Stores/store";
import { observer } from "mobx-react-lite";

interface DetailParams {
    id: string
}

const BlogForm: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const [post, setPost] = useState<IBlogPost>({
        id: "",
        title: "",
        content: "",
        date: new Date(),
        imagePaths: ""
    });
    const [validated, setValidated] = useState(false);
    const [readyToSubmit, setSubmitStatus] = useState(false);
    const [fileFormText, setFileFormText] = useState<string>("Attach image");

    const {blogStore} = useStore();
    const {createPost, updatePost, loadingFormSubmission, loadFile, uploadFile, loadBlogPostDetails, loadedPostDetails} = blogStore;

    

    const returnTitle = () => {
        if(match.params.id) return <h1>Edit Post</h1>
        else return <h1>Create Post</h1>
    }

    const handleValidation = (e: any) => {
        const form = e.currentTarget;
        if(form.checkValidity() === false){
            e.stopPropagation();
        }
        else setSubmitStatus(true);
        setValidated(true);
    } 

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(readyToSubmit){
            const formData = new FormData(e.target);
            const formDataObj = Object.fromEntries(formData.entries());

            const newFileName = await uploadFile(formDataObj.id.toString());
            
            const postData: IBlogPost = {
                id: formDataObj.id.toString(),
                title: formDataObj.title.toString(),
                content: formDataObj.content.toString(),
                date: new Date(formDataObj.date.toString()),
                imagePaths: newFileName
            }

            if(match.params.id){
                updatePost(postData).then(() => history.push("/blog"));
            }
            else{
                createPost(postData).then(() => history.push("/blog"));
            }
            
        }
    }

    const saveFile = (e: any) => {
        let eFile: File = e.target.files[0];
        let eFileName: string = e.target.files[0].name;
        if(eFileName.endsWith(".jpg") || eFileName.endsWith(".png") || eFileName.endsWith(".gif"))
        {
            loadFile(eFile, eFileName);
            setFileFormText(eFileName);
        }
        else
        {
            setFileFormText("Please select png, jpg, or gif");
        }
    }

    useEffect(() => {
        if(match.params.id){
            loadBlogPostDetails(match.params.id);
            if(loadedPostDetails !== null){
                setPost(loadedPostDetails);
            }
        }
        else{
            setPost({
                id: uuid(),
                title: "",
                content: "",
                date: new Date(),
                imagePaths: ""
            })
        }
    }, [match.params.id, loadedPostDetails, loadBlogPostDetails])

    return(
        <>
            <Jumbotron style={{backgroundColor: "#FFFFFF"}}>
                {returnTitle()}
                <ul/>
                <Form noValidate validated={validated} onSubmit={handleSubmit} onChange={handleValidation}>
                    <Form.Label>Post ID</Form.Label>
                    <Form.Control name="id" readOnly defaultValue={post.id} />
                    <ul/>
                    <Form.Label>Title</Form.Label>
                    <Form.Control required name="title" type="text" placeholder="Title" defaultValue={post.title} />
                    <ul/>
                    <Form.Label>Content</Form.Label>
                    <Form.Control required name="content" as="textarea" rows={10} placeholder="Content" defaultValue={post.content} />
                    <ul/>
                    <Form.Label>Date</Form.Label>
                    <Form.Control required name="date" type="datetime-local" defaultValue={post.date.toString().split(".")[0]} />
                    <ul/>
                    <Form.Label>Images</Form.Label>
                    <Form.File formNoValidate id="custom-file" label={fileFormText} custom onChange={saveFile}/>
                    <ul/>
                    <ul/>
                    <ul/>
                    <Button style={{float: "right", marginLeft: "10px"}} variant="success" type="submit" disabled={loadingFormSubmission}>
                        Submit
                    </Button>
                    <Button style={{float: "right"}} variant="secondary" onClick={() => history.push("/admin")}>
                        Cancel
                    </Button>
                </Form>
            </Jumbotron>
        </>
    )
};

export default observer(BlogForm);