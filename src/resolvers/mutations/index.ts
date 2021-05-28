import { IResolvers } from "graphql-tools";
import { insertFCard } from "./createFlashCard";
import { insertUser } from "./createUser";
import { editFCard } from "./editFlashCard";

const mutations: IResolvers = {
  Mutation: {
    createUser: async (_: void, { user }) => {
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
          await insertUser(newItemUser).catch((err: any) => console.log(err));
          return true;
        } catch (err) {
          return false;
        }
      }
    },
    createFCard: async (_: void, { fcard }) => {
      const newItemFCard = {
        title: fcard.title,
        content: fcard.content,
        token: fcard.token
      }
      if (newItemFCard.token === undefined) {
        return false;
      }
      if (newItemFCard.title === undefined && newItemFCard.content === undefined) {
        return false;
      } else {
        try {
          await insertFCard(newItemFCard).catch((err: any) => console.log(err));
          return true;
        } catch (err) {
          return false;
        }
      }
    },
    editFCard: async (_: void, { fcard }): Promise<boolean> => {
      const edit = await editFCard(fcard);
      if (!edit) {
        return false;
      }
      return true;
    }
  }
}

export default mutations;