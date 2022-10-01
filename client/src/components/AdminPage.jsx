import axios from "axios";
import React from "react";
import useSWR from "swr";

const AdminPage = ({path}) => {
    const fetcher = async (url) => {
        try{
            console.log("url", url)
            const result = await axios.get(url);
            return result.data;
        }catch(err){
            throw err.response.data;
        }
    };
    console.log(path)
    const {data, error} = useSWR(path, fetcher);
    console.log(data);
    return (
        <div className="flex">admin page</div>
    );
};

export default AdminPage;