import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./css/AdminPageMenuRegist.css";

function AdminPageMenuRegist() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [large, setLarge] = useState("");
  const [regular, setRegular] = useState("");
  const [matarials, setMatarials] = useState([]);
  const [img, setImg] = useState();
  const [fileName, setFileName] = useState("이미지 업로드");

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const tagChange = (e) => {
    setTag(e.target.value);
  };

  const categoryChange = (e) => {
    setCategory(e.target.value);
  };

  const largeChange = (e) => {
    setLarge(e.target.value);
  };

  const regularChange = (e) => {
    setRegular(e.target.value);
  };

  const matarialChange = (e, index) => {
    const newMatarials = [...matarials];
    newMatarials[index] = e.target.value;
    setMatarials(newMatarials);
  };

  const convertToBase64 = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setImg(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
    reader.readAsDataURL(img);
  };

  const fileChange = (e) => {
    setImg(e.target.files[0]);
    setFileName("" + e.target.files[0].name);

    convertToBase64();
  };

  const onFocus = (e) => {
    e.target.className = "focus";
  };

  const onBlur = (e) => {
    e.target.className = "";
  };

  const submit = () => {
    let now = new Date();
    let data = {
      title: title,
      category: category,
      large: large,
      regular: regular,
      metarial: matarials,
      img: img,
      tag: tag,
      update: now.toString(),
    };

    axios
      .post("http://localhost:5000/pizza/submit", data)
      .then((response) => {
        console.log("송신 완료!", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="admin-page-menuregist">
      <div className="admin-page-menuregist-container">
        <div className="top-text">메뉴 정보 입력</div>
        <div className="info-container">
          <form>
            <div className="alvolo-input">
              <input
                type="text"
                value={title}
                placeholder="메뉴명"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={titleChange}
              ></input>
            </div>
            <div className="alvolo-input">
              <input
                type="text"
                value={tag}
                placeholder="태그"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={tagChange}
              ></input>
            </div>
            <div className="alvolo-input">
              <select defaultValue="null" onChange={categoryChange}>
                <option value="null" disabled>
                  종류 선택
                </option>
                <option value="장인피자">장인피자</option>
                <option value="달인피자">달인피자</option>
                <option value="명품피자">명품피자</option>
              </select>
            </div>
            <div className="alvolo-input">
              <input
                type="number"
                value={large}
                placeholder="라지 가격"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={largeChange}
              ></input>
            </div>
            <div className="alvolo-input">
              <input
                type="number"
                value={regular}
                placeholder="레귤러 가격"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={regularChange}
              ></input>
            </div>
            <div className="alvolo-input">
              {matarials.map((matarials, index) => (
                <input
                  key={index}
                  type="text"
                  value={matarials}
                  placeholder={`토핑${index + 1}`}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={(e) => matarialChange(e, index)}
                />
              ))}
            </div>
            <div className="file-upload">
              <input
                className="image-placeholder"
                placeholder={fileName}
                disabled
              ></input>
              <label className="btn" htmlFor="file-upload">
                업로드
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={fileChange}
              ></input>
            </div>
            <div className="btn-area">
              <Link to="/">
                <div className="btn-cancel">취소</div>
                <div className="btn-ok" onClick={submit}>
                  확인
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPageMenuRegist;
