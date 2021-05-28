import { decodeToken } from "../../auth/is-auth";
import { FCardUpdateInput, FCardMDB } from "../../models/flashcard";

export const deleteFCard = async (fcard: FCardUpdateInput): Promise<boolean> => {
  const dToken = await decodeToken(fcard.token);
  if (!dToken) {
    return false;
  }
  const id = fcard._id;
  const deletedFCard = await FCardMDB.findByIdAndDelete(id);
  if (!deletedFCard) {
    return false;
  }
  return true;
}