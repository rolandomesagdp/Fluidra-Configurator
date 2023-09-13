import { User } from "configurator-components";

export interface UserRequest {
   requestId: string;
   requestAmount: number;
   user: User
}