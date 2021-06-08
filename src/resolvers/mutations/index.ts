import { IResolvers } from "graphql-tools";
import { FCardCreationData, FCardDeletionData, FCardEditionData } from "../../models/flashcard";
import { accountCreationData } from "../../models/user";
import { insertFCard } from "./createFlashCard";
import { insertUser } from "./createUser";
import { deleteFCard } from "./deleteFlashCard";
import { editFCard } from "./editFlashCard";

const mutations: IResolvers = {
  Mutation: {
    createUser: async (_: void, { user }): Promise<accountCreationData> => {// okay this verify if the data is correct
      const newItemUser = {
        userName: user.userName,
        email: user.email,
        password: user.password
      }
      const cAccount: accountCreationData = await insertUser(newItemUser); //calls the method for inster a user and then return if is correct or no
      return cAccount;
    },
    createFCard: async (_: void, { fcard }): Promise<FCardCreationData> => {//lol, this file does have a bit of congruence,
      const newItemFCard = { //creates a new objetc from the input
        title: fcard.title,
        content: fcard.content,
        token: fcard.token
      }
      const insertedCard: FCardCreationData = await insertFCard(newItemFCard); //calls the method for create a new card
      return insertedCard;
    },
    editFCard: async (_: void, { fcard }): Promise<FCardEditionData> => { //oh, the past Andi reads my mind hahahahaha
      const editionFCard: FCardEditionData = await editFCard(fcard);//calls the edit card method and then store in _edit_ and then validate if is true or false, tha
      return editionFCard
    },
    deleteFCard: async (_: void, { fcard }): Promise<FCardDeletionData> => {
      const deleteFard: FCardDeletionData = await deleteFCard(fcard);
      return deleteFard;
    }
  }
}


export default mutations;

//god, this is sooooo strange kill me please ): 
//i cant't remember how it works ): 
//anyways the object _Mutation: {}_ contains all mutation resolvers