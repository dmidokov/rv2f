<template>
  <div class="modal-back" v-if="show" @click.self="closeModal">
    <div class="modal modal-shadow" id="addGroup">
      <div class="modal-content-clock">
        <div class="modal-header">
          <div>New Group</div>
        </div>
        <div class="modal-centered">
          <input-standard
              v-model="groupName"
              placeholder="Name"
              inputid="group_name"
              inputname="group_new"
          />
        </div>
        <div class="modal-centered-wrap">
          <div class="modal-relative" v-for="right in rights">
            <div class="user-info-table-row">
              <input class="custom-checkbox" type="checkbox" :data-value="right.value" :id="right.name"
                     :name="right.name" @change="update" data-type="rights">
              <label :for="right.name">{{ right.name }}</label>
            </div>
          </div>
        </div>
        <div class="modal-centered">
          <button-add :button-text="addGroupText" @click="addGroup"/>
        </div>
      </div>
      <div class="modal-close-button" @click="closeModal">
        <img src="/icons/close-icon-red.svg">
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import InputStandard from "../Inputs/InputStandart.vue";
import InputStandardCentered from "../Inputs/InputStandartCentered.vue";
import ButtonAdd from "../Buttons/ButtonAdd.vue";
import {Helpers} from "../../js/Helpers"
import {Notification} from "../../js/Notification/Notification";
import {Groups, NewGroup} from "../../js/Groups";

export default {
  name: "ModalAddNewgroupanization",
  components: {ButtonAdd, InputStandard: InputStandard, InputStandardCentered: InputStandardCentered},
  emits: ['myEvent'],
  data() {
    return {
      show: false,
      groupName: "",
      groupHost: "",
      groupAdminName: "",
      groupAdminPassword: "",
      addGroupText: "Add",
      rights: [],
      newRights: 0,
    }
  },
  methods: {
    showModal() {
      let group = new Groups()
      if (this.rights.length == 0) {
        group.getAvailableRights().then(r => {
          this.rights = r
        })
      }

      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    loadRights() {

    },
    async addGroup() {
      this.unmarkFieldsWithError()

      let group = new Groups(
          this.groupName.trim(),
      )

      let check = group.checkFields()

      if (!check) {
        this.markFieldsWithError(group.getErrors())
        return;
      }

      let data: NewGroup = {
        name: group.name,
        rights: this.newRights,
      }
      let result = await group.create(data)

      if (result.status == "ok") {
        this.$emit('groupAdded', result.data)

        new Notification(
            Helpers.printf(
                'New group with name {1} was created',
                this.groupName.trim(),
            ),
            Notification.typeNotification,
            true,
            7000
        )

        this.closeModal()
      } else {
        new Notification(
            Helpers.printf(
                'The group was not created due to an error: {1}',
                result.error
            ),
            Notification.typeError,
            true,
            7000
        )
      }
    },
    markFieldsWithError(errors) {
      this.unmarkFieldsWithError()
      errors.forEach(
          error => {
            let message = ""
            switch (error) {
              case "name" :
                document.getElementById("group_name").classList.add("error-input")
                message = "InvalidgroupName"
                break
            }
            new Notification(message, Notification.typeWarning, true, 7000)
          }
      )
    },
    unmarkFieldsWithError() {
      let fields = document.getElementsByName("group_new")
      fields.forEach(field => {
        field.classList.remove("error-input")
      })
    },
    update(event) {

      let value = Number(event.target.getAttribute("data-value"))
      if (event.target.checked == true) {
        this.newRights = this.newRights | value
      } else {
        this.newRights = this.newRights & ~value
      }
    },
  }
}
</script>

<style scoped>
.modal {
  background: #535bf2;
  width: 700px;
  height: 500px;
  position: absolute;
  margin: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background: var(--background-content);
  justify-content: center;
  border-radius: 10px;
}

.modal-shadow {
  -webkit-box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-first);
  -moz-box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-first);
  box-shadow: 0px 0px 36px 27px var(--background-accent-themed-rgba-first);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  color: var(--text-black);
  margin-bottom: 13px;
}

.modal-centered {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.modal-centered-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
  margin: 5px;
  max-height: 20vh;
  overflow: auto;
  border: 1px solid gray;
}


.modal-relative {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
}

.modal-close-button {
  color: red;
  position: absolute;
  width: 48px;
  height: 48px;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.modal-close-button img {
  width: 48px;
  height: 48px;
}

.modal-close-button:hover {
  transition-duration: 0.5s;
  transform: rotate(45deg);
}

.modal-back {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  background: var(--background-table-row-light-alpha-24);
}

.error-input {
  border: 2px solid var(--button-background-negative)
}
</style>