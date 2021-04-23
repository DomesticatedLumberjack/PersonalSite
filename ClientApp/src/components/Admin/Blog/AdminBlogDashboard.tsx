import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Loading } from '../../Loading/Loading';
import { ListGroup, Button } from 'react-bootstrap';
import AdminBlogPost from './AdminBlogPost';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../../app/Stores/store';
import { observer } from 'mobx-react-lite';

const AdminBlogDashboard: React.FC = () => {
    const {blogStore} = useStore();
    const {loadingInital, blogPostsByDate} = blogStore;

    if(loadingInital)
        return(<Loading/>)

    return(
        <>
            <Button as={NavLink} to="/admin/createpost" variant="success">New Post</Button>
            <ul/>
            <ListGroup className="border-bottom box-shadow mb-3">
                {blogPostsByDate.map((post) => (
                    <AdminBlogPost post={post} key={post.id}/>
                ))}
            </ListGroup>
        </>
    )
}

export default observer(AdminBlogDashboard);