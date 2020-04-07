<template>
  <div>
    <div v-if="loading">loading board...</div>
    <div v-else>
      <div class="board-wrapper">
        <div class="board">
          <div class="board-header">
            <span class="board-title">{{ board.title }}</span>
          </div>
          <div class="list-section-wrapper">
            <div class="list-section">
              <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
                <List :data="list" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <router-link :to="`/b/${$route.params.bid}/c/1`">go to card1</router-link> -->
      <!-- <router-link :to="`/b/${$route.params.bid}/c/2`">go to card2</router-link> -->
    </div>
    <hr />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import List from "./List";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    List
  },
  data() {
    return {
      loading: false
      // item: null
    };
  },
  computed: {
    ...mapState(["board"])
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions(["FETCH_BOARD"]),
    async fetchData() {
      this.loading = true;
      await this.FETCH_BOARD(this.$route.params.bid);
      this.loading = false;
    }
  }
};
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
}
.board-header input[type="text"] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 300px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>
