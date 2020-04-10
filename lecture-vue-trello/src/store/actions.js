// import * as api from "@/api/index.js";
// import {
//   createBoard,
//   fetchBoardList,
//   createCard,
//   fetchCard,editCard
// } from "@/api/board";

import * as board from "@/api/board";
import { createList } from "@/api/list";
import { loginAuth } from "@/api/auth";

const actions = {
  async ADD_BOARD(_, { title }) {
    const { data } = await board.createBoard(title);
    return data;
  },
  async FETCH_BOARDS({ commit }) {
    const { data } = await board.fetchBoardList();
    commit("setBoards", data.list);
  },
  async LOGIN({ commit }, { email, password }) {
    const { data } = await loginAuth({ email, password });
    commit("login", data.accessToken);
  },
  async FETCH_BOARD({ commit }, id) {
    const { data } = await board.fetchBoardList(id);
    commit("setBoard", data.item);
  },
  async DEL_BOARD(_, id) {
    await board.delBoard(id);
  },
  async EDIT_BOARD({ dispatch, state }, { id, title, bgColor }) {
    await board.editBoard(id, { title, bgColor });
    dispatch("FETCH_BOARD", state.board.id);
  },
  async ADD_CARD({ dispatch, state }, createData) {
    await board.createCard(createData);
    // 보드 조회 api 호출
    dispatch("FETCH_BOARD", state.board.id);
  },
  async FETCH_CARD({ commit }, id) {
    const { data } = await board.fetchCard(id);
    commit("setCard", data.item);
  },
  async EDIT_CARD(
    { dispatch, state },
    { id, title, description, pos, listId }
  ) {
    await board.editCard(id, { title, description, pos, listId });
    // 보드 조회 api 호출
    dispatch("FETCH_BOARD", state.board.id);
  },
  async DEL_CARD({ dispatch, state }, id) {
    await board.delCard(id);
    dispatch("FETCH_BOARD", state.board.id);
  },
  async CREATE_LIST({ dispatch, state }, { title, boardId, pos }) {
    await createList({ title, boardId, pos });
    dispatch("FETCH_BOARD", state.board.id);
  }
};

export default actions;
