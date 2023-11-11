import axios from "axios";

export async function getRandomNumber() {
  return (
    axios
      .get<{ number: number }>("/api/healthcheck")
      // .get<{ number: number }>("http://10.0.13.146:8080/healthcheck")
      .then(({ data }) => data)
  );
}

export interface Suggestion {
  text: string;
}

export async function sendNote(note: string) {
  return (
    axios
      .post<Suggestion[]>("api/note", note, {
      // .post<Suggestion[]>("http://10.0.13.146:8080/note", note, {
        headers: { "Content-Type": "text/plain" },
      })
      .then(({ data }) => data)
      .catch((error) => Promise.reject(error.response))
  );
}
