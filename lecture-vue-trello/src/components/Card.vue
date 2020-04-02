<template>
  <div>
    Card
    <div v-if="loading">loading...</div>
    <div v-else>{{ $route.params.cid }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  watch: {
    $route: {
      handler: "fetchData",
      immediate: true
    }
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
