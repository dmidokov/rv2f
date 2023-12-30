<template>
  <div class="organizations-block">
    <div class="title">Organizations</div>
    <div class="organization-line ">
      <div class="table-cell">Name</div>
      <div class="table-cell">Host</div>
      <div class="table-cell">Create Time</div>
      <div class="table-cell">Update Time</div>
      <div class="table-cell">Actions</div>
    </div>
    <div class="organization-line organization-line-background" v-for="org in organizations">
      <div class="table-cell">{{ org.name }}</div>
      <div class="table-cell">{{ org.host }}</div>
      <div class="table-cell">{{ formatDate(org['create-time']) }}</div>
      <div class="table-cell">{{ formatDate(org['update-time']) }}</div>
      <div class="table-cell">
        <img
            :data-id="org.id"
            :data-name="org.name"
            src="/icons/close-icon-red.svg"
            @click="deleteOrganization"
        >
      </div>
    </div>
    <div class="buttons-block">
      <button-add
          :button-text="addNewOrgText"
          @click="openModal"
      />
    </div>
  </div>

  <modal-add-new-organization @orgAdded="pushOrganization" ref="modal"/>
  <confirmation
      :header="confirmationModalHeader"
      :action="confirmFunc"
      :confirmButtonTitle="confirmButtonTitle"
      @orgDeleted="loadOrganizations"
      ref="actionModal"
  />

</template>

<script>
import {Organizations} from "../js/Organizations";
import ButtonAdd from "./Buttons/ButtonAdd.vue";
import ModalAddNewOrganization from "./Modals/ModalAddNewOrganization.vue";
import Confirmation from "./Modals/Confirmation.vue";
import {ModalsManager} from "../js/ModalsManager";
import {Helpers} from "../js/Helpers";

export default {
  name: "Organizations",
  components: {ModalAddNewOrganization, ButtonAdd, Confirmation},
  data() {
    return {
      organizations: [],
      confirmationModalHeader: "Вы действительно хотите удалить компанию 'control'",
      deleteOrgId: -1,
      confirmFunc: null,
      confirmButtonTitle: "",
      modals: new ModalsManager(),
      addNewOrgText: "Add New"
    }
  },
  methods: {
    formatDate(time) {
      return Helpers.formatDate(time)
    },
    openModal() {
      this.$refs.modal.showModal()
      this.modals.add(this.$refs.modal.closeModal)
    },
    loadOrganizations() {
      let org = new Organizations()

      org.load().then(r => {
        this.organizations = r
      })
    },
    pushOrganization(e) {
      this.organizations.push(
          {
            'id': e.id,
            'host': e.host,
            'name': e.name,
            'creator': e.creator,
            'create-time': e['create-time'],
            'update-time': e['update-time'],
          }
      )
    },
    deleteOrganization(event) {
      this.$refs.actionModal.showModal()
      this.modals.add(this.$refs.actionModal.closeModal)

      this.confirmationModalHeader = "Вы действительно хотите удалить компанию " + event.target.getAttribute("data-name")
      this.confirmButtonTitle = "Yes"

      const companyId = event.target.getAttribute("data-id")

      this.confirmFunc = (function (context, Id) {
        const ctx = context;
        const companyId = Id;

        return (async function () {
          let org = new Organizations()

          const result = await org.delete(companyId)

          if (result) {
            ctx.loadOrganizations(ctx)
            ctx.$refs.actionModal.closeModal()
          }
        })
      })(this, companyId)
    },
    subscribeToEvent() {

      let eventSource = new EventSource("/sse/logout");

      eventSource.onmessage = function (event) {
        console.log("Новое сообщение", event.data);
      };
      // eventSource.addEventListener('bye', function(e) {
      //   console.log("Событие: bye, данные: " + e.data);
      // });
    },
    closeLast(event) {
      this.modals.closeLast(event)
    }
  },
  beforeMount() {
    this.subscribeToEvent()
    this.loadOrganizations()
    document.addEventListener("keyup", this.closeLast)
  }
}
</script>

<style scoped>
.organizations-block {
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

.organization-line {
  border-bottom: 1px solid var(--stroke-separatot-primary);
  width: 90%;
  flex-direction: row;
  display: flex;
  text-align: center;
  padding-top: 7px;
  padding-bottom: 7px;
  justify-content: space-between;
}

.organization-line-background:nth-child(odd) {
  background: var(--background-table-row-light-alpha-4);
}

.organization-line-background:nth-child(odd):hover {
  background: var(--background-table-row-light-alpha-8);
}

.organization-line-background:nth-child(even) {
  background: var(--background-table-row-light-alpha-4);
}

.organization-line-background:nth-child(even):hover {
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

.organization-actions img {
  width: 20px;
  cursor: pointer;
}

.organization-actions img:hover {
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
  right: 0%;
  padding: 10px;
}

</style>