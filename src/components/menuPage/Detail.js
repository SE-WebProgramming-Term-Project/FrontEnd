import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import Menu_header from "./Menu_header";
import "./css/Detail.css";
import "./css/Menu_header.css";
import Nav from"../Nav/Nav"
import review from"../../../public/json/review.json"
import MenuPazination from "./MenuPazination";
function Detail() {
    const location = useLocation();
    const pizzaInfo = location.state.pizzaInfo;
    console.log(pizzaInfo)
    const [Detail, setDetail] = useState([]);
    const [limit, setLimit] = useState(2);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;


    useEffect(() => {
        const filteredReviews = review.filter((review) => review.pizzaId === pizzaInfo.id);
        setDetail(filteredReviews);
    }, [pizzaInfo.id]);


    return (

        <div>
            <header id="detail_header">
                <Nav/>
                <Menu_header/>
            </header>
            <main id="detail_main">
                <img className="detail_img" src={pizzaInfo.img}></img>
                <div className="explane">
                    <h3>{pizzaInfo.title}</h3>
                    <h6>{pizzaInfo.tag}</h6>
                    <div className="price">
                        <h5 className="large">L</h5>
                        <h5 className="cost">{pizzaInfo.large}</h5>
                        <h5 className="large">R</h5>
                        <h5 className="cost">{pizzaInfo.reguler}</h5>
                    </div>
                </div>
            </main>
            <footer id="detail_footer">
                <table className="detail_kategorie_bar">
                   <tr>
                       <td>
                           별점
                       </td>
                       <td>
                          리뷰
                       </td>
                       <td>
                           작성자
                       </td>
                   </tr>
                </table>
            </footer>

        </div>
    );
}

export default Detail;
