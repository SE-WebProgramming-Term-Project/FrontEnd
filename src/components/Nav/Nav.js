
import './css/Nav.css';
import React, {useState} from "react"
import { useNavigate} from "react-router-dom";
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
function Nav() {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(true)
    const toggleMenu = () =>{
      setToggle(toggle => !toggle)
    }
    const handlePostsClick = () => {
        navigate("/Posts");
    };
    const handleMainClick = () =>{
        navigate("/");
    }

    const handleCartClick = () =>{
        navigate("/Cart")
    }
    const handleLoginClick = () =>{
      navigate("/Login")
    }
    const handleLogoutClick = () =>{
      localStorage.removeItem('id')
    }
    const handlUserMyPageClick = () =>{
      localStorage.getItem("id")!= null ? 
      navigate("/UserMypage"):
      navigate("/Login")
        
    }
    
    const handleOrderHistoryClick = () => {
      localStorage.getItem("id")!= null ? 
      navigate("/OrderHistory"):
      navigate("/Login")
      
        }
    const handleChangeInform = () =>{
      localStorage.getItem("id")!= null ? 
      navigate("/ChangeInform"):
      navigate("/Login")
      
    }
    
    const handleAdminMyPage = () => {
        navigate("/AdminMyPage")
    }
    /* Todo 임시로 넣은거임 */
    
  return (
    <div id='sjNavHeader'>
      <div className='wrapNav'>
            <div className = 'navLeft'>
                <img className='nav_btn' onClick ={()=>toggleMenu()} src ="./img/sidebutton.png"  />
                <img className='logo' src ="./img/logo.png" onClick={() => handleMainClick()}/>
            </div>
            <div className = 'navMid'>
              <span className='midText' onClick={() => handlePostsClick()}>피자</span>
              <span className='midText'>스페셜반반피자</span>
              <span className='midText'>세트</span>
              <span className='midText'>사이드</span>
              <span className='midText'>하프앤하프</span>
              <span className='midText'>멤버십˙제휴할인</span>
              <span className='midText'>이벤트</span>
            </div>
            <div className = 'navRight'>
              <div className='RigTextBox'>
                <span className='rightText' onClick={() => handlUserMyPageClick()}>마이페이지</span>
                <span className='rightText' onClick={() => handleAdminMyPage()}>회원가입</span>
                {/*  Todo 임시로 회원가입시 점주페이지로 가도록 함*/}
                {localStorage.getItem("id") ==null ?
                <span className='rightText' onClick={() => handleLoginClick()}>로그인</span>:
                <span className='rightText' onClick={() => handleLogoutClick()}>로그아웃</span>
                }
              </div>
              <div className='RigImgBox' onClick={() => handleCartClick()}><img className='rigImg' src='./img/p-icon.png'/></div>
            </div>
            <div className = {toggle ? "navTab activetoggle" : "navTab"} >
              <div className='tabContent'>
                <div className='wrapTabItem'>
                <div class="tabTitle" onClick={() => handlePostsClick()}>피자</div>
                <div class="tabItem" onClick={() => handlePostsClick()} >전체피자</div>
                <div class="tabItem">스폐셜반반피자</div>
                <div class="tabItem">세트메뉴</div>
                <div class="tabItem">하프앤하프</div>
                </div>
                <div className='wrapTabItem'>
                <div class="tabTitle">사이드메뉴</div>
                </div>
                <div className='wrapTabItem'>
                <div class="tabTitle">멤버십˙제휴할인</div>
                <div class="tabItem">멤버십 헤택</div>
                <div class="tabItem">통신사 제휴 할인</div>
                </div>
                <div className='wrapTabItem'>
                <div class="tabTitle">이벤트</div>
                </div>
                <div className='wrapTabItem'>
                <div class="tabTitle">매장찾기</div>
                <div class="tabItem">지역명 찾기</div>
                <div class="tabItem">매장명 찾기</div>
                <div class="tabItem">현위치 찾기</div>
                </div>
                <div className='wrapTabItem'>
                <div class="tabTitle" onClick={() => handlUserMyPageClick()}>마이페이지</div>
                <div class="tabItem" onClick={() => handleOrderHistoryClick()}>주문내역</div> {/*    Todo 이부분이 제대로 동작하지 않음*/}
                <div class="tabItem">쿠폰함</div>
                <div class="tabItem">MY CLASS</div>
                <div class="tabItem">비행기스탬프</div>
                <div class="tabItem" onClick={()=>handleChangeInform()}>정보수정</div>
                <div class="tabItem">회원탈퇴</div>
                </div>
                <div className='wrapTabItem'>
                <div class="tabTitle">주문하기</div>
                <div class="tabItem">배달주문하기</div>
                <div class="tabItem">포장주문하기</div>
                <div class="tabItem">간편주문</div>
                <div class="tabItem">E쿠폰</div>
                <div class="tabItem">선물하기</div>
                </div>
              </div>
            </div>
            </div>
            
    </div>
  );
}

export default Nav;
