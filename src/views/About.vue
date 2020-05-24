<template>
  <div>
    Card available: {{ resp.is_card_available }}
    <br />
    <span v-for="(data, i) in resp.card_data" :key="i">block {{ i }}: {{ data }}<br /></span>
    <br />
    {{ resp.id }}
    <button @click="initCard">init card</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "@/axios";
import { State } from "@/interfaces/response";

@Component({ components: {} })
export default class About extends Vue {
  resp = {
    id: "00000000-0000-0000-0000-000000000000"
  } as State;
  poll = true;

  mounted() {
    this.poll = true;
    this.request();
  }

  async initCard() {
    await axios.post(`${CONFIG.API_ENDPOINT}/init`);
  }

  async request() {
    let timeout = 1000;
    try {
      await axios.get(`${CONFIG.API_ENDPOINT}/state`, {
        params: {
          id: this.resp.id
        }
      });
      timeout = 0;
    } catch (error) {
      console.log(error);
    } finally {
      if (this.poll) {
        setTimeout(this.request, timeout);
      }
    }
  }

  destroyed() {
    this.poll = false;
  }
}
</script>

<style lang="scss" scoped></style>
