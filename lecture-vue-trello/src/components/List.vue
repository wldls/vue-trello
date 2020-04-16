<template>
  <div class="list" :data-list-id="data.id" :data-list-pos="data.pos">
    <div class="list-header">
      <input
        type="text"
        v-if="isListEdit"
        v-model="inputTitle"
        @blur="onSubmit"
        @keyup.enter="onSubmit"
        ref="inputTitle"
        class="form-control input-title"
      />
      <div v-else class="list-header-title" @click="onEditList">{{ data.title }}</div>
      <a href="#" class="delete-list-btn" @click.prevent="onDeleteList">&times;</a>
    </div>
    <div class="card-list">
      <card-item v-for="card in data.cards" :key="card.id" :data="card">&times;</card-item>
    </div>
    <div v-if="isAddCard">
      <add-card :listId="data.id" @close="onToggleCard"></add-card>
    </div>
    <div v-else>
      <a href="#" class="add-card-btn" @click.prevent.stop="onToggleCard">&plus; Add a card..</a>
    </div>
  </div>
</template>

<script>
import AddCard from "./AddCard";
import CardItem from "./CardItem";
import { mapActions } from "vuex";

export default {
  components: { AddCard, CardItem },
  props: ["data"],
  data() {
    return {
      isAddCard: false,
      isListEdit: false,
      inputTitle: ""
    };
  },
  created() {
    this.inputTitle = this.data.title;
  },
  methods: {
    ...mapActions(["EDIT_LIST", "DEL_LIST"]),
    onToggleCard() {
      this.isAddCard = !this.isAddCard;
    },
    onEditList() {
      this.isListEdit = true;
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      });
    },
    async onSubmit() {
      await this.EDIT_LIST({ id: this.data.id, title: this.inputTitle });
      this.isListEdit = false;
    },
    async onDeleteList() {
      if (window.confirm(`Delete ${this.data.title} list?`)) {
        await this.DEL_LIST(this.data.id);
      }
    }
  }
};
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}
.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}
.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
  cursor: pointer;
}
.input-title {
  width: 90%;
}
.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}
.card-list {
  flex: 1 1 auto;
  /* overflow-y: scroll; */
}
.empty-card-item {
  height: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
}
.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>