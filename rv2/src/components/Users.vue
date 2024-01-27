<template>
  <div class="users-block">
    <div class="title">Users</div>
    <div class="user-line user-line-header">
      <div class="table-cell">Name</div>
      <div class="table-cell">Create Time</div>
      <div class="table-cell">Update Time</div>
      <div class="table-cell">User Type</div>
      <div class="table-cell">Actions</div>
    </div>
    <div
        :name="'user-line-' + user.id"
        :data-line-index="'user-line-' + user.id"
        @click="showUserInfo"
        class="user-line user-line-background"
        v-for="user in users"
    >
      <div class="user-main-info">
        <div :data-line-index="'user-line-' + user.id" class="table-cell">{{ user.userName }}</div>
        <div :data-line-index="'user-line-' + user.id" class="table-cell">{{ user.createTime }}</div>
        <div :data-line-index="'user-line-' + user.id" class="table-cell">{{ user.updateTime }}</div>
        <div :data-line-index="'user-line-' + user.id" class="table-cell">{{ user.type }}</div>
        <div :data-line-index="'user-line-' + user.id" class="table-cell">
          <img
              :data-id="user.id"
              :data-name="user.userName"
              src="/icons/close-icon-red.svg"
              @click="deleteUser"
              alt="close"
          >
        </div>
      </div>
      <div class="user-full-info" :id="'user-line-' + user.id">---</div>
    </div>
    <div class="buttons-block">
      <button-add
          :button-text="addNewUserText"
          @click="openModal"
      />
    </div>
  </div>
  <ModalAddNewUser
      ref="addUserModal"
      @userAdded="loadUsers"
  />
  <confirmation
      :header="confirmationModalHeader"
      :action="confirmFunc"
      :confirmButtonTitle="confirmButtonTitle"
      @orgDeleted="loadUsers"
      ref="actionModal"
  />

</template>

<script lang="ts">

import ButtonAdd from "./Buttons/ButtonAdd.vue";
import {ModalsManager} from "../js/ModalsManager";
import {Users, UserResponse, RightsWithDescription} from "../js/Users";
import Confirmation from "./Modals/Confirmation.vue";
import ModalAddNewUser from "./Modals/ModalAddNewUser.vue";
import {UserInfoCustom, register} from "../js/CustomElements.js";

export default {
  name: "Users",
  components: {ButtonAdd, Confirmation, ModalAddNewUser},
  data() {
    return {
      users: [],
      confirmationModalHeader: "Вы действительно хотите удалить пользователя 'Admin'",
      deleteUserId: -1,
      confirmFunc: null,
      confirmButtonTitle: "",
      modals: new ModalsManager(),
      addNewUserText: "Add New",
      UserInfoDynamic: null,
    }
  },
  methods: {
    openModal() {
      this.$refs.addUserModal.showModal()
      this.modals.add(this.$refs.addUserModal.closeModal)
    },
    loadUsers() {
      let users = new Users()

      users.load().then(r => {
        for (let i in r) {
          if (r[i].hasOwnProperty("createTime") && r[i].hasOwnProperty("updateTime")) {
            r[i]["createTime"] = new Date(r[i]["createTime"] * 1000).toLocaleString()
            r[i]["updateTime"] = new Date(r[i]["updateTime"] * 1000).toLocaleString()
          }
          switch (r[i]["type"]) {
            case 0 :
              r[i]["type"] = "Service"
              break
            case 1:
              r[i]["type"] = "Employee"
              break
            default:
              r[i]["type"] = "Unknown"
          }
        }
        this.users = r
      })
    },
    async showUserInfo(event) {
      let target = event.target
      let lineName = target.getAttribute("data-line-index")
      let element = document.getElementsByName(lineName)[0]

      let id = lineName.split("-")[2];
      let user: UserResponse = await (new Users()).get(id)

      let newElement = document.createElement("user-info")

      console.log(user.createTime)
      console.log(user.userRightsWithDesription)

      let r: Array<RightsWithDescription> = []

      user.userRightsWithDesription.forEach((v, i) => {
        r.push({
          "name": v.name,
          "value": v.value
        })
      })

      console.log(r.toString())



      let a = new UserInfoCustom({
        "user":user
      })

      a.setAttribute("id", lineName)
      a.setAttribute('class', 'dynamic-user-info-container')

      if (!document.getElementById(lineName)) {
        element.after(a)
      } else {
        document.getElementById(lineName).remove()
      }
    },
    closeLast(event) {
      this.modals.closeLast(event)
    },
    deleteUser(event) {
      this.$refs.actionModal.showModal()
      this.modals.add(this.$refs.actionModal.closeModal)

      this.confirmationModalHeader = "Вы действительно хотите удалить пользователя " + event.target.getAttribute("data-name")
      this.confirmButtonTitle = "Yes"

      const userId = event.target.getAttribute("data-id")

      this.confirmFunc = (function (context, Id) {
        const ctx = context;
        const userId = Id;

        return (async function () {
          let user = new Users()

          const result = await user.delete(userId)

          if (result) {
            ctx.loadUsers(ctx)
            ctx.$refs.actionModal.closeModal()
          }
        })
      })(this, userId)
    },
  },
  beforeMount() {
    this.loadUsers()
    document.addEventListener("keyup", this.closeLast)

  },
  beforeCreate() {

  }
}
</script>

<style>
.users-block {
  background: var(--background-content);
  border: 1px solid var(--stroke-separatot-primary);
  color: black;
  width: 100%;
  border-radius: 10px;
  display: flex;
  padding: 40px 15px 50px 15px;
  margin-top: 30px;
  position: relative;
  flex-direction: column;
  align-items: center;
}

.user-line {
  border-bottom: 1px solid var(--stroke-separatot-primary);
  width: 90%;
  flex-direction: column;
  display: flex;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: space-between;
}

.user-line-header {
  flex-direction: row;
}

.user-line-background:nth-child(odd) {
  background: var(--background-table-row-light-alpha-4);
}

.user-line-background:nth-child(odd):hover {
  background: var(--background-table-row-light-alpha-8);
}

.user-line-background:nth-child(even) {
  background: var(--background-table-row-light-alpha-4);
}

.user-line-background:nth-child(even):hover {
  background: var(--background-table-row-light-alpha-8);
}

.table-cell {
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.table-cell img {
  width: 20px;
  cursor: pointer;
}

.table-cell img:hover {
  width: 24px;
  cursor: pointer;
}

.title {
  position: absolute;
  left: 15px;
  top: -45px;
  display: inline-block;
  font-size: 30px;
  color: var(--text-input);
}

.buttons-block {
  position: absolute;
  top: 100%;
  right: 0;
  padding: 10px;
}

.dynamic-user-info-container {
  border-bottom: 1px solid var(--stroke-separatot-primary);
  width: 90%;
  flex-direction: row;
  display: flex;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: left;
  flex-wrap: wrap;
  align-content: stretch;
}

.user-main-info {
  width: 100%;
  flex-direction: row;
  display: flex;
  text-align: center;
  justify-content: space-between;
}

.user-full-info {
  display: none;
}
</style>