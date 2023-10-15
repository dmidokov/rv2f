<template>
  <div class="nav-icon-block" v-for="nav in navigation">
    <a :href="nav.link">
      <img
          class="sidebar-icon"
          :src="nav.icon"
      >
    </a>
  </div>
</template>

<script>
export default {
  name: "LeftBarNavigation",
  props: ['navigation']
}
</script>

<style scoped>
.nav-icon-block {
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
}

img {
  width: 40px;
  cursor: pointer;
}

img:hover {
  width: 45px;
}

</style>