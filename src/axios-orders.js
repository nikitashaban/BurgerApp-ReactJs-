import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-8cf79.firebaseio.com/"
});

export default instance;
