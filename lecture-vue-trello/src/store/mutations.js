import { setAuthInHeader } from "@/api/index.js";

const mutations = {
  setIsAddBoard(state, toggle) {
    state.isAddBoard = toggle;
  },
  setBoards(state, boards) {
    state.boards = boards;
  },
  setBoard(state, board) {
    state.board = board;
  },
  login(state, token) {
    if (!token) return;
    state.token = token;
    localStorage.setItem("token", token);
    setAuthInHeader(token);
  },
  logoutAuth(state) {
    state.token = null;
    delete localStorage.token;
    setAuthInHeader(null);
  },
  setCard(state, card) {
    state.card = card;
  }
};

export default mutations;
