import { decodeToken } from './../../auth/is-auth';
import { FCardMDB, FCardInput } from '../../models/flashcard';

export const insertFCard = async (newItemFCard: FCardInput): Promise<void> => {

  const token = newItemFCard.token;//store the token from the input
  const userSession = await decodeToken(token);//and then validates if is correct

  const newFCard = new FCardMDB({//instance a mongoose document model
    title: newItemFCard.title,
    content: newItemFCard.content,
    author: userSession.email
  })

  await newFCard.save(function (err) {//and store in the database
    if (err) return false;
    return true;
  });
}//works similar to the user method