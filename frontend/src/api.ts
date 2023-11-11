import axios, { AxiosResponse } from "axios";

export async function getRandomNumber() {
  return axios
    .get<{ number: number }>("/api/random")
    // .get<{ number: number }>("http://10.0.13.146:8080/random")
    .then(({ data }) => data);
}
