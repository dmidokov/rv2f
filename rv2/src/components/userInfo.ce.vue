<template>
  <div class="user-icon">
    <img :src=prop1.icon :title="prop1.icon" alt="User Icon">
  </div>
  <div class="user-data-container">
    <div class="user-info-line user-name">
      <b>Login:</b> {{ prop1.userName }}
    </div>
    <div class="user-info-line">
      <b>Create date: </b>{{ new Date(prop1.createTime).toLocaleString().split(',')[0] }}
      <br>
      <b>Create time: </b>{{ new Date(prop1.createTime).toLocaleString().split(',')[1] }}
    </div>
    <div class="user-info-line">
      <b>Update date: </b>{{ new Date(prop1.updateTime).toLocaleString().split(',')[0] }}
      <br>
      <b>Update time: </b>{{ new Date(prop1.updateTime).toLocaleString().split(',')[1] }}
    </div>
    <div class="user-info-line">
      <b>Start page:</b> {{ prop1.startPage }}
    </div>

  </div>


  <div class="user-data-container">
    <div class="user-data-container-header">Rights</div>
    <div class="user-info-table" v-for="line in prop1.userRightsWithDesription">
      <div class="user-info-table-row">
        <input class="custom-checkbox" type="checkbox" :data-value="line.value" :id="line.name" :name="line.name"
               :checked="checkedBoxRights(line.value)" @change="update" data-type="rights">
        <label :for="line.name">{{ line.name }}</label>
      </div>
    </div>
  </div>


  <div class="user-data-container">
    <div class="user-data-container-header">Navigation</div>
    <div class="user-info-table" v-for="line in prop1.navigation">
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
      <input :id="`input`+prop1.id" type="select" list="hotSwitchUsers">
      <datalist id="hotSwitchUsers">
        <option :id="child.login" :data-id="child.id" v-for="child in prop1.childs">{{ child.login }}</option>
      </datalist>
      <button type="button" class="ok-button" @click="addToHotSwitch">Add</button>
    </div>
  </div>

</template>

<script>
import {Users} from "../js/Users";

export default {
  name: "userInfo",
  props: ["prop1", "userId"],
  methods: {
    checkedBoxRights(value) {
      return this.prop1.userRights != null && this.prop1.userRights.includes(value)
    },
    checkedBoxNavigation(value) {
      return value
    },
    update(event) {
      let users = new Users()
      let data = {
        "userId": Number(this.userId),
        "value": Number(event.target.getAttribute("data-value")),
        "set": event.target.checked
      }

      users.update(data, [{name: "field", value: event.target.getAttribute("data-type")}])
    },
    addToHotSwitch(event) {
      // TODO: Тут надо добавить запрос на добавление пользоваля в таблицу с быстрими сменами
      let users = new Users()

      let shadowRoot = document
          .getElementById("user-line-" + this.prop1.id)
          .shadowRoot

      let input = shadowRoot
          .getElementById("input" + this.prop1.id)
          .value

      let data = {
        "fromId": this.prop1.id,
        "toId": Number(shadowRoot.getElementById(input).getAttribute("data-id"))
      }

      users.addToSwitcher(data)

    }
  },
  beforeMount() {
    console.log(this.prop1)
  }
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
</style>