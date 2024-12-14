<template>
  <div class="page-content">
    <div class="content">
      <div class="modal">
        <div class="modal-header">
          <div>Вход Control</div>
        </div>
        <div class="modal-input">
          <input
              class="input"
              v-model="userName"
              placeholder="Login"
              id="userName"
          >
        </div>
        <div class="modal-input">
          <input
              class="input"
              v-model="userPass"
              placeholder="Password"
              id="userPass"
              type="password"
              @keyup.enter="signIn"
          >
        </div>
        <div class="modal-input">
          <button
              class="button"
              @click="signIn"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {Auth} from "../js/Auth"

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      userPass: ""
    }
  },
  methods: {
    signIn() {
      let auth = new Auth()
      auth.authorize(this.userName, this.userPass)
    },
  },
  mounted() {
    let eventSource = new EventSource("/sse/login");

    eventSource.onmessage = function (event) {
      console.log("Новое сообщение", event.data);
    };
  }
}

</script>

<style scoped>
.page-content {
  flex: 1;
}


.content {
  /* Фон контента страницы */

  /*width: 64.5%;*/
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background);
  /*border-left:10px solid var(--stroke-cyan);*/
  /*borber-color: var(--stroke-cyan);*/
}

.modal {
  /* Среднее модальное окно */

  display: flex;
  width: 489px;
  height: 452px;

  box-sizing: border-box;

  background: var(--background-content);

  border: 2px solid var(--stroke-separatot-primary);
  backdrop-filter: blur(5px);

  border-radius: 30px;

  flex-direction: column;

}

.modal-header {
  /* Заголовок модального окна */

  display: flex;
  align-items: center;
  justify-content: center;
  /* Вход Control */

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  /* identical to box height */

  color: var(--text-black);

  margin-top: 100px;
  margin-bottom: 13px;

}

.modal-input {
  /* Заголовок модального окна */
  justify-content: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;

  display: flex;
  align-items: center;

  margin-top: 13px;
  margin-bottom: 13px;

  color: var(--text-black);
}

.input {
  /* Поле для ввода */

  width: 345px;
  height: 43px;

  box-sizing: border-box;

  background: var(--background-secondary);

  border: 1px solid var(--stroke-field-border-alpha);
  border-radius: 10px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  padding-left: 15px;

  color: var(--text-input);

  outline: none;
}

.button {
  /* Кнопка с текстом */

  width: 345px;
  height: 43px;

  background: var(--button-background-themed);
  border-radius: 8px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  text-align: center;

  color: var(--text-white);
}

</style>