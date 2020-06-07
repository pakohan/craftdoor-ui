<template>
  <div>
    Members:
    <CreateForm @submit="submitMember" />
    <ul>
      <li v-for="member in members" :key="member.id">
        <b-button tag="a" @click="editMember(member)">{{ member.id }}: {{ member.name }}</b-button>
        <b-button @click="deleteMember(member.id)">Delete</b-button>
      </li>
    </ul>
    <hr />
    Doors:
    <CreateForm @submit="submitDoor" />
    <ul>
      <li v-for="door in doors" :key="door.id">
        <b-button tag="a" @click="editDoor(door)">{{ door.id }}: {{ door.name }}</b-button>
        <b-button @click="deleteDoor(door.id)">Delete</b-button>
      </li>
    </ul>
    <hr />
    Roles:
    <CreateForm @submit="submitRole" />
    <ul>
      <li v-for="role in roles" :key="role.id">
        {{ role.id }}: {{ role.name }}
        <b-button @click="deleteRole(role.id)">Delete</b-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Member, Door, Role } from "@/interfaces/api";
import CreateForm from "@/components/CreateForm.vue";
import DoorHelper from "@/helpers/doors.helper";
import MemberHelper from "@/helpers/members.helper";
import RoleHelper from "@/helpers/roles.helper";
import MemberEditor from "../components/MemberEditor.vue";
import DoorEditor from "../components/DoorEditor.vue";

@Component({
  components: { CreateForm }
})
export default class Home extends Vue {
  members = [] as Member[];
  doors = [] as Door[];
  roles = [] as Role[];

  async submitMember(t: Member) {
    await MemberHelper.create(t);
    this.load();
  }

  async deleteMember(id: number) {
    await MemberHelper.delete(id);
    this.load();
  }

  async submitDoor(t: Door) {
    await DoorHelper.create(t);
    this.load();
  }

  async deleteDoor(id: number) {
    await DoorHelper.delete(id);
    this.load();
  }

  async submitRole(t: Role) {
    await RoleHelper.create(t);
    this.load();
  }

  async deleteRole(id: number) {
    await RoleHelper.delete(id);
    this.load();
  }

  editMember(member: Member) {
    this.$buefy.modal.open({
      component: MemberEditor,
      props: { member },
      parent: this
    });
  }

  editDoor(door: Door) {
    this.$buefy.modal.open({
      component: DoorEditor,
      props: { door },
      parent: this
    });
  }

  async load() {
    this.members = await MemberHelper.list();
    this.doors = await DoorHelper.list();
    this.roles = await RoleHelper.list();
  }

  async mounted() {
    this.load();
  }
}
</script>
