import AdminPageHeader from './AdminPageHeader';
import AdminPageTab from './AdminPageTab';
import './css/AdminMyPage.css'
import {Routes, Route} from "react-router-dom";
import AdminPageMenuRegist from "./AdminPageMenuRegist";
import AdminPageAnalysis from "./AdminPageAnalysis.js";

function AdminMyPage() {
    return (
        <div className="admin_page">
            <div className="admin_page_content">
                <AdminPageHeader/>
                <AdminPageTab/>
                <Routes>
                    <Route path="/MenuReg" element={<AdminPageMenuRegist/>}/>
                    <Route path="/Stats" element={<AdminPageAnalysis/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default AdminMyPage;