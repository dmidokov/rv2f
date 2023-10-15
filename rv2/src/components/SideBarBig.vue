<template>
  <div class="sidebar">
    <div class="company-name">{{ organizationName }}</div>
    <div class="sidebar-background"></div>

  </div>
</template>

<script>
import {Organizations} from "../js/Organizations";

export default {
  name: "SideBarBig",
  data() {
    return {
      organizationName: ""
    }
  },
  methods: {
    loadOrganizationName() {
      let org = new Organizations()
      org.getCurrentOrganizationName().then(r => {this.organizationName = r['name']})
    },
  },
  beforeMount() {
    this.loadOrganizationName()
  }
}
</script>

<style scoped>
.sidebar {
  /* Боковая панель */
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background: var(--background-accent-themed);
  /*border-left:10px solid var(--stroke-cyan);*/

}

.sidebar-background {
  background: url("/icons/sidebar-background.svg");
  width: 600px;
  height: 100vh;
  right: 0px;
}

.company-name {
  position: absolute;
  top: 17%;
  left: 4%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 64px;
  line-height: 38px;
  color: var(--text-white);
}

.company-name:first-letter {
  text-transform: uppercase;
}
</style>