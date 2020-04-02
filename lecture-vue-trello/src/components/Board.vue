<template>
  <div>
    Board
    <div v-if="loading">loading board...</div>
    <div v-else>
      <div>id: {{ $route.params.bid }}</div>
      <router-link :to="`/b/${$route.params.bid}/c/1`">go to card1</router-link>
      <router-link :to="`/b/${$route.params.bid}/c/2`">go to card2</router-link>
    </div>

    <hr />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style></style>
