<template>
  <div class="add-list">
    <input
      v-if="isAddList"
      type="text"
      class="form-control"
      v-model="inputTitle"
      ref="inputTitle"
      @blur="restore"
      @keyup.enter="onSubmitTitle"
    />
    <a v-else href="#" @click="onAddList">&plus; Add another list</a>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isAddList: false,
      inputTitle: ""
    };
  },
  computed: {
    ...mapState(["board"])
  },
  methods: {
    ...mapActions(["CREATE_LIST"]),
    onAddList() {
      this.isAddList = true;
      this.$nextTick(() => this.$refs.inputTitle.focus());
    },
    async onSubmitTitle() {
      const title = this.inputTitle.trim();
      const boardId = this.board.id;
      const lastList = this.board.lists[this.board.lists.length - 1];
      const pos = lastList ? lastList.pos * 2 : 65535;

      if (!title) return;

      await this.CREATE_LIST({ title, boardId, pos });
      this.restore();
    },
    restore() {
      this.isAddList = false;
      this.inputTitle = "";
    }
  }
};
</script>

<style>
.add-list {
  padding: 12px;
  background: rgba(0, 0, 0, 0.1);
  color: #ddd;
  transition: all 0.3s;
}
.add-list:hover,
.add-list:focus {
  background: rgba(0, 0, 0, 0.3);
}
.add-list a {
  color: #ddd;
}
</style>