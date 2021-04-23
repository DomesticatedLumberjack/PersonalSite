import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Loading } from '../Loading/Loading';
import { BlogPost } from './BlogPost';
import { useStore } from '../../app/Stores/store';
import { observer } from 'mobx-react-lite';

const BlogDashboard: React.FC = () => {
    const {blogStore} = useStore();
    const {loadingInital, blogPostsByDate} = blogStore;

    if(loadingInital) return(<Loading/>)

    return(
        <>
            {blogPostsByDate.map((post, index) => (
                <BlogPost post={post} index={index} key={post.id}/>
            ))}
        </>
    );
}

export default observer(BlogDashboard);
