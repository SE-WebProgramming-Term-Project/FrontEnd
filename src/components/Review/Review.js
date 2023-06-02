
import './css/Review.css';

function Review() {
  return (
    <div className="reviewcontainer">
        <div className='starcon'>
      <input className='star' type='number'></input>
      </div>
      <div className='textcon'>
      <textarea className='reviewText'></textarea>
      </div>
      <div className='btncon'>
      <input className='submitbtn' type='submit'></input>
      </div> 
    </div>
  );
}

export default Review;
