
import './css/Orderhistory.css';
import Review from '../Review/Review';
import Nav from '../Nav/Nav';
import UserMypage from '../UserMypage/UserMypage';
import { useEffect } from 'react';
import axios from 'axios';

function Orderhistory() {
  let data = []
  let idx =0

  useEffect(() =>{
    axios
    .get("/json/order.json", {id : "bb"} )
    .then((response) => {
      const orders = response.data;

        orders.map((order)=>{
          console.log(order);
          data[idx] = order
          console.log(data[idx])
          idx++
          console.log(data.length)
        })
    })
    .catch((error)=>{console.error()
    }
    )
    
    },[])
    
  return (
    
    <div className="Ordercontainer">
      {console.log("돔요소")}
      {console.log(data)}
      {console.log("data")}
      {console.log(idx)}
      <UserMypage/>
      {(data.length > 0) ?
      data.map(function(i){
        <div className='Orderinforcontainer'>
          <div className='inform'>
              <div className='title'>주문일자</div>
              <div className='inner'>{i.orderDate}</div>
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
          <Review data/>       
        </div>
        }): <span>주문내역이 없습니다.</span> }
    
    </div> 
  );
}

export default Orderhistory;
