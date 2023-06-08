
import './css/Orderhistory.css';
import Review from '../Review/Review';
import Nav from '../Nav/Nav';
import UserMypage from '../UserMypage/UserMypage';
import { useEffect } from 'react';
import axios from 'axios';

function Orderhistory() {
  let data ={}


  useEffect(() =>{
    axios
    .get("/json/user.json", {id : "bb"} )
    .then((response) => {
        response.data.map((i)=>{
          data[i] = {...response.data[i]}
        })
    })
    .catch((error)=>{console.error()
    }
    )},[])
    console.log(data)
  return (
    <div className="Ordercontainer">
      
      <UserMypage/>
      {data.length > 0?
      data.map(function(i){
        <div className='Orderinforcontainer'>
          <div className='inform'>
              <div className='title'>주문일자</div>
              <div className='inner'>{data[i].orderDate}</div>
          </div>
          <div className='inform'>
              <div className='title'>주문메뉴</div>
              <div className='inner'>{data[i].orderMenu}</div>
          </div>
          <div className='inform'>
              <div className='title'>결제금액</div>
              <div className='inner'>{data[i].totalPrice}</div>
          </div>
          <div className='inform'>
              <div className='title'>배달지정보</div>
              <div className='inner'>{data[i].dest}</div>
          </div>
          <div className='inform'>
              <div className='title'>주문매장</div>
              <div className='inner'>{data[i].store}</div>
          </div>
          <Review/> 
        </div>
        })
      
      
  : <span>주문내역이 없습니다.</span>}
    
    </div>
  );
}

export default Orderhistory;
