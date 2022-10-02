import React from "react";
import { getServerSideProps } from ".";
import AdminPage from "../../components/AdminPage";

const ClubApplications = () => {
    return (
        <AdminPage path={"/admin/applications"} />
    );
};

export default ClubApplications;

