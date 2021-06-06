import { decodeToken } from "../../auth/is-auth";
import { FCardUpdateInput, FCardMDB } from "../../models/flashcard";

export const editFCard = async (fcard: FCardUpdateInput): Promise<boolean> => {
  const dToken = await decodeToken(fcard.token);//validate if the token is correct with jsonwebtoken and store in _dToken_
  if (!dToken) {
    return false;
  }
  const id = fcard._id; //store the card id that should be edited
  const updatedFCard = await FCardMDB.findByIdAndUpdate(id, { title: fcard.title, content: fcard.content });//calls the mongoose model and store the respons
  if (!updatedFCard) {//and then validate if has correct :D
    return false;
  }
  return true;
}