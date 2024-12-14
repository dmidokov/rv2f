<template>
  <div class="left-bar">
    <div class="sidebar-sub-block sidebar-top-block">
      <div id="accountIconBlock" class="account-icon icon-shadow">
        <canvas width="60" height="60" id="accountIcon"></canvas>
      </div>
    </div>
    <div class="hot-switch-accounts-list">
      <div v-for="user in accountHotSwitch" class="hot-switch-account-item">
        <img width="50" height="50" :src="user.icon" :title="user.userName" :id="user.id"
             @click="switchAccount(user.id)">
      </div>
      <div class="hot-switch-list-spine">
        switch
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
  <div class="left-bar-under">
  </div>
</template>

<script lang="ts">
import {Auth} from "../js/Auth"
import {Navigation} from "../js/Navigation"
import LeftBarNavigation from "../components/LeftBarNavigation.vue"
import {Users} from "../js/Users";

export default {
  name: "LeftBar",
  components: {LeftBarNavigation},
  data() {
    return {
      organizations: {},
      navigation: [],
      accountIcon: '',
      accountHotSwitch: []
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
    },
    getAccountIcon() {
      (new Users()).getIcon().then(res => {
        this.accountIcon = this.createLogo(res)
      })
    },
    getAccountHotSwitch() {
      (new Users()).getHotSwitch().then(res => {
        if (res) {
          this.accountHotSwitch = res
        }
      })
    },
    createLogo(imgSource = "") {
      const canvas = document.getElementById("accountIcon")
      const ctx = canvas.getContext("2d")

      if (imgSource == "") {
        ctx.fillStyle = "#004878"
        ctx.fillRect(0, 0, 60, 60)

        ctx.fillStyle = "white"
        ctx.font = "30px roboto";
        ctx.fillText("AD", 14, 39, 35)
        ctx.fillStyle = "red"
      } else {
        ctx.fillStyle = "#004878"
        ctx.fillRect(0, 0, 60, 60)
        const img = new Image()
        img.src = imgSource
        img.onload = () => {
          console.log("draw")
          ctx.drawImage(img, 0, 0, 60, 60)
        }
      }
    },
    switchAccount(id: number) {
      (new Users()).switchAccount(id).then(res => {
        this.accountIcon = this.createLogo(res['icon2'])
      })
    }
  },
  beforeMount() {
    this.showNavigation()
    this.getAccountIcon()
    this.getAccountHotSwitch()

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
  /*overflow: hidden;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  height: 100vh;
}

.left-bar-under {
  min-width: 70px;
  max-width: 70px;
  background: transparent;
  border-right: 2px solid transparent;
  /*overflow: hidden;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: -100;
}

.sidebar-sub-block {
  color: red;
  justify-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.sidebar-top-block {
  margin-top: 15px;
  background: inherit;
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

.hot-switch-accounts-list {
  position: absolute;
  display: flex;
  z-index: 0;
  margin-top: 15px;
  right: -25px;
  height: 60px;
  background: var(--background-secondary);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-left: 25px;
}

.hot-switch-accounts-list:hover {
  animation-duration: 2s;
  transform: translateX(100%) translate(-50px);
  transition: 1s;
  transition-timing-function: cubic-bezier(0.3, 0.2, 0.3, 1.6);
}

.hot-switch-account-item {
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  align-self: center;
}

.hot-switch-account-item img {
  cursor: pointer;
  border-radius: 50px;
}

.hot-switch-list-spine {
  background: var(--background-accent-themed);
  width: 25px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  writing-mode: vertical-rl;
  color: white;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>