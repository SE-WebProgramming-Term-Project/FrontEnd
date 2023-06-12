import "./css/ChangeInform.css";
import UserMypage from "../UserMypage/UserMypage";
import axios from "axios";
import { useEffect, useState } from "react";

function ChangeInform() {
  let rightnum;
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [pw, setpw] = useState();
  const [phone, setphone] = useState();
  const [rigphone, setrigphone] = useState();
  const [birth, setbirth] = useState();
  const [email, setemail] = useState();
  const [addres, setaddres] = useState();
  const [detailadd, setdetail] = useState();
  const [data, setdata] = useState({});
  const [leftEmail, setleftEmail] = useState("");
  const [rigEmail, setrigEmail] = useState("");
  //   let data = {};

  const PhoneNumberParser = () => {
    if (phone) {
      const parsedNumber = phone.split("-");
      const countryCode = parsedNumber[0];
      const phoneNumberDigits = parsedNumber[1] + parsedNumber[2];
      setrigphone(Number(phoneNumberDigits));
    }
  };

  const handlepwChange = (e) => {
    setpw(e.target.value);
  };
  const handlerigEChange = (e) => {
    setrigEmail(e.target.value);
  };
  const handlephoneChange = (e) => {
    setphone(e.target.value);
  };
  const handleemailChange = (e) => {
    setleftEmail(e.target.value);
  };
  const handleaddresChange = (e) => {
    setaddres(e.target.value);
  };
  const handledetailChange = (e) => {
    setdetail(e.target.value);
  };
  //   const sendUser = () => {
  //     axios
  //       .post("/json/user.json", data)
  //       .then((response) => {
  //         console.log("Data sent successfully!", response);
  //       })
  //       .catch((error) => {
  //         console.error("Error sending data:", error);
  //       });
  //   };

  const sendUser = () => {
    let data = {
      name: name,
      id: id,
      pw: pw,
      // phone: userData[0].phone,
      birth: birth,
      // email: userData[0].email,
      address: addres,
      detailAddress: detailadd,
    };
    console.log(data);

    axios
      .post("http://localhost:5000/user/config", data)
      .then((response) => {
        console.log("Data sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };
  const parseEmail = () => {
    if (email) {
      const atIndex = email.indexOf("@");
      setleftEmail(email.substring(0, atIndex));
    }
  };

  // useEffect(() => {
  //   axios
  //     .get("/json/user.json", { id: "bb" })
  //     .then((response) => {

  //       console.log(response.data);
  //       let data1 = response.data[0]
  //       console.log(data1)
  //       setName(data1.name);
  //       setId(data1.id);
  //       setpw(data1.pw);
  //       setphone(data1.phone);

  //       setemail(data1.email)

  //       setbirth(data1.birth);
  //       setaddres(data1.address);
  //       setdetail(data1.detailAddress);
  //       PhoneNumberParser(phone)
  //       parseEmail(email)
  //       console.log(email)
  //     })
  //     .catch((error) => {
  //       console.error();
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/view", {
        params: { id: localStorage.getItem("id") },
      })
      .then((response) => {
        const userData = response.data.userData;
        setdata(userData);
        console.log(response);
        console.log(data);
        setName(userData.name);
        setId(userData.id);
        setpw(userData.pw);
        setphone(userData.phone);
        setbirth(userData.birth);
        setaddres(userData.address);
        setdetail(userData.detailAddress);
        setemail(userData.email);
        PhoneNumberParser(phone);
        parseEmail(email);

        console.log(phone);
        console.log(rigphone);
        console.log(email);
        console.log(rigEmail);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    PhoneNumberParser();
    parseEmail();
  }, [phone, email]);

  console.log(data);
  return (
    <div className="changeInformContainer">
      <UserMypage />
      <div className="changeHedder">나의 기본정보</div>
      <div className="myInform">
        <div className="inputbox">
          <input
            className="nameinput"
            type="text"
            disabled
            placeholder={name}
          ></input>
        </div>
        <div className="inputbox">
          <input
            className="idinput"
            type="text"
            disabled
            placeholder={id}
          ></input>
        </div>
        <div className="inputbox">
          <input
            className="pwinput"
            type="password"
            value={pw}
            onChange={handlepwChange}
          ></input>
          {/*  Todo 비밀번호를 입력하면 일반주소도 같이 입력됨*/}
        </div>
        <div className="inputbox">
          <input
            className="repwinput"
            type="password"
            placeholder="비밀번호 확인(8~16자리 영문/숫자 조합)"
          ></input>
        </div>
        <div className="inputbox">
          <select disabled className="leftnum">
            <option className="010">010</option>
            <option className="011">011</option>
            <option className="016">016</option>
            <option className="017">017</option>
            <option className="019">019</option>
          </select>
          <input
            className="rightnum"
            type="number"
            value={rigphone}
            disabled
          ></input>
          <span className="phonbtn">수정</span>
        </div>
        <div className="informbox">
          <input className="birthinput" type="text" value={birth}></input>
          <div className="emailInput">
            <input
              className="leftemail"
              type="text"
              value={leftEmail}
              onChange={handleemailChange}
              disabled
            ></input>
            @
            <select
              className="rightemail"
              onChange={handlerigEChange}
              value={rigEmail}
              disabled
            >
              <option>naver.com</option>
              <option>daum.net</option>
              <option>hotmaile.com</option>
              <option>gmail.com</option>
              <option>nate.com</option>
              <option>직접입력</option>
            </select>
          </div>
          <div className="addressInput">
            <div className="inputbox">
              <input
                className="address"
                type="address"
                placeholder="주소"
                value={addres}
                onChange={handleaddresChange}
              ></input>
              <span className="searchaddress">주소찾기</span>
            </div>
            <div className="inputbox">
              <input
                className="streetaddress"
                type="text"
                placeholder="상세주소"
                value={detailadd}
                onChange={handledetailChange}
              ></input>
            </div>
          </div>
        </div>
        <div className="subBtn">
          <div className="cancelbtn">취소</div>
          <div className="okbtn" onClick={sendUser}>
            확인
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeInform;
