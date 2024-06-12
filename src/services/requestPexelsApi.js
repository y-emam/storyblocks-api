import axios from "axios";

const requestPexelsApi = async (keyword, noVideos) => {
  try {
    const apiKey = process.env.REACT_APP_API_KEY;

    const config = {
      headers: {
        Authorization: apiKey,
      },
    };

    const url = encodeURI(
      `https://api.pexels.com/videos/search?query=${keyword}&per_page=${noVideos}`
    );

    const res = await axios.get(url, config);
    if (res.status === 200) {
      const jsonData = res.data;

      return jsonData;
    } else {
      console.log(`Error Requesitng the APi`);
    }
  } catch (error) {
    console.log(`Error requesting API: ${error.message}`);
  }
};

export default requestPexelsApi;
