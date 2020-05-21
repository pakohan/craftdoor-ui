<template>
  <div>
    test
    {{ resp.S }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "axios";

@Component({ components: {} })
export default class About extends Vue {
  resp = {
    ID: "00000000-0000-0000-0000-000000000000"
  };
  interval = 0 as number;
  mounted() {
    this.interval = setInterval(async () => {
      await Axios.get("http://192.168.178.21:8080/state", {
        params: {
          id: this.resp.ID
        }
      }).then(response => (this.resp = response.data));
    }, 1000);
  }

  destroyed() {
    clearInterval(this.interval);
  }
}
</script>

<style lang="scss" scoped></style>
