import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './css/Review.css';
import axios from 'axios';

const StarRating = ({ rating, handleRating }) => {
  return (
    <div className="starcon">
      {[1, 2, 3, 4, 5].map((value) => (
        <FontAwesomeIcon
          key={value}
          icon={faStar}
          className={`star ${value <= rating ? 'active' : ''}`}
          onClick={() => handleRating(value)}
        />
      ))}
    </div>
  );
};

const Review = (props) => {
  const [rating, setRating] = useState(0);
  const [txt, setTxt] = useState('');

  const handleRating = (value) => {
    setRating(value);
  };

  const handleTxtChange = (e) => {
    setTxt(e.target.value);
  };

  const sendReview = () => {
    const reviews = props.order.orderMenu.map((id) => ({
      score: rating,
      evaluation: txt,
      author: props.order.id,
      pizzaId: id,
    }));
    console.log(reviews)
    axios
      .post('http://localhost:5000/review/submit', reviews)
      .then((response) => {
        console.log('Data sent successfully!', response);
      })
      .catch((error) => {
        console.log(error);
      });
      props.order.isReviewed = true;
      console.log(props.order);

      axios
      .post('http://localhost:5000/order/update', props.order)
      .then((response) => {
        console.log('Data sent successfully!', response);
      })
      .catch((error) => {
        console.log(error);
      });

      window.location.reload();
  };

  return (
    <div className="reviewcontainer">
      <StarRating rating={rating} handleRating={handleRating} />
      <div className="textcon">
        <textarea className="reviewText" value={txt} onChange={handleTxtChange} />
      </div>
      <div className="btncon">
        <input className="submitbtn" type="submit" value="Submit" onClick={sendReview} />
      </div>
    </div>
  );
};

export default Review;