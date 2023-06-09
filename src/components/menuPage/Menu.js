
import React, { useState, useEffect } from "react";
import Pagination from "./MenuPazination";
import Menu_header from "./Menu_header";
import './css/Menu.css'
import { useNavigate, useLocation  } from "react-router-dom";
import axios from "axios";
import Nav from"../Nav/Nav"
function Posts() {
  const [posts, setPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const [kategorie, setKategorie] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [totalPosts, setTotalPosts] = useState(0);
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation(); // useLocation 추가
  const formatPrice = (price) => { //1000단위 
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleDetailClick = (pizzaInfo) => {
    console.log(pizzaInfo);
    navigate("/detail", { state: { pizzaInfo } });
  };



  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleCartClick = (pizza) => {
    alert('장바구니에 추가하였습니다.');
    const updatedCartItems = Array.isArray(cartItems) ? [...cartItems, pizza] : [pizza];
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    console.log(localStorage.getItem('cart'));
  };

  useEffect(() => {
    axios.get("http://localhost:5000/pizza/findAll").then((response) => {
      setPosts(response.data.pizzaData);
      setOriginalPosts(response.data.pizzaData);
      setTotalPosts(response.data.pizzaData.length);
    });
  }, []);

  useEffect(() => {
  let sortedPosts = [...originalPosts];

  if (selectedCategory !== "전체") {
    sortedPosts = sortedPosts.filter((post) => post.category === selectedCategory);
  }

  if (kategorie === 1) {
    sortedPosts = sortedPosts.sort((a, b) => {
      const dateA = new Date(a.update);
      const dateB = new Date(b.update);
      return dateB - dateA;
    });
  }else if (kategorie === 2) {
    sortedPosts = sortedPosts.sort((a, b) => parseInt(a.large) - parseInt(b.large));
  } else if (kategorie === 3) {
    sortedPosts = sortedPosts.sort((a, b) => parseInt(b.large) - parseInt(a.large));
  }

  setPosts(sortedPosts);
  setPage(1);
  setTotalPosts(originalPosts.length)
  console.log("실행")
}, [kategorie, selectedCategory, originalPosts]);

  useEffect(() => {
    const tds = document.querySelectorAll(".kategorie_bar td");
    tds.forEach((td) => {
      if (td.textContent === selectedCategory) {
        td.classList.add("selected");
      } else {
        td.classList.remove("selected");
      }
    });

    setPage(1);
setKategorie(1);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPosts(originalPosts);


if(category === "전체"){
      window.location.reload();
    }    const tds = document.querySelectorAll(".kategorie_bar td");
    tds.forEach((td) => {
      if (td.textContent === category) {
        td.classList.add("selected");
      } else {
        td.classList.remove("selected");
      }
    });

    setPage(1);
  };

  useEffect(() => {
    let filteredPosts = [...posts];

    if (selectedCategory !== "전체") {
      filteredPosts = filteredPosts.filter(
          (post) => post.category === selectedCategory
      );
    }

    setTotalPosts(filteredPosts.length);
    setPosts(filteredPosts);
  }, [selectedCategory]);

  return (
      <div className="Layout">
        <header id="menu_header">
          <Nav/>

        </header>

        <main>
          <Menu_header></Menu_header>
          <div className="container" id="menu_container">
            <table className="kategorie_bar">
              <tbody>
              <tr>
                <td
                    className={selectedCategory === "전체" ? "selected" : ""}
                    onClick={() => handleCategoryClick("전체")}
                >
                  전체
                </td>
                <td
                    className={selectedCategory === "장인피자" ? "selected" : ""}
                    onClick={() => handleCategoryClick("장인피자")}
                >
                  장인피자
                </td>
                <td
                    className={selectedCategory === "달인피자" ? "selected" : ""}
                    onClick={() => handleCategoryClick("달인피자")}
                >
                  달인피자
                </td>
                <td
                    className={selectedCategory === "명품피자" ? "selected" : ""}
                    onClick={() => handleCategoryClick("명품피자")}
                >
                  명품피자
                </td>
              </tr>
              </tbody>
            </table>
            <div className="lable_container">
              <div className="spaceEmpty"></div>
              <label>
                <select
                    type="number"
                    value={kategorie}
                    onChange={(event) => {
                      if (selectedCategory === "전체") {
                        setKategorie(Number(event.target.value));
                      }
                    }}
                    disabled={selectedCategory !== "전체"}
                >
                  <option value="1">신제품순</option>
                  <option value="2">가격낮은순</option>
                  <option value="3">가격높은순</option>
                </select>
              </label>
            </div>
            <div className="pizza_container">

            {posts
                .filter((post) =>
                    selectedCategory === "전체"
                        ? true
                        : post.category === selectedCategory
                )
                .slice(offset, offset + limit)
                .map(({ _id, img, title, tag, large, update, category, regular, metarial, count }) => (
                    <div className="pizzaMenu" key={_id}>
                      <img src={img} alt="피자 이미지"></img>
                      <div className="explane">
                        <div className="info_header">
                          <h5 className="pizza_title">{title}</h5>
                          <h6>{tag}</h6>
                        </div>

                        <div className="price">
                          <div className="price_set">
                            <h5 className="large">L</h5>
                            <h5 className="cost">{formatPrice(large)}</h5>
                          </div>
                          <div className="price_set">
                            <h5 className="large">R</h5>
                            <h5 className="cost">{formatPrice(regular)}</h5>
                          </div>
                        </div>
                        <div className="metarials">
                          {metarial.map((item, index) => (
                              <h6 className="metarial" key={index}>{item}</h6>
                          ))}
                        </div>
                      </div>
                      <div className="link">
                        <div className="goto" >

                          <div className="info" onClick={() => handleDetailClick({ _id, img, title, tag, large, update, category, regular, metarial, count })}>
                            <img src="img/돋보기.png"
                              alt="리뷰보기"></img>리뷰보기
                          </div>

                          <div className="cart" onClick={() => handleCartClick({_id, img, title, tag, large, update, category, regular, metarial, count })}>
                            <img src="img/장바구니.png"
                                 alt="장바구니"></img>장바구니
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
            </div>
          </div>
        </main>
        <footer id="menu_footer">
          <Pagination
              total={totalPosts}
              limit={limit}
              page={page}
              kategorie={kategorie}
              setPage={setPage}
          />

        </footer>
      </div>
  );

}
export default Posts;