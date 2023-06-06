
import './css/UserMypage.css';
import Nav from "../Nav/Nav";
import React from "react";
import ChangeInform from "../ChangeInform/ChangeInform";

function UserMypage() {
  return (
    <div>
        <Nav/>

    <div className="MypageContainer">
       
      <div className='mypagehedder'>
        마이페이지
      </div>
      <div className='tab'>
        <div className='tabTitle'>
            <div className='tabtext'>주문내역</div>
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
            <div className='tabtext'>정보수정</div>
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
