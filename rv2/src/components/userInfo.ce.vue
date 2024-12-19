<template>
  <div class="user-icon">
    <img :src=user.icon :title="user.icon" alt="User Icon">
  </div>
  <div class="user-data-container">
    <div class="user-info-line user-name">
      <b>Login:</b> {{ user.userName }}
    </div>
    <div class="user-info-line">
      <b>Create date: </b>{{ new Date(Number(user.createTime)).toLocaleString().split(',')[0] }}
      <br>
      <b>Create time: </b>{{ new Date(Number(user.createTime)).toLocaleString().split(',')[1] }}
    </div>
    <div class="user-info-line">
      <b>Update date: </b>{{ new Date(Number(user.updateTime)).toLocaleString().split(',')[0] }}
      <br>
      <b>Update time: </b>{{ new Date(Number(user.updateTime)).toLocaleString().split(',')[1] }}
    </div>
    <div class="user-info-line">
      <b>Start page:</b> {{ user.startPage }}
    </div>

  </div>

  <div class="user-data-container">
    <div class="user-data-container-header">Rights</div>
    <div class="user-info-table" v-for="line in user.userRightsWithDesription">
      <div class="user-info-table-row">
        <input class="custom-checkbox" type="checkbox" :data-value="line.value" :id="line.name" :name="line.name"
               :checked="checkedBoxRights(line.value)" @change="update" data-type="rights">
        <label :for="line.name">{{ line.name }}</label>
      </div>
    </div>
  </div>


  <div class="user-data-container">
    <div class="user-data-container-header">Navigation</div>
    <div class="user-info-table" v-for="line in user.navigation">
      <div class="user-info-table-row">
        <input class="custom-checkbox" type="checkbox" :data-value="line.id" :id="line.Title" :name="line.Title"
               :checked="checkedBoxNavigation(line.enabled)" @change="update" data-type="navigation">
        <label :for="line.Title">{{ line.Title }}</label>
      </div>
    </div>
  </div>


  <div class="user-data-container">
    <div class="user-data-container-header">Hot switch menu</div>
    <div>
      <input :id="`input`+user.id" type="select" list="hotSwitchUsers">
      <datalist id="hotSwitchUsers">
        <option :id="child.login" :data-id="child.id" v-for="child in user.childs">{{ child.login }}</option>
      </datalist>
      <button type="button" class="ok-button" @click="addToHotSwitch">Add</button>
    </div>
    <div>
      <div v-for="hs in user.hotSwitch" class="hot-switch-user-line">
        <div class="hot-switch-user-name">{{ hs.login }}</div>
        <div class="hot-switch-user-remove-icon">
          <img width="20" height="20" src="/icons/close-icon-red.svg" @click="removeHotSwitch(user.id, hs.id)">
        </div>
      </div>
    </div>
  </div>

  <div class="user-data-container">
    <div class="user-data-container-header">Groups</div>
    <div>
      <input :id="`group_input_`+user.id" type="select" list="userGroups">
      <datalist id="userGroups">
        <option :id="group.group_name" :data-id="group.group_id" v-for="group in user.groups">{{
            group.group_name
          }}
        </option>
      </datalist>
      <button type="button" class="ok-button" @click="addGroup">Add</button>
    </div>
    <div>
      <div v-for="hs in user.assignedGroups" class="hot-switch-user-line">
        <div class="hot-switch-user-name">{{ hs.group_name }}</div>
        <div class="hot-switch-user-remove-icon">
          <img width="20" height="20" src="/icons/close-icon-red.svg" @click="removeUserGroup(user.id, hs.group_id)">
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {ChildsItem, NavigationItem, RightsWithDescription, UserResponse} from "../js/Users"

defineProps<{
  user: UserResponse
}>()
</script>


<script lang="ts">

import {
  AddToSwitcherRequest,
  RemoveFromSwitcherRequest,
  Users,
  UpdateRightRequest,
  UpdateGroupsRequest, UnassignGroupsRequest
} from "../js/Users";
import {computed} from "vue";
import {Notification} from "../js/Notification/Notification";

export default {
  name: "userInfo",
  props: ["user"],
  data() {
    return {
      user: computed(() => {
        return this.$props.user
      }),
    }
  },
  methods: {
    checkedBoxRights(value) {
      return this.user.userRights != null && this.user.userRights.includes(value)
    },
    checkedBoxNavigation(value) {
      return value
    },
    update(event) {
      let users = new Users()
      let data: UpdateRightRequest = {
        userId: Number(this.user.id),
        value: Number(event.target.getAttribute("data-value")),
        set: event.target.checked
      }

      users.update(data, [{name: "field", value: event.target.getAttribute("data-type")}])
    },
    addToHotSwitch(event) {
      let users = new Users()

      let shadowRoot = document
          .getElementById("user-line-" + this.user.id)
          .shadowRoot

      let input = shadowRoot.getElementById("input" + this.user.id).value

      let data: AddToSwitcherRequest = {
        fromId: this.user.id,
        toId: Number(shadowRoot.getElementById(input).getAttribute("data-id"))
      }

      let result = users.addToSwitcher(data)
      result.then(r => {
        if (this.user.hotSwitch == null) {
          this.user.hotSwitch = []
        }
        this.user.hotSwitch.push({
          'id': data.toId,
          'login': input,
        })
      })
    },
    removeHotSwitch(from: number, to: number) {
      let users = new Users()
      let data: RemoveFromSwitcherRequest = {
        fromId: from,
        toId: to
      }

      let result = users.removeFromSwitcher(data)
      result.then(r => {
        this.user.hotSwitch = this.user.hotSwitch.filter(v => {
          return v['id'] !== data.toId
        })
      })
    },
    addGroup() {
      let users = new Users()

      let shadowRoot = document
          .getElementById("user-line-" + this.user.id)
          .shadowRoot

      let input = shadowRoot.getElementById("group_input_" + this.user.id).value

      let data: UpdateGroupsRequest = {
        userId: this.user.id,
        groupId: Number(shadowRoot.getElementById(input).getAttribute("data-id"))
      }

      let result = users.addGroupToUser(data, input)
      result.then(r => {
        if (r) {
          this.user.assignedGroups.push({
            'group_id': data.groupId,
            'user_id': data.userId,
            'group_name': input
          })
        } else {
          new Notification("Something wrong happened", Notification.typeError)
        }
      })
    },
    removeUserGroup(user_id: number, group_id: number) {
      let users = new Users()

      let data: UnassignGroupsRequest = {
        userId: Number(user_id),
        groupId: Number(group_id),
      }

      let result = users.unassignUserGroup(data)

      result.then(r => {
        this.user.assignedGroups = this.user.assignedGroups.filter(v => {
          return v['group_id'] !== data.groupId
        })
      })
    }
  },
  beforeMount() {

  },
  mounted() {

  },
}
</script>

<style>
.user-icon {
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 10px 10px 10px;
}

.user-icon img {
  border-radius: 75px;
  width: 150px;
  height: 150px;
}

.user-data-container {
  border: 2px solid var(--stroke-separatot-primary);
  margin: 10px;
  justify-content: flex-start;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
  flex-grow: 1;
  max-width: 500px;
}

.user-data-container-header {
  font-size: 32px;
  color: var(--text-input);
  width: 100%;
}

.user-info-table {
  display: flex;
  flex-direction: column;
  font-size: 24px;
}

.user-info-table-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.user-info-table-row:hover {
  background: var(--background-accent-themed-alpha-10);
}

.user-info-line {
  margin: 5px;
  font-size: 24px;
  color: black;
  text-align: left;
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}

.custom-checkbox + label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.custom-checkbox:checked + label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

/* стили при наведении курсора на checkbox */
.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #b3d7ff;
}

/* стили для активного состояния чекбокса (при нажатии на него) */
.custom-checkbox:not(:disabled):active + label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}

/* стили для чекбокса, находящегося в фокусе */
.custom-checkbox:focus + label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox:focus:not(:checked) + label::before {
  border-color: #80bdff;
}

/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox:disabled + label::before {
  background-color: #e9ecef;
}

.ok-button {
  background: var(--button-background-themed);
  font-size: 24px;
  padding: 6px 18px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  outline: none;
  border: none;
}

input {
  background: var(--background-secondary);
  color: var(--text-input);
  font-size: 24px;
  padding: 5px 8px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
  border-right: 0px solid transparent;
  outline: none;
}

.hot-switch-user-line {
  display: flex;
  flex-direction: row;
  padding: 8px 15px;
}

.hot-switch-user-name {
  font-size: 20px;
  margin-right: 10px;
}

.hot-switch-user-remove-icon {
  margin-left: 10px;
  align-items: center;
  display: flex;
}

</style>