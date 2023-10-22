<template>
  <div class="left-bar">
    <div class="sidebar-sub-block sidebar-top-block">
      <div class="account-icon icon-shadow">
        <img
            src="/icons/img_4.png"
        >
      </div>
    </div>
    <div class="sidebar-sub-block sidebar-middle-block">
      <LeftBarNavigation
          v-bind:navigation="navigation"
      />
    </div>
    <div class="sidebar-sub-block sidebar-bottom-block">
      <img
          @click="logout()"
          class="sidebar-icon"
          src="/icons/logout.svg"
      />
    </div>
  </div>
</template>

<script>
import {Auth} from "../js/Auth"
import {Navigation} from "../js/Navigation"
import LeftBarNavigation from "../components/LeftBarNavigation.vue"

export default {
  name: "LeftBar",
  components: {LeftBarNavigation},
  data() {
    return {
      organizations: {},
      navigation: []
    }
  }
  ,
  methods: {
    logout() {
      let authorization = new Auth()
      authorization.logout()
    }
    ,
    showNavigation() {
      let nav = new Navigation()
      nav.load().then(r => {
        this.navigation = r
      })
    }
  },
  beforeMount() {
    this.showNavigation()

    let timer = setInterval(async function () {
      let response = await new Auth().authCheck()
      if (!response) {
        clearInterval(timer)
        window.location.href = "#/login"
      }
    }, 30000)
  }
}
</script>

<style scoped>
.account-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--background);
  overflow: hidden;
  cursor: pointer;
}

.account-icon img {
  height: 60px;

}

.icon-shadow {
  -webkit-box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-first);
  -moz-box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-first);
  box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-first);
}

.icon-shadow:hover {
  -webkit-box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-second);
  -moz-box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-second);
  box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-second);
}

.left-bar {
  min-width: 70px;
  max-width: 70px;
  background: var(--background-content);
  border-right: 2px solid var(--stroke-separatot-primary);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-sub-block {
  color: red;
  justify-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
}

.sidebar-top-block {
  margin-top: 15px;
}

.sidebar-bottom-block {
  margin-bottom: 15px;
}

.sidebar-middle-block {
  flex-direction: column;
  justify-content: center;
  text-align: center;
  justify-items: center;
}

.sidebar-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>