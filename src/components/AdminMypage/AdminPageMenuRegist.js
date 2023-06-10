import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./css/AdminPageMenuRegist.css";

function AdminPageMenuRegist() {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    category: "",
    large: "",
    regular: "",
    matarials: [],
    img: null,
    fileName: "이미지 업로드",
  });

  const { title, tag, category, large, regular, matarials, img, fileName } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleMatarialChange = (e) => {
    const value = e.target.value;
    const matarialsArray = value.split(",").map((item) => item.trim());
    setFormData((prevState) => ({ ...prevState, matarials: matarialsArray }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile instanceof Blob) {
      setFormData((prevState) => ({ ...prevState, img: selectedFile, fileName: selectedFile.name }));
    } else {
      console.error("Invalid file selected.");
    }
  };

  const onFocus = (e) => {
    e.target.className = "focus";
  };

  const onBlur = (e) => {
    e.target.className = "";
  };

  const submit = () => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        sendData(base64Data);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
      reader.readAsDataURL(img);
    } else {
      sendData(null);
    }
  };

  const sendData = (base64Data) => {
    let now = new Date();
    let data = {
      title,
      category,
      large,
      regular,
      metarial: matarials,
      img: base64Data,
      tag,
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
                name="title"
                value={title}
                placeholder="메뉴명"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleInputChange}
              />
            </div>
            <div className="alvolo-input">
              <input
                type="text"
                name="tag"
                value={tag}
                placeholder="태그"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleInputChange}
              />
            </div>
            <div className="alvolo-input">
              <select name="category" defaultValue="null" onChange={handleInputChange}>
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
                type="text"
                name="large"
                value={large}
                placeholder="라지 사이즈 가격"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleInputChange}
              />
            </div>
            <div className="alvolo-input">
              <input
                type="text"
                name="regular"
                value={regular}
                placeholder="레귤러 사이즈 가격"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleInputChange}
              />
            </div>
            <div className="alvolo-input">
              <input
                type="text"
                name="matarials"
                value={matarials}
                placeholder="키워드 (쉼표로 구분)"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleMatarialChange}
              />
            </div>
            <div className="file-upload">
              <input
                className="image-placeholder"
                placeholder={fileName}
                disabled
              />
              <label className="file-upload-btn" htmlFor="file-upload">
                업로드
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
              />
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
