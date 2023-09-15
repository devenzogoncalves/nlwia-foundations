import axios from "axios";

const server = axios.create({
  baseURL: 'https://turbo-telegram-vwpw65qpvw7cpjqr-3333.app.github.dev/'
});

export default server;