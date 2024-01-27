<template>
  <div class="modal-back" v-if="show" @click.self="closeModal">
    <div class="modal modal-shadow" id="addOrganizationModal">
      <div class="modal-content-clock">
        <div class="modal-header">
          <div>New Organization</div>
        </div>
        <div class="modal-centered">
          <input-standard
              v-model="orgName"
              placeholder="Name"
              inputid="org_name"
              inputname="org_new"
          />
        </div>
        <div class="modal-centered">
          <input-standard
              v-model="orgHost"
              placeholder="Host"
              inputid="org_host"
              inputname="org_new"
          />
        </div>
        <div class="modal-centered">
          <input-standard
              v-model="orgAdminName"
              placeholder="Admin Name"
              inputid="org_adm_name"
              inputname="org_new"
          />
        </div>
        <div class="modal-centered">
          <input-standard
              v-model="orgAdminPassword"
              placeholder="Admin Password"
              inputid="org_adm_pass"
              type="password"
              inputname="org_new"
          />
        </div>
        <div class="modal-centered">
          <button-add :button-text="addOrgText" @click="addOrganization"/>
        </div>
      </div>
      <div class="modal-close-button" @click="closeModal">
        <img src="/icons/close-icon-red.svg">
      </div>
    </div>
  </div>

</template>

<script>

import InputStandard from "../Inputs/InputStandart.vue";
import InputStandardCentered from "../Inputs/InputStandartCentered.vue";
import ButtonAdd from "../Buttons/ButtonAdd.vue";
import {Organizations} from "../../js/Organizations";
import {Helpers} from "../../js/Helpers"
import {Notification} from "../../js/Notification/Notification";

export default {
  name: "ModalAddNewOrganization",
  components: {ButtonAdd, InputStandard: InputStandard, InputStandardCentered: InputStandardCentered},
  emits: ['myEvent'],
  data() {
    return {
      show: false,
      orgName: "",
      orgHost: "",
      orgAdminName: "",
      orgAdminPassword: "",
      addOrgText: "Add",
    }
  },
  methods: {
    showModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    async addOrganization() {

      this.unmarkFieldsWithError()

      let org = new Organizations(
          this.orgName.trim(),
          this.orgHost.trim(),
          this.orgAdminName.trim(),
          this.orgAdminPassword.trim()
      )

      let check = org.checkFields()

      if (!check) {
        this.markFieldsWithError(org.getCheckErrors())
        return
      }

      let result = await org.create()

      if (result.ok) {
        this.$emit('orgAdded', result.data)

        new Notification(
            Helpers.printf(
                'New organization with name {1} and user {2} was created',
                this.orgName.trim(),
                this.orgAdminName.trim()),
            Notification.typeNotification,
            true,
            7000
        )

        this.closeModal()
      } else {
        new Notification(
            Helpers.printf(
                'The organization was not created due to an error: {1}',
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
                document.getElementById("org_name").classList.add("error-input")
                message = "InvalidOrgName"
                break
              case "host" :
                document.getElementById("org_host").classList.add("error-input")
                message = "InvalidOrgHost"
                break
              case "adminName" :
                document.getElementById("org_adm_name").classList.add("error-input")
                message = "InvalidOrgAdminName"
                break
              case "adminPassword" :
                document.getElementById("org_adm_pass").classList.add("error-input")
                message = "InvalidOrgAdminPassword"
                break
            }
            new Notification(message, Notification.typeWarning, true, 7000)
          }
      )
    },
    unmarkFieldsWithError() {
      let fields = document.getElementsByName("org_new")
      fields.forEach(field => {
        field.classList.remove("error-input")
      })
    }
  }
}
</script>

<style scoped>
.modal {
  background: #535bf2;
  width: 500px;
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