
import './css/Orderhistory.css';
import Review from '../Review/Review';

function Orderhistory() {
  return (
    <div className="Ordercontainer">
      <div className='Orderinforcontainer'>
        <div className='inform'>
            <div className='title'>주문일자</div>
            <div className='inner'></div>
        </div>
        <div className='inform'>
            <div className='title'>주문메뉴</div>
            <div className='inner'></div>
        </div>
        <div className='inform'>
            <div className='title'>결제금액</div>
            <div className='inner'></div>
        </div>
        <div className='inform'>
            <div className='title'>배달지정보</div>
            <div className='inner'></div>
        </div>
        <div className='inform'>
            <div className='title'>주문매장</div>
            <div className='inner'></div>
        </div>
      </div>
      <Review/> 
    </div>
  );
}

export default Orderhistory;
