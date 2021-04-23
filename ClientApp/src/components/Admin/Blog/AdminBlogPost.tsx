import { observer } from "mobx-react-lite";
import React, { useState } from "react"
import { Button, ListGroup, Modal } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { IBlogPost } from "../../../app/Domain/IBlogPost";
import { useStore } from "../../../app/Stores/store";


const AdminBlogPost: React.FC<{post: IBlogPost}> = ({post}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const closeConfirm = () => setShowConfirm(false);
    const openConfirm = () => setShowConfirm(true);

    const {blogStore} = useStore();
    const {deletePost} = blogStore;

   const deleteItem = async () => {
        closeConfirm();
        deletePost(post.id).then();
    }

    return(
        <>
            <Modal centered show={showConfirm} onHide={closeConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete post "{post.title}"?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeConfirm}>
                    Close
                </Button>
                <Button variant="primary" onClick={deleteItem}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>

            <ListGroup.Item>
                {post.title}
                <div style={{float: "right"}}>
                    <Button as={NavLink} to={`/admin/managepost/${post.id}`} style={{marginRight: '10px'}} variant="dark">Details</Button>
                    <Button variant="danger" onClick={openConfirm}>Delete</Button>
                </div>
                <ul/>
            </ListGroup.Item>
        </>
    );
}

export default observer(AdminBlogPost);