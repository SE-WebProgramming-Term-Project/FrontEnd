import './css/Login.css';

function Login() {
  return (
    <div className="login">
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
                    <div><input className='input' type='text'></input></div>
                    <div><input className='input' type='password'></input></div>
                </div>
            </div>
            <div>
                
                <div className='btnarea'>
                    <div className='btnlogin'>로그인</div>
                    <div className='btnPhonelogin'>휴대폰번호로 로그인</div>
                </div>
                
            </div>
        </div>

      </div>

    </div>
  );
}

export default Login;
