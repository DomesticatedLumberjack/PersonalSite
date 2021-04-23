import React from "react";
import { useStore } from "../../app/Stores/store";
import { Loading } from "../Loading/Loading";
import AdminBlogDashboard from "./Blog/AdminBlogDashboard";

export const AdminDashboard: React.FC = () => {
    const {accountStore} = useStore();
    const {currentUser} = accountStore;

    if(currentUser === undefined)
        return(<Loading/>)

    return(
        <>
            <AdminBlogDashboard/>
        </>
    )
}

