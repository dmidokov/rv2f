<script setup lang="ts">

</script>

<template>
  <div class="groups-block">
    <div class="title">Groups</div>
    <div class="group-line ">
      <div class="table-cell">Group Name</div>
      <div class="table-cell">Creator</div>
      <div class="table-cell">Actions</div>
    </div>
    <div class="group-line organization-line-background" v-for="group in groups">
      <div class="table-cell">{{ group['group_name'] }}</div>
      <div class="table-cell">{{ group['creator_name'] }}</div>
      <div class="table-cell">
        <img
            :data-id="group.group_id"
            src="/icons/close-icon-red.svg"
            @click="deleteGroup"
            alt="delete organization"
        >
      </div>
    </div>
    <div class="buttons-block">
      <button-add
          :button-text="addNewGroup"
          @click="openModal"
      />
    </div>
  </div>

  <modal-add-new-group @groupAdded="pushGroup" ref="modal"/>
</template>

<script lang="ts">
import {ModalsManager} from "../js/ModalsManager";
import {Groups} from "../js/Groups";
import Confirmation from "./Modals/Confirmation.vue";
import ModalAddNewGroup from "./Modals/ModalAddNewGroup.vue";
import ButtonAdd from "./Buttons/ButtonAdd.vue";
import {Notification} from "../js/Notification/Notification";

export default {
  name: 'UserGroups',
  components: {ModalAddNewGroup, ButtonAdd, Confirmation},
  data() {
    return {
      modals: new ModalsManager(),
      groups: [],
      addNewGroup: "Add New"
    }
  },
  methods: {
    loadUserGroups() {
      (new Groups()).load().then(r => {
        this.groups = r
      })

    },
    openModal() {
      this.$refs.modal.showModal()
      this.modals.add(this.$refs.modal.closeModal)
    },
    closeLast(event) {
      this.modals.closeLast(event)
    },
    pushGroup(event) {
      this.groups.push(
          {
            'group_name': event['group_name'],
            'group_id': event['group_id'],
            'creator_name': event['creator_name'],
          }
      )
    },
    deleteGroup(event) {
      const groupId = Number(event.target.getAttribute("data-id"))
      let groups = new Groups()
      groups.deleteGroup(groupId).then(r => {
        if (r.status) {
          this.groups = this.groups.filter(v => {
            return v['group_id'] !== groupId
          })
          new Notification(r.message, Notification.typeNotification, true, 5000)
        } else {
          new Notification(r.message, Notification.typeError, true, 5000)
        }
      })
    }
  },
  beforeMount() {
    this.loadUserGroups()
    document.addEventListener("keyup", this.closeLast)
  },
  beforeCreate() {

  }
}
</script>

<style scoped>

.groups-block {
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

.title {
  position: absolute;
  left: 15px;
  top: -45px;
  display: inline-block;
  font-size: 30px;
  color: var(--text-input);
}

.group-line {
  border-bottom: 1px solid var(--stroke-separatot-primary);
  width: 90%;
  flex-direction: row;
  display: flex;
  text-align: center;
  padding-top: 7px;
  padding-bottom: 7px;
  justify-content: space-between;
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


</style>