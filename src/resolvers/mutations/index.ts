import { IResolvers } from "graphql-tools";
import { insertFCard } from "./createFlashCard";
import { insertUser } from "./createUser";
import { deleteFCard } from "./deleteFlashCard";
import { editFCard } from "./editFlashCard";

const mutations: IResolvers = {
  Mutation: {
    createUser: async (_: void, { user }) => {// okay this verify if the data is correct
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
        try {//should be create a promise for this instead this trycatch , anyways
          await insertUser(newItemUser).catch((err: any) => console.log(err)); //calls the method for inster a user and then return if is correct or no
          return true;
        } catch (err) {
          return false;
        }
      }
    },
    createFCard: async (_: void, { fcard }) => {//lol, this file does have a bit of congruence,
      const newItemFCard = { //creates a new objetc from the input
        title: fcard.title,
        content: fcard.content,
        token: fcard.token
      }
      if (newItemFCard.token === undefined) {
        return false;
      } //validates if the token exists
      if (newItemFCard.title === undefined && newItemFCard.content === undefined) { //validates if the object contains the necessary data; actually this should be removed
        return false;
      } else {
        try {
          await insertFCard(newItemFCard).catch((err: any) => console.log(err)); //calls the method for create a new card
          return true;
        } catch (err) {
          return false;
        }
      }
    },
    editFCard: async (_: void, { fcard }): Promise<boolean> => { //oh, the past Andi reads my mind hahahahaha
      const edit = await editFCard(fcard);//calls the edit card method and then store in _edit_ and then validate if is true or false, tha
      if (!edit) {
        return false;
      }
      return true;
    },
    deleteFCard: async (_: void, { fcard }): Promise<boolean> => {// here so, calls the delete method and, woks really same
      const edit = await deleteFCard(fcard);
      if (!edit) {
        return false;
      }
      return true;
    }
  }
}

export default mutations;

//god, this is sooooo strange kill me please ): 
//i cant't remember how it works ): 
//anyways the object _Mutation: {}_ contains all mutation resolvers