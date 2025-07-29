import axios from "axios";

// base client api trigger
async function client(url, payload = {}, method = "GET") {
  try {
    const options = {
      url,
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (options.method === "GET") {
      options.params = payload;
    } else {
      options.data = payload;
    }

    const response = await axios(options);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export default client;
