import AdminPageHeader from './AdminPageHeader';
import AdminPageTab from './AdminPageTab';
import './css/AdminMyPage.css'
import {Routes, Route, useNavigate} from "react-router-dom";

function AdminMyPage() {
    const navigate = useNavigate();

    return (
        <div className="admin_page">
            <div className="admin_page_content">
                <AdminPageHeader/>
                <AdminPageTab/>
            </div>
        </div>
    )
}

export default AdminMyPage;