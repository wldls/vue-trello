<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        class="form-control"
        v-model="inputTitle"
        ref="inputText"
      />
      <button type="submit" class="btn btn-success" :disabled="invalidInput">
        Add Card
      </button>
      <a href="#" class="cancel-add-btn" @click.prevent="$emit('close')"
        >&times;</a
      >
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["listId"],
  data() {
    return {
      inputTitle: ""
    };
  },
  computed: {
    invalidInput() {
      return !this.inputTitle.trim();
    },
    ...mapState(["board"])
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.setupClickOutside);
  },
  mounted() {
    this.$refs.inputText.focus();
    document.body.addEventListener("click", this.setupClickOutside);
  },
  methods: {
    ...mapActions(["ADD_CARD"]),
    async onSubmit() {
      if (this.invalidInput) return;

      const { inputTitle, listId } = this;
      const pos = this.newCardPos();

      await this.ADD_CARD({ title: inputTitle, listId, pos });
      this.inputTitle = "";
    },
    setupClickOutside(e) {
      if (this.$el.contains(e.target)) return;
      this.$emit("close");
    },
    newCardPos() {
      const boardList = this.$store.state.board.lists;
      const curList = boardList.filter(list => list.id === this.listId)[0];

      if (!curList) return 65535;

      const { cards } = curList;

      if (!cards.length) return 65535;
      return cards[cards.length - 1].pos * 2;
    }
  }
};
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
