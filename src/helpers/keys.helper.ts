import axios from "@/axios";
import { Key } from "@/interfaces/api";

const KeyHelper = {
  async assignMember(keyId: number, memberId: number): Promise<any> {
    const url = `${CONFIG.API_ENDPOINT}/keys/${keyId}/member/${memberId}`;
    return await axios.post(url);
  },
  async list(): Promise<Key[]> {
    const url = `${CONFIG.API_ENDPOINT}/keys`;
    return await axios.get(url);
  }
};

export default KeyHelper;
