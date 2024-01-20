<template>
  <div class="branches-block">
    <div class="title">Branches</div>
    <div class="branch-line ">
      <div class="table-cell">Name</div>
      <div class="table-cell">Address</div>
      <div class="table-cell">Phone</div>
      <div class="table-cell">Work Time</div>
      <div class="table-cell">Create Time</div>
      <div class="table-cell">Update Time</div>
      <div class="table-cell">Actions</div>
    </div>
    <div class="branch-line branch-line-background" v-for="branch in branches">
      <div class="table-cell">{{ branch.name }}</div>
      <div class="table-cell">{{ branch.address }}</div>
      <div class="table-cell">{{ branch['phone'] }}</div>
      <div class="table-cell">{{ branch['workTime'] }}</div>
      <div class="table-cell">{{ branch['createTime'] }}</div>
      <div class="table-cell">{{ branch['updateTime'] }}</div>
      <div class="table-cell">
        <img
            :data-id="branch.id"
            :data-name="branch.name"
            src="/icons/close-icon-red.svg"
            @click="deleteBranch"
        >
      </div>
    </div>
    <div class="buttons-block">
      <button-add
          :button-text="addNewBranchText"
          @click="openModal"
      />
    </div>
  </div>

  <modal-add-new-branch @orgAdded="loadBranches" ref="modal"/>
  <confirmation
      :header="confirmationModalHeader"
      :action="confirmFunc"
      :confirmButtonTitle="confirmButtonTitle"
      @orgDeleted="loadBranches"
      ref="actionModal"
  />

</template>

<script>
import {Branches} from "../js/Branches";
import ButtonAdd from "./Buttons/ButtonAdd.vue";
import ModalAddNewBranch from "./Modals/ModalAddNewBranch.vue";
import Confirmation from "./Modals/Confirmation.vue";
import {ModalsManager} from "../js/ModalsManager";
import {Organizations} from "../js/Organizations";

export default {
  // todo: add ESC event for window closing
  name: "Branches",
  components: {ButtonAdd, ModalAddNewBranch, Confirmation},
  data() {
    return {
      branches: "",
      addNewBranchText: "Add New",
      modals: new ModalsManager(),
      confirmationModalHeader: "",
      confirmFunc: null,
      confirmButtonTitle : "",
    }
  },
  methods: {
    openModal() {
      this.$refs.modal.showModal()
      this.modals.add(this.$refs.modal.closeModal)
    },
    loadBranches() {
      let branches = new Branches()

      branches.load().then(r => {
        for (let i in r) {
          if (r[i].hasOwnProperty("createTime") && r[i].hasOwnProperty("updateTime")) {
            r[i]["createTime"] = new Date(r[i]["createTime"] * 1000).toLocaleString()
            r[i]["updateTime"] = new Date(r[i]["updateTime"] * 1000).toLocaleString()
          }
        }

        this.branches = r
      })
    },
    deleteBranch(event) {
      this.$refs.actionModal.showModal()
      this.modals.add(this.$refs.actionModal.closeModal)

      this.confirmationModalHeader = "Вы действительно хотите удалить компанию " + event.target.getAttribute("data-name")
      this.confirmButtonTitle = "Yes"

      const companyId = event.target.getAttribute("data-id")

      this.confirmFunc = (function (context, Id) {
        const ctx = context;
        const companyId = Id;

        return (async function () {
          let branch = new Branches()

          const result = await branch.delete(companyId)

          if (result) {
            ctx.loadBranches(ctx)
            ctx.$refs.actionModal.closeModal()
          }
        })
      })(this, companyId)
    },
  },
  beforeMount() {
    this.loadBranches()
  }
}
</script>

<style scoped>
.branches-block {
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

.branch-line {
  border-bottom: 1px solid var(--stroke-separatot-primary);
  width: 90%;
  flex-direction: row;
  display: flex;
  text-align: center;
  padding-top: 7px;
  padding-bottom: 7px;
  justify-content: space-between;
}

.branch-line-background:nth-child(odd) {
  background: var(--background-table-row-light-alpha-4);
}

.branch-line-background:nth-child(odd):hover {
  background: var(--background-table-row-light-alpha-8);
}

.branch-line-background:nth-child(even) {
  background: var(--background-table-row-light-alpha-4);
}

.branch-line-background:nth-child(even):hover {
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

.buttons-block {
  position: absolute;
  top: 100%;
  right: 0%;
  padding: 10px;
}
.title {
  position: absolute;
  left: 15px;
  top: -45px;
  display: inline-block;
  font-size: 30px;
  color: var(--text-input);
}
</style>