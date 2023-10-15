<script setup>
</script>

<template>
  <div class="page">
    <div class="block-left">
      <router-view class="view" name="navigation"></router-view>
    </div>
    <div class="block-right">
      <router-view class="view" name="content"></router-view>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  width:100%;

}

.block-left {
  display: flex;
  min-width: 50px;
}

.block-right {
  display: flex;
  flex-grow:1;
  /*justify-content: center;*/
  align-items: center;
  background: var(--background);
  flex-direction: column;
  padding:50px;
}
</style>
