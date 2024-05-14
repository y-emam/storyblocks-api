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
    const res = await axios.get(
      `${url}?project_id=${projectId}&user_id=${userId}&keywords=${keyword}&APIKEY=${publicKey}&HMAC=${hmac}&EXPIRES=${expires}`
    );
    if (res.status === 200) {
      const jsonData = res.data;
      console.log(jsonData);

      return jsonData;
    } else {
      console.log(`Error Requesitng the APi`);
    }
  } catch (error) {
    console.log(`Error requesting API: ${error.message}`);
  }
};

export default requestApi;
