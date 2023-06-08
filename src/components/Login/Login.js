import './css/Login.css';
import Nav from '../Nav/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 

function Login() {
  
  const [id,setId] = useState(0);
  const [pw,setpw] = useState(0);
  let data = {
    id: id,
    pw: pw
  }
  const handleidChange = (e) =>{
    setId(e.target.value)
  }
  const handlepwChange = (e) =>{
    setpw(e.target.value)
  }
  const sendLogin = () => {
    
    axios.post("/json/user.json" , id)
    .then(response => {
        console.log('Data sent successfully!', response);
        localStorage.setItem('id', id)
      })
      .catch(error => {
        console.log(id)
        alert("로그인에 실패하였습니다.")
      });
}
const sendLogin2 = () => {
  axios.get("/json/user.json",id)
  .then((response) => {
    if(response.data[0].pw == pw) {
      console.log(response);
      console.log("로그인에 성공했습니다.", response);
      localStorage.setItem('id', id);
    } else {
      console.log(pw);
      console.log(response.data.pw);
      console.log(response);
      console.log("로그인 실패");
      alert("로그인 실패!")
    }
  })
  .catch((err) => {
  console.log(err);
  })
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
                    <div className='btnlogin' onClick={sendLogin2}>로그인</div>
                    <div className='btnPhonelogin' >휴대폰번호로 로그인</div>
                </div>
                
            </div>
        </div>

      </div>

    </div>
  );
}

export default Login;
