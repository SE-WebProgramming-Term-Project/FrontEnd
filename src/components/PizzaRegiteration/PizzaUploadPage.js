import './css/PizzaUploadPage.css';
import React, { useState } from 'react';

function PizzaRegistration() {
  const [pizzaName, setPizzaName] = useState('');
  const [largeSizePrice, setLargeSizePrice] = useState('');
  const [regularSizePrice, setRegularSizePrice] = useState('');
  const [tags, setTags] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [image, setImage] = useState(null);

  const handlePizzaNameChange = (event) => {
    setPizzaName(event.target.value);
  };

  const handleLargeSizePriceChange = (event) => {
    setLargeSizePrice(event.target.value);
  };

  const handleRegularSizePriceChange = (event) => {
    setRegularSizePrice(event.target.value);
  };

  const handleTagChange = (event) => {
    const selectedTags = Array.from(event.target.selectedOptions, (option) => option.value);
    setTags(selectedTags);
  };

  const handleKeywordChange = (event) => {
    const selectedKeywords = Array.from(event.target.selectedOptions, (option) => option.value);
    setKeywords(selectedKeywords);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handlePizzaSubmit = (event) => {
    event.preventDefault();
    // 등록된 피자 정보를 처리하는 로직 추가
    console.log('피자 등록:', pizzaName, largeSizePrice, regularSizePrice, tags, keywords, image);
    // 등록 후 필드 초기화
    setPizzaName('');
    setLargeSizePrice('');
    setRegularSizePrice('');
    setTags([]);
    setKeywords([]);
    setImage(null);
  };

  return (
    <div>
      <h2>피자 등록</h2>
      <form onSubmit={handlePizzaSubmit}>
        <label>
          피자 이름:
          <input type="text" value={pizzaName} onChange={handlePizzaNameChange} />
        </label>
        <br />
        <label>
          라지 사이즈 가격:
          <input type="text" value={largeSizePrice} onChange={handleLargeSizePriceChange} />
        </label>
        <br />
        <label>
          레귤러 사이즈 가격:
          <input type="text" value={regularSizePrice} onChange={handleRegularSizePriceChange} />
        </label>
        <br />
        <label>
          태그:
          <select multiple value={tags} onChange={handleTagChange}>
            <option value="태그 1">태그 1</option>
            <option value="태그 2">태그 2</option>
            <option value="태그 3">태그 3</option>
          </select>
        </label>
        <br />
        <label>
          키워드:
          <select multiple value={keywords} onChange={handleKeywordChange}>
            <option value="키워드 1">키워드 1</option>
            <option value="키워드 2">키워드 2</option>
            <option value="키워드 3">키워드 3</option>
          </select>
        </label>
        <br />
        <label>
          이미지:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default PizzaRegistration;
