import { Access } from "payload/types";

export const isUser: Access = ({ req: { user } }) => {
  return Boolean(user);
};
