import { decodeToken } from './../../auth/is-auth';
import { FCardMDB, FCardInput, FCardCreationData } from '../../models/flashcard';

export const insertFCard = async (newItemFCard: FCardInput): Promise<FCardCreationData> => {

  if (newItemFCard.token === undefined) {
    return { FCardHasCreated: false, err: { errorCode: 4, errorDesc: "token not provided" } };
  } //validates if the token exists
  if (newItemFCard.title === undefined && newItemFCard.content === undefined) { //validates if the object contains the necessary data; actually this should be removed
    return { FCardHasCreated: false, err: { errorCode: 5, errorDesc: "Undefined card data" } };
  }

  const token = newItemFCard.token;//store the token from the input
  const userSession = await decodeToken(token);//and then validates if is correct

  const newFCard = new FCardMDB({//instance a mongoose document model
    title: newItemFCard.title,
    content: newItemFCard.content,
    author: userSession.email
  })

  await newFCard.save(function (err) {//and store in the database
    if (err) return false;
  });
  return { FCardHasCreated: true };
}//works similar to the user method