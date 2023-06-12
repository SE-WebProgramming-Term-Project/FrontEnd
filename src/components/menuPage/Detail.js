import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Menu_header from "./Menu_header";
import "./css/Detail.css";
import "./css/Menu_header.css";
import Nav from "../Nav/Nav";
import MenuPazination from "./MenuPazination";
import axios from "axios";

function Detail() {
  const location = useLocation();
  const pizzaInfo = location.state.pizzaInfo;
  console.log(pizzaInfo);
  const [detail, setDetail] = useState([]);
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const formatPrice = (price) => { //1000단위 
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
 

  useEffect(() => {
    axios
      .get("http://localhost:5000/review/view", {
        params: { pizzaId: pizzaInfo._id },
      })
      .then((response) => {
        const { reviewData } = response.data;
        setDetail(reviewData);
        console.log(detail);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pizzaInfo.id]);

  console.log(detail);

  return (
    <div className="detail_container">
      <header id="detail_header">
        <Nav />
        <Menu_header/>
      </header>
      <main id="detail_main">
        <img className="detail_img" src={pizzaInfo.img} alt={pizzaInfo.title} />
        <div className="explaneDetail">
          <h3>{pizzaInfo.title}</h3>
          <h6>{pizzaInfo.tag}</h6>
          <div className="price">
            <div className="price_set">
              <h5 className="large">L</h5>
              <h5 className="cost">{formatPrice(pizzaInfo.large)}</h5>
            </div>
            <div className="price_set">
              <h5 className="large">R</h5>
              <h5 className="cost">{formatPrice(pizzaInfo.regular)}</h5>
            </div>


          </div>
        </div>
      </main>
      <footer id="detail_footer">
        <table className="detail_kategorie_bar">
          <thead>
            <tr>
              <th>별점</th>
              <th>리뷰</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {/* Render the reviews */}
            {detail != undefined && detail.length > 0 ? (
              detail
                .slice(offset, offset + limit)
                .map(({ _id, score, evaluation, author }) => (
                  <tr key={_id}>
                    <td>{score}</td>
                    <td>{evaluation}</td>
                    <td>{author}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td></td>
                <td>리뷰가 존재하지 않습니다!</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
        {detail != undefined && detail.length > 0 ? (
          <MenuPazination
            total={detail.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        ) : (
          <span></span>
        )}
      </footer>
    </div>
  );
}

export default Detail;
