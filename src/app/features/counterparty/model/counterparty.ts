import { Address } from "./address";

export class Counterparty {
  id: number;
  fullname: string;
  shortname: string;
  nip: string;
  bankAccountNumber: string;
  address: Address;
}