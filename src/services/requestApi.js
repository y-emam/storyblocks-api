import axios from "axios";
import CryptoJS from "crypto-js";

const credentials = {
  publicKey: "test_4a0b684b4cb41e8e007f52f7427da6af8c7f4cd67874cc451966669d31c",
  privateKey:
    "test_75dbf18760f7eb5123fad82bed7fb55fa2089acb85da015b253b49d68dc",
  userId: "Test",
  projectId: "Test",
};
const AUTH_EXPIRY_SECONDS = 12 * 60 * 60; // 12 hours

const requestApi = async (keyword) => {
  try {
    const url = `https://api.videoblocks.com/api/v2/videos/search`;
    const { pathname } = new URL(url);

    const { privateKey, publicKey, userId, projectId } = credentials;
    const expires = Math.floor(Date.now() / 1000) + AUTH_EXPIRY_SECONDS;

    const hmac = CryptoJS.HmacSHA256(pathname, privateKey + expires).toString(
      CryptoJS.enc.Hex
    );

    // const response = await fetch(
    //   //   `${url}?project_id=${projectId}&user_id=${userId}&keywords=${keyword}&APIKEY=${publicKey}&HMAC=${hmac}&EXPIRES=${expires}`
    //   `https://api.videoblocks.com/api/v2/videos/search?project_id=Test&user_id=YasserEmam&keywords=good%20teacher&APIKEY=test_4a0b684b4cb41e8e007f52f7427da6af8c7f4cd67874cc451966669d31c&HMAC=385b99a14ba2bdef75f739e96e4dc249b336a93fb7e313542176a322ca22bdd6&EXPIRES=1715739528`
    // );
    // const response = await fetch("https://dummyjson.com/products/1");
    axios
      .get(
        `https://api.videoblocks.com/api/v2/videos/search?project_id=Test&user_id=YasserEmam&keywords=good%20teacher&APIKEY=test_4a0b684b4cb41e8e007f52f7427da6af8c7f4cd67874cc451966669d31c&HMAC=385b99a14ba2bdef75f739e96e4dc249b336a93fb7e313542176a322ca22bdd6&EXPIRES=1715739528`
      )
      .then((res) => {
        alert(res.data["total_results"]);
      });
    // alert(response.status);
    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    // const jsonData = await response.json();
    // console.log(jsonData);
    // return jsonData;
  } catch (error) {
    console.log(`Error requesting API: ${error.message}`);
  }
};

export default requestApi;
