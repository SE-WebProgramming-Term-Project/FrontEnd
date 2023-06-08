
import './css/ChangeInform.css';
import UserMypage from '../UserMypage/UserMypage';
import axios from 'axios';
import { useEffect, useState } from 'react';


function ChangeInform() {
    const [name, setName] = useState()
    const [id, setId] = useState()
    const [pw, setpw] = useState()
    const [phone, setphone] = useState()
    const [birth, setbirth] = useState()
    const [email, setemail] = useState()
    const [addres, setaddres] =useState()
    const [detailadd, setdetail] =useState()
    let data = {}

    const handlepwChange = (e) =>{
        setaddres(e.target.value)
    }
    const handlephoneChange = (e) =>{
        setphone(e.target.value)
    }
    const handleemailChange = (e) =>{
        setemail(e.target.value)
    }
    const handleaddresChange = (e) =>{
        setaddres(e.target.value)
    }
    const handledetailChange = (e) =>{
        setdetail(e.target.value)
    }
    const sendUser = () => {
        axios.post("/json/user.json" , data)
        .then(response => {
            console.log('Data sent successfully!', response);
          })
          .catch(error => {
            console.error('Error sending data:', error);
          });
    }


    useEffect(() =>{
        axios
        .get("/json/user.json", {id : "bb"} )
        .then((response) => {
            data = response.data[0]
            
            console.log(data)
            setName( data.name)
            setId( data.id)
            setpw(data.pw)
            setphone(data.phone)
            setbirth(data.birth)
            setaddres(data.address)
            setdetail(data.detailAddress)
        })
        .catch((error)=>{console.error()
        }
        )},[])
        console.log(data)
  return (
    <div className="changeInformContainer">
    <UserMypage/>
      <div className='changeHedder'>
        나의 기본정보
      </div>
      <div className='myInform'>
        <div className='inputbox'>
            <input className='nameinput' type='text' disabled placeholder={name}></input>
        </div>
        <div className='inputbox'>
            <input className='idinput' type='text' disabled placeholder={id}></input>
        </div>
        <div className='inputbox'>
            <input className='pwinput' type='password' value={pw} onChange={handlepwChange}></input>
        </div>
        <div className='inputbox'>
            <input className='repwinput' type='password' placeholder='비밀번호 확인(8~16자리 영문/숫자 조합)'></input>
        </div>
        <div className='inputbox'>
            <select disabled className='leftnum'>
                <option className='010'>010</option>
                <option className='011'>011</option>
                <option className='016'>016</option>
                <option className='017'>017</option>
                <option className='019'>019</option>
            </select>
            <input className='rightnum' type='number' disabled></input>
            <span className='phonbtn'>수정</span>
        </div>
        <div className='informbox'>
            <input className='birthinput' type='text' placeholder={birth}></input>
            <div className='emailInput'>
                <input className='leftemail' type='text' onChange={handleemailChange}></input>
                @
                <select className='rightemail'>
                    <option>naver.com</option>
                    <option>daum.net</option>
                    <option>hotmaile.com</option>
                    <option>gmail.com</option>
                    <option>nate.com</option>
                    <option>직접입력</option>
                </select>
            </div>
            <div className='addressInput'>
                <div className='inputbox'>
                <input className='address' type='address' placeholder='주소' value={addres} onChange={handleaddresChange}></input>
                <span className='searchaddress'>주소찾기</span>
                </div>
                <div className='inputbox'>
                <input className='streetaddress' type='text' placeholder='상세주소' value={detailadd} onChange={handledetailChange} ></input>
                
                </div>
            </div>
        </div>
        <div className='subBtn'>
            <div className='cancelbtn'>취소</div>
            <div className='okbtn' onClick={sendUser}>확인</div>
        </div>
      </div>
    </div>
  );
}

export default ChangeInform;
