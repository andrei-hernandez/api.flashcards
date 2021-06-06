import { IResolvers } from "graphql-tools";
import { sessionData, UserMDB } from "../../models/user";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { FCardMDB, FCard } from "../../models/flashcard";
import { decodeToken } from "../../auth/is-auth";

// Los resolvers de las operaciones de consulta para devolver información
const queries: IResolvers = {
	Query: {
		accountLogIn: async (_: void, { user }): Promise<sessionData> => { //here has logged the user 
			const User = await UserMDB.findOne({ email: `${user.email}` }); //calls the mongoose model for a user to find the user email provided
			if (!user) {
				return { userId: 'login failed', token: '', tokenExpiration: -1 }
			}
			// @ts-ignore: Object is possibly 'null'. //ignore this please, i can't find another method u.u'
			const isEqual = await compare(user.password, User.password); //compare is a method from bcript to compare the encrypted password
			if (!isEqual) {
				console.log('falló en !isEqual');
				return { userId: 'login failed', token: '', tokenExpiration: -1 }
			}
			const token = sign({ userId: user._id, email: user.email }, 'somesupersecretkey', {//here create the jsw too the session and return the session data to the client
				expiresIn: '1h'//ignore the "somesupersecretkey"
			});
			// @ts-ignore: Object is possibly 'null'.
			return { userId: User._id, token: token, tokenExpiration: 1 }
		},
		getFlashCards: async (_: void, { token }): Promise<any> => {//gets all flashcards from a user
			const userS = decodeToken(token);//decode the tokjen
			const uEmail = userS?.email;//store the email was provided
			const results = await FCardMDB.find({ author: `${uEmail}` });//find all the cards was have the same email and strore in _results_
			return results; //return the results:D
		},
		getOneFlashCard: async (_void, { fcard }): Promise<FCard> => {
			const userS = await decodeToken(fcard.token); //calls the decode jwt function
			if (!userS) { //if the userSession is invalid return this object to the graphql query
				return {
					id: "-1",
					title: "invalid token",
					content: "",
					author: "",
					createdAt: "",
					updatedAt: ""
				}
			}
			const res = await FCardMDB.findById(fcard._id); //calls the mongoose model for a Flash card to find a single object with the provided id card and store in and if exists
			if (!res) { // store it in _res_
				return {
					id: "-1",
					title: "query error",
					content: "",
					author: "",
					createdAt: "",
					updatedAt: ""
				}
			}
			return res; //then return _res_ from the client
		}
	}
};

export default queries;


//okay this file so extrange XDDDDD
//the object _Query_ contains all query resolvers so, all querys works diferent because i created it in diffrent days and i can't remember how it worksXDDD;