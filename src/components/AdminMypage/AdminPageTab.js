import {Link, useLocation} from "react-router-dom";
import './css/AdminPageTab.css'

function AdminPageTab() {
    const location = useLocation();

    return (
        <div className="menutab-page-whole-div">
            <div className="menutab-page-menutab">
                <Link to="/adminPage/MenuRegist">
                    <div className="menutab-page-title">
                        <h5 className={location.pathname === "/adminPage/MenuRegist" ? "selected" : ""}>메뉴등록</h5>
                    </div>
                </Link>

                <Link to="/adminPage/Analysis">
                    <div className="menutab-page-title">
                        <h5 className={location.pathname === "/adminPage/Analysis"? "selected" : ""}>판매수량확인</h5>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default AdminPageTab;