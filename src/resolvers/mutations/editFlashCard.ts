import { decodeToken } from "../../auth/is-auth";
import { FCardUpdateInput, FCardMDB } from "../../models/flashcard";

export const editFCard = async (fcard: FCardUpdateInput): Promise<boolean> => {
  const dToken = await decodeToken(fcard.token);
  if (!dToken) {
    return false;
  }
  const id = fcard._id;
  const updatedFCard = await FCardMDB.findByIdAndUpdate(id, { title: fcard.title, content: fcard.content });
  if (!updatedFCard) {
    return false;
  }
  return true;
}