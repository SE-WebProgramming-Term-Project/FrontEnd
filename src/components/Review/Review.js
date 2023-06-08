
import { useState } from 'react';
import './css/Review.css';
import axios from 'axios';
const Review = (props)=> {
  const [number, setNum] = useState()
  const [txt, setTxt] = useState()

  const handlenum = (e) =>{
    setNum(e.target.value)
  }
  const handletxt = (e) =>{
    setTxt(e.target.value)
  }
  const sendReview = () => {
    let data = {
      ReviewNum : 1,
      score : number,
      reviewContent : txt,
      writer : props.id,
      product : props.orderMenu
    }
    axios.post("/json/user.json" , data)
    .then(response => {
        console.log('Data sent successfully!', response);
        
      })
      .catch(error => {
        
      });
}


  return (
    <div className="reviewcontainer">
        <div className='starcon'>
      <input className='star' type='number' onChange={handlenum}></input>
      </div>
      <div className='textcon'>
      <textarea className='reviewText' onChange={handletxt}></textarea>
      </div>
      <div className='btncon'>
      <input className='submitbtn' type='submit' onClick={sendReview}></input>
      </div> 
    </div>
  );
}


export default Review;
