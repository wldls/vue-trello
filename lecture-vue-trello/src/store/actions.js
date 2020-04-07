// import * as api from "@/api/index.js";
import { createBoard, fetchBoardList } from "@/api/board";
import { loginAuth } from "@/api/auth";

const actions = {
  async ADD_BOARD(_, { title }) {
    const { data } = await createBoard(title);
    return data;
  },
  async FETCH_BOARDS({ commit }) {
    const { data } = await fetchBoardList();
    commit("setBoards", data.list);
  },
  async LOGIN({ commit }, { email, password }) {
    const { data } = await loginAuth({ email, password });
    commit("login", data.accessToken);
  },
  async FETCH_BOARD({ commit }, id) {
    const { data } = await fetchBoardList(id);
    commit("setBoard", data.item);
  }
};

export default actions;
