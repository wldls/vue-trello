<template>
  <Modal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <input
          type="text"
          class="form-control"
          :value="card.title"
          :readonly="!toggleTitle"
          @click="toggleTitle=true"
          @blur="onBlurTitle"
          ref="inputTitle"
        />
      </div>
      <a href="#" class="modal-close-btn" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body">
      <h3>Description</h3>
      <textarea
        cols="30"
        rows="3"
        class="form-control"
        placeholder="Add a more detailed description..."
        :readonly="!toggleDesc"
        @click="toggleDesc=true"
        @blur="onBlurDesc"
        ref="inputDesc"
        v-model="card.description"
      ></textarea>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Modal
  },
  data() {
    return {
      toggleTitle: false,
      toggleDesc: false
    };
  },
  computed: {
    ...mapState(["card", "board"])
  },
  created() {
    this.fetchCard();
  },
  methods: {
    ...mapActions(["FETCH_CARD", "EDIT_CARD"]),
    onClose() {
      this.$router.push(`/b/${this.board.id}`);
    },
    async fetchCard() {
      await this.FETCH_CARD(this.$route.params.cid);
    },
    async onBlurTitle() {
      this.toggleTitle = false;
      const title = this.$refs.inputTitle.value.trim();

      if (!title) return;
      await this.EDIT_CARD({ id: this.card.id, title });
      this.fetchCard();
    },
    async onBlurDesc() {
      this.toggleDesc = false;
      const desc = this.$refs.inputDesc.value.trim();

      if (!desc) return;
      await this.EDIT_CARD({ id: this.card.id, description: desc });
      this.fetchCard();
    }
    // onSubmit() {
    // const createData = { title: inputTitle, listId: listId };
    // this.EDIT_CARD(createData);
    // }
  }
};
</script>

<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-card-header-title {
  padding-right: 30px;
}
.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
}
</style>
