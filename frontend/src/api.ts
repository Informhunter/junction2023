import axios from "axios";

export async function fetchRandomNumber() {
  return axios
    .get("http://192.168.1.127:8080/api/random")
    .then(({ data }) => data);
}
