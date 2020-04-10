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
  },
  setTheme(state, color) {
    state.bodyColor = color || "#fff";
    state.navbarColor = color ? "rgba(0,0,0,.15)" : "#026aa7";
  },
  setIsShowBoardSettings(state, toggle) {
    state.isShowBoardSettings = toggle;
  }
};

export default mutations;
