<template>
  <div class="main">
    <span> Door: {{ door.name }} </span>
    <span>
      Selected roles:
    </span>
    <ul>
      <li v-for="dr in doorRoles" :key="dr.door_id + '-' + dr.role_id">{{ dr }}</li>
    </ul>
    <hr />
    <span>
      Available roles:
    </span>
    <ul>
      <li v-for="role in roles" :key="role.id">
        <b-button
          @click="
            selectedRole = role;
            doorRole.role_id = role.id;
          "
          >{{ role.name }}</b-button
        >
      </li>
    </ul>
    <hr />
    <form>
      <span v-if="selectedRole">RoleID: {{ selectedRole.id }}</span>
      <b-button :disabled="!selectedRole" @click="addDoor">Submit</b-button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Role, DoorRole, Door } from "../interfaces/api";
import RoleHelper from "../helpers/roles.helper";
import DoorHelper from "../helpers/doors.helper";

@Component
export default class DoorEditor extends Vue {
  @Prop() door!: Door;
  doorRoles = [] as Role[];
  roles = [] as Role[];

  selectedRole = null as Role | null;
  doorRole = {
    door_id: this.door.id
  } as DoorRole;

  async addDoor() {
    await DoorHelper.addDoor(this.doorRole);
  }

  submit() {
    this.$emit("close");
  }

  async mounted() {
    this.roles = await RoleHelper.list();
    this.loadMemberRoles();
  }

  async loadMemberRoles() {
    this.doorRoles = await RoleHelper.listOfDoor(this.door.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
