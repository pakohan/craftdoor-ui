<template>
  <div class="main">
    <span> Member: {{ member.name }} </span>
    <hr />
    <span>
      Selected roles:
    </span>
    <ul>
      <li v-for="mr in memberRoles" :key="mr">{{ mr }}</li>
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
            memberRole.role_id = role.id;
          "
          >{{ role.name }}</b-button
        >
      </li>
    </ul>
    <hr />
    <span>
      Keys:
    </span>
    <ul>
      <li v-for="key in keys" :key="key.id">
        <b-button @click="addKey(key)">{{ key.id }}</b-button>
      </li>
    </ul>
    <hr />
    <form>
      <span v-if="selectedRole">RoleID: {{ selectedRole.id }}</span>
      <b-button :disabled="!selectedRole" @click="addRole">Submit</b-button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Member, Role, MemberRole, Key } from "../interfaces/api";
import RoleHelper from "../helpers/roles.helper";
import MemberHelper from "../helpers/members.helper";
import KeyHelper from "../helpers/keys.helper";

@Component
export default class MemberEditor extends Vue {
  @Prop() member!: Member;
  memberRoles = [] as Role[];
  roles = [] as Role[];
  keys = [] as Key[];

  selectedRole = null as Role | null;
  memberRole = {
    member_id: this.member.id
  } as MemberRole;

  async addRole() {
    await MemberHelper.addRole(this.memberRole);
  }

  submit() {
    this.$emit("close");
  }

  async addKey(key: Key) {
    await KeyHelper.assignMember(key.id, this.member.id);
  }

  async mounted() {
    this.roles = await RoleHelper.list();
    this.keys = await KeyHelper.list();
    this.loadMemberRoles();
  }

  async loadMemberRoles() {
    this.memberRoles = await RoleHelper.listOfMember(this.member.id);
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
