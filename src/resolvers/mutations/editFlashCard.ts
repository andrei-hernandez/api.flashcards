import { decodeToken } from "../../auth/is-auth";
import { FCardUpdateInput, FCardMDB, FCardEditionData } from "../../models/flashcard";

export const editFCard = async (fcard: FCardUpdateInput): Promise<FCardEditionData> => {
  const dToken = await decodeToken(fcard.token);//validate if the token is correct with jsonwebtoken and store in _dToken_
  if (!dToken) {
    return { FCardHasEdited: false, err: { errorCode: 4, errorDesc: "Token was not provided" } };
  }
  const id = fcard._id; //store the card id that should be edited
  const updatedFCard = await FCardMDB.findByIdAndUpdate(id, { title: fcard.title, content: fcard.content });//calls the mongoose model and store the respons
  if (!updatedFCard) {//and then validate if has correct :D
    return { FCardHasEdited: false, err: { errorCode: 6, errorDesc: "Error was occurred, try again" } };
  }
  return { FCardHasEdited: true };
}