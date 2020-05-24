<template>
  <form @submit.prevent="submit">
    <b-field label="Name">
      <b-input type="text" v-model="name"></b-input>
    </b-field>
    <b-field>
      <b-button tag="input" native-type="submit"></b-button>
    </b-field>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CreateForm extends Vue {
  name = "" as string;

  submit() {
    this.$emit("submit", {
      name: this.name
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
