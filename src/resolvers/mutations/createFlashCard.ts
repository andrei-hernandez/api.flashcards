import { decodeToken } from './../../auth/is-auth';
import { FCardMDB, FCardInput } from '../../models/flashcard';

export const insertFCard = async (newItemFCard: FCardInput): Promise<void> => {

  const token = newItemFCard.token;
  const userSession = await decodeToken(token);

  const newFCard = new FCardMDB({
    title: newItemFCard.title,
    content: newItemFCard.content,
    author: userSession.email
  })

  await newFCard.save(function (err) {
    if (err) return false;
    return true;
  });
}