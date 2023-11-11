import axios, { AxiosResponse } from "axios";

export async function getRandomNumber() {
  return axios
    .get<AxiosResponse<{ number: number }>>("http://192.168.1.127:8080/api/random")
    .then(({ data }) => data);
}
