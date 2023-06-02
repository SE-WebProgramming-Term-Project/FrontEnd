
import './css/ChangeInform.css';

function ChangeInform() {
  return (
    <div className="changeInformContainer">
      <div className='changeHedder'>
        나의 기본정보
      </div>
      <div className='myInform'>
        <div className='inputbox'>
            <input className='nameinput' type='text' disabled placeholder='이름'></input>
        </div>
        <div className='inputbox'>
            <input className='idinput' type='text' disabled placeholder='아이디'></input>
        </div>
        <div className='inputbox'>
            <input className='pwinput' type='text' placeholder='비번'></input>
        </div>
        <div className='inputbox'>
            <input className='repwinput' type='text' placeholder='비밀번호 확인(8~16자리 영문/숫자 조합)'></input>
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
            <input className='birthinput' type='text' placeholder='생년월일'></input>
            <div className='emailInput'>
                <input className='leftemail' type='text'></input>
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
                <input className='address' type='address' disabled placeholder='주소'></input>
                <span className='searchaddress'>주소찾기</span>
                </div>
                <div className='inputbox'>
                <input className='streetaddress' type='text' disabled placeholder='상세주소'></input>
                </div>
            </div>
        </div>
        <div className='subBtn'>
            <div className='cancelbtn'>취소</div>
            <div className='okbtn'>확인</div>
        </div>
      </div>
    </div>
  );
}

export default ChangeInform;
