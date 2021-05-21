import { IResolvers } from "graphql-tools";
import { insertUser } from "./createUser";

const mutations: IResolvers = {
  Mutation: {
    createUser(_: void, { user }) {
      const newItemUser = {
        userName: user.userName,
        email: user.email,
        password: user.password
      }

      if (newItemUser === undefined) {
        return {
          userName: 'u dont fill the form, error',
          email: '',
          password: '',
        }
      } else {
        try {
          insertUser(newItemUser).catch((err: any) => console.log(err));
          return true;
        } catch (err) {
          return false;
        }
      }
    }
  }
}

export default mutations;