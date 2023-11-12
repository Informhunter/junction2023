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
  paragraph_id: number;
  severity_level: 'low' | 'moderate' | 'critical';
  type: 'chit-chat' | 'how-to';
  text: string;
  search_result: {
    url: string;
    title: string;
  }
  search_summary: string | null;
}

export async function sendNote(note: string) {
  return (
    axios
      .post<Suggestion[]>("api/note?summarize=true", note, {
      // .post<Suggestion[]>("http://10.0.13.146:8080/note?summarize=true", note, {
        headers: { "Content-Type": "text/plain" },
      })
      .then(({ data }) => data)
      .catch((error) => Promise.reject(error.response))
  );
}
