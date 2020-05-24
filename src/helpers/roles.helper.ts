import axios from "@/axios";
import { Role } from "@/interfaces/api";

const RoleHelper = {
  async create(t: Role): Promise<Role> {
    const url = `${CONFIG.API_ENDPOINT}/roles`;
    return await axios.post(url, t);
  },
  async list(): Promise<Role[]> {
    const url = `${CONFIG.API_ENDPOINT}/roles`;
    return await axios.get(url);
  },
  async update(t: Role) {
    const url = `${CONFIG.API_ENDPOINT}/roles/${t.id}`;
    return await axios.put(url, t);
  },
  async delete(id: number): Promise<Role> {
    const url = `${CONFIG.API_ENDPOINT}/roles/${id}`;
    return await axios.delete(url);
  }
};

export default RoleHelper;
