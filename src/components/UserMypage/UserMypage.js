
import './css/UserMypage.css';
import Nav from "../Nav/Nav";
import React from "react";
import ChangeInform from "../ChangeInform/ChangeInform";
import {useNavigate} from "react-router-dom";

function UserMypage() {
    const navigate = useNavigate();

    const handleOrderHistoryClick = () =>{
        navigate("/OrderHistory")
    }
    const handleChangeInform = () =>{
        navigate("/ChangeInform")
    }
  return (

    <div>
        <Nav/>

    <div className="MypageContainer">
       
      <div className='mypagehedder'>
        마이페이지
      </div>
      <div className='tab'>
        <div className='tabTitle'>
            <div className='tabtext'onClick={()=>handleOrderHistoryClick()}>주문내역</div>
        </div>
        <div className='tabTitle'>
            <div className='tabtext'>쿠폰함</div>
        </div>
        <div className='tabTitle'>
            <div className='tabtext'>MY CLASS</div>
        </div>
        <div className='tabTitle'>
            <div className='tabtext'>비행기스탬프</div>
        </div>
        <div className='tabTitle'>
            <div className='tabtext'onClick={()=>handleChangeInform()}>정보수정</div>
        </div>
        <div className='tabTitle'>
            <div className='tabtext'>회원탈퇴</div>
        </div>
      </div>
      </div>
        <ChangeInform/>
    </div>
    
  );
}

export default UserMypage;
