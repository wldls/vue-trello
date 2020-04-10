<template>
  <div class="board-menu">
    <div class="board-menu-header">
      <div class="header-title">Menu</div>
      <a class="header-close-btn" href="#" @click.prevent="onClose">&times;</a>
    </div>
    <ul class="menu-list">
      <li @click.prevent="onDeleteBoard">Delete Board</li>
      <li>change background</li>
      <div class="color-picker">
        <a href="#" data-value="rgb(0, 121, 191)" @click.prevent="onChangeTheme"></a>
        <a href="#" data-value="rgb(210,144,52)" @click.prevent="onChangeTheme"></a>
        <a href="#" data-value="rgb(81, 152, 57)" @click.prevent="onChangeTheme"></a>
        <a href="#" data-value="rgb(176, 70, 50)" @click.prevent="onChangeTheme"></a>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["board"])
  },
  mounted() {
    Array.from(this.$el.querySelectorAll(".color-picker a")).forEach(el => {
      el.style.backgroundColor = el.dataset.value;
    });
  },
  methods: {
    ...mapMutations(["setIsShowBoardSettings", "setTheme"]),
    ...mapActions(["FETCH_BOARD", "DEL_BOARD", "EDIT_BOARD"]),
    onClose() {
      this.setIsShowBoardSettings(false);
    },
    async onDeleteBoard() {
      if (!window.confirm(`DELETE ${this.board.title} Board?`)) return;
      await this.DEL_BOARD(this.board.id);
      await this.setIsShowBoardSettings(false);
      this.$router.push("/");
    },
    async onChangeTheme(e) {
      const bgColor = e.target.dataset.value;
      await this.EDIT_BOARD({
        id: this.board.id,
        title: this.board.title,
        bgColor: bgColor
      });
      this.setTheme(bgColor);
    }
  }
};
</script>

<style>
.board-menu {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #edeff0;
  width: 300px;
  transition: all 0.3s;
}
.board-menu-header {
  height: 46px;
  padding: 0 6px 0 12px;
  border-bottom: #bbb solid 1px;
}
.header-title {
  font-size: 18px;
  text-align: center;
  line-height: 46px;
  font-weight: 700;
}
.header-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  font-size: 24px;
  color: #999;
}
.menu-list {
  list-style: none;
  padding-left: 0px;
}
.menu-list li {
  height: 18px;
  line-height: 18px;
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  cursor: pointer;
}
.menu-list li:hover,
.menu-list li:focus {
  background-color: rgba(0, 0, 0, 0.1);
}
.menu-list li a {
  text-decoration: none;
  color: inherit;
}
.color-picker {
  margin: 0 15px;
}
.color-picker a {
  display: inline-block;
  width: 49%;
  height: 100px;
  margin: 0 0.5%;
  border-radius: 8px;
}
</style>