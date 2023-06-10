
import './css/Orderhistory.css';
import Review from '../Review/Review';
import Nav from '../Nav/Nav';
import UserMypage from '../UserMypage/UserMypage';
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'

function Orderhistory() {
 const location = useLocation()
 const data = location.state
 console.log("props")
 console.log(data)
 let menuname = []
 let idx = 0
 
 useEffect(() => {
  props.data.map((i)=>{axios
    .get("http://localhost:5000/user/view", {
      params: { id : {$in: i.orderMenu }
    }})
    .then((response) => {
      menuname[idx]+=response.data.title+" "
    })
    .catch((error) => {
      console.log(error);
    })
    idx++
  })
  idx = 0
}, [])

    
 return (
  <div className="Ordercontainer">
    <UserMypage />
    {console.log(data.length)}
    {data.length > 0 ? (
      data.map((i) => (
        <div className="Orderinforcontainer" key={i.id}>
          <div className="inform">
            <div className="title">주문일자</div>
            <div className="inner">{i.orderDate}</div>
          </div>
          <div className="inform">
            <div className="title">주문메뉴</div>
            <div className="inner">{menuname[idx]}</div>
          </div>
          <div className="inform">
            <div className="title">결제금액</div>
            <div className="inner">{i.totalPrice}</div>
          </div>
          <div className="inform">
            <div className="title">배달지정보</div>
            <div className="inner">{i.dest}</div>
          </div>
          <div className="inform">
            <div className="title">주문매장</div>
            <div className="inner">{i.store}</div>
          </div>
          <Review data={i} />
        </div>
        
      )),idx++
    ) : (
      <span>주문내역이 없습니다.</span>
    )}
  </div>
);

}

export default Orderhistory;
