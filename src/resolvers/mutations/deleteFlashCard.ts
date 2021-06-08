import { decodeToken } from "../../auth/is-auth";
import { FCardUpdateInput, FCardMDB, FCardDeletionData } from "../../models/flashcard";

export const deleteFCard = async (fcard: FCardUpdateInput): Promise<FCardDeletionData> => {
  const dToken = await decodeToken(fcard.token);
  if (!dToken) {
    return { FCardHasDeleted: false, err: { errorCode: 4, errorDesc: "Token was not provided" } };
  }
  const id = fcard._id;
  const deletedFCard = await FCardMDB.findByIdAndDelete(id);
  if (!deletedFCard) {
    return { FCardHasDeleted: false, err: { errorCode: 6, errorDesc: "Error was occurred, try again" } };
  }
  return { FCardHasDeleted: true };
}
//basically woks same at the create mutation method, so here find with the id was provided and... delete it