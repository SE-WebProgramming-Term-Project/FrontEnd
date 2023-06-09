
import './css/UserMypage.css';
import Nav from "../Nav/Nav";
import React from "react";
import ChangeInform from "../ChangeInform/ChangeInform";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';

function UserMypage() {
    const navigate = useNavigate();
    let data = []
    let idx =0
    // const handleOrderHistoryClick = () => {
    //   axios
    //     .get("/json/order.json", { id: "bb" })
    //     .then((response) => {
    //       const orders = response.data;
    
    //       orders.forEach((order) => {
    //         data[idx] = order;
    //         idx++;
    //       });
    
    //       navigate("/OrderHistory", { state: data });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // };

    const handleOrderHistoryClick = () => {
      localStorage.getItem("id") != null ? 
      navigate("/OrderHistory"):
      navigate("/Login")
      
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
        <div id='tabTitle'>
            <div className='tabtext'onClick={()=>handleOrderHistoryClick()}>주문내역</div>
        </div>
        <div id='tabTitle'>
            <div className='tabtext'>쿠폰함</div>
        </div>
        <div id='tabTitle'>
            <div className='tabtext'>MY CLASS</div>
        </div>
        <div id='tabTitle'>
            <div className='tabtext'>비행기스탬프</div>
        </div>
        <div id='tabTitle'>
            <div className='tabtext'onClick={()=>handleChangeInform()}>정보수정</div>
        </div>
        <div id='tabTitle'>
            <div className='tabtext'>회원탈퇴</div>
        </div>
      </div>
      </div>
    </div>
    
  );
  }


export default UserMypage;
