<script>
import LeftBar from "./Leftbar.vue";
import Organizations from "./Organizations.vue";
import {Auth} from "../js/Auth";
import {Requests} from "../js/Requests";

export default {
  name: "Main",
  components: {Organizations, LeftBar},
  methods: {
  },
  beforeMount() {
    setInterval(()=> function () {
      if ((new Auth()).authCheck()) {
        console.log("Redirect")
      } else {
        console.log("Not redirect")
      }
    }, 1000),
    this.subscribeToEvent()
  }
}

</script>

<template>
  <LeftBar/>
  <Organizations/>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

div {
  /*border: 1px solid rebeccapurple;*/
}
</style>
