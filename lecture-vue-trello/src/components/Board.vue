<template>
  <div>
    <div v-if="loading">loading board...</div>
    <div v-else>
      <div class="board-wrapper">
        <div class="board">
          <div class="board-header">
            <input
              type="text"
              class="form-control"
              v-if="isEditTitle"
              v-model="inputTitle"
              @blur="onSubmitTitle"
              @keyup.enter="onSubmitTitle"
              ref="inputTitle"
            />
            <span v-else @click="onClickTitle" class="board-title">{{ board.title }}</span>
            <a href class="board-header-btn show-menu" @click.prevent="onShowSettings">...show menu</a>
          </div>
          <div class="list-section-wrapper">
            <div class="list-section">
              <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
                <List :data="list" />
              </div>
              <div class="list-wrapper">
                <add-list></add-list>
              </div>
            </div>
          </div>
        </div>
      </div>
      <board-setting v-if="isShowBoardSettings"></board-setting>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import List from "./List";
import BoardSetting from "./BoardSetting";
import AddList from "./AddList";
import { mapActions, mapMutations, mapState } from "vuex";
import dragger from "@/utils/dragger";

export default {
  components: {
    List,
    AddList,
    BoardSetting
  },
  data() {
    return {
      loading: false,
      cDragger: null,
      isEditTitle: false,
      inputTitle: ""
    };
  },
  computed: {
    ...mapState(["board", "isShowBoardSettings"])
  },
  async created() {
    await this.fetchData();
    this.inputTitle = this.board.title;
    this.setTheme(this.board.bgColor);
    this.setIsShowBoardSettings(false);
  },
  updated() {
    this.setCardDragabble();
  },
  methods: {
    ...mapMutations(["setTheme", "setIsShowBoardSettings"]),
    ...mapActions(["FETCH_BOARD", "EDIT_CARD", "EDIT_BOARD"]),
    async fetchData() {
      this.loading = true;
      await this.FETCH_BOARD(this.$route.params.bid);
      this.loading = false;
    },
    onShowSettings() {
      this.setIsShowBoardSettings(true);
    },
    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick(() => this.$refs.inputTitle.focus());
    },
    async onSubmitTitle() {
      this.isEditTitle = false;
      const inputTitle = this.inputTitle.trim();

      if (!inputTitle) return;
      if (inputTitle === this.board.title) return;

      await this.EDIT_BOARD({
        id: this.board.id,
        title: inputTitle
      });
    },
    setCardDragabble() {
      if (this.cDragger) this.cDragger.destroy();

      this.cDragger = dragger.init(
        Array.from(this.$el.querySelectorAll(".card-list"))
      );

      this.cDragger.on("drop", (el, wrapper) => {
        const targetCard = {
          id: el.dataset.cardId * 1,
          pos: 65535
        };

        const { prev, next } = dragger.siblings({
          el,
          wrapper,
          candidates: Array.from(wrapper.querySelectorAll(".card-item")),
          type: "card"
        });

        // position 값 계산
        if (!prev && next) {
          // tartget card가 맨 앞에 있는 경우
          targetCard.pos = next.pos / 2;
        } else if (!next && prev) {
          // target card가 맨 뒤에 있는 경우
          targetCard.pos = prev.pos * 2;
        } else if (prev && next) {
          // target card가 중간에 있는 경우
          targetCard.pos = (prev.pos + next.pos) / 2;
        }

        this.EDIT_CARD(targetCard);
      });
    }
  }
};
</script>

<style>
/* .board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
} */
/* .board {
  display: flex;
  flex-direction: column;
  height: 100%;
} */
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
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; */
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
