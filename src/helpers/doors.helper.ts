import axios from "@/axios";
import { Door, DoorRole } from "@/interfaces/api";

const DoorHelper = {
  async create(t: Door): Promise<Door> {
    const url = `${CONFIG.API_ENDPOINT}/doors`;
    return await axios.post(url, t);
  },
  async addDoor(t: DoorRole): Promise<any> {
    const url = `${CONFIG.API_ENDPOINT}/roles/${t.role_id}/doors/${t.door_id}`;
    return await axios.post(url, t);
  },
  async list(): Promise<Door[]> {
    const url = `${CONFIG.API_ENDPOINT}/doors`;
    return await axios.get(url);
  },
  async update(t: Door) {
    const url = `${CONFIG.API_ENDPOINT}/doors/${t.id}`;
    return await axios.put(url, t);
  },
  async delete(id: number): Promise<Door> {
    const url = `${CONFIG.API_ENDPOINT}/doors/${id}`;
    return await axios.delete(url);
  }
};

export default DoorHelper;
