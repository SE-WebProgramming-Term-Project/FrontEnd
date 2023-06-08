import './css/Login.css';
import Nav from '../Nav/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 

function Login() {

  const [id,setId] = useState();
  const [pw,setpw] = useState();
  const handleidChange = (e) =>{
    setId(e.target.value)
  }
  const handlepwChange = (e) =>{
    setpw(e.target.value)
  }
  const sendLogin = () => {
    let data = {
      id: id,
      pw: pw
    }
    axios.post("/json/user.json" , data)
    .then(response => {
        console.log('Data sent successfully!', response);
        localStorage.setItem('id', id)
      })
      .catch(error => {
        alert("로그인에 실패하였습니다.")
      });
}


  return (
    <div className="login">
      <Nav/>
      <div className='loginMain'>
        <div className='maintext'>로그인</div>
      </div>
      <div className='mainTab'>
        <div>
            <div className='tabMenu'>
                <div className='tabCon'>회원로그인</div>
                <div className='tabCon'>비회원주문</div>
                <div className='tabCon'>비회원주문조회</div>
            </div>
        </div>
        <div className='loginCon'>
            <div>
                <div className='conText'>알볼로 여행을 위해<br/><span className='blueConText'>로그인</span>을 해주세요 :)</div>
            </div>
            <div>
                <div className='loginArea'>
                    <div><input className='input' type='text' onChange={handleidChange}></input></div>
                    <div><input className='input' type='password' onChange={handlepwChange}></input></div>
                </div>
            </div>
            <div>
                
                <div className='btnarea'>
                    <div className='btnlogin' onClick={sendLogin}>로그인</div>
                    <div className='btnPhonelogin' >휴대폰번호로 로그인</div>
                </div>
                
            </div>
        </div>

      </div>

    </div>
  );
}

export default Login;
