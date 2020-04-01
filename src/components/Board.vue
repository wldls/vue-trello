<template>
  <div>
    Board id: {{ $route.params.bid }}
    <router-link :to="`/b/${$route.params.bid}/c/1`">go to card1</router-link>
    <router-link :to="`/b/${$route.params.bid}/c/2`">go to card2</router-link>
    <hr />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
