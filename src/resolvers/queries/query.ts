import { IResolvers } from "graphql-tools";
import { sessionData, UserMDB } from "../../models/user";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

// Los resolvers de las operaciones de consulta para devolver información
const queries: IResolvers = {
	Query: {
		accountLogIn: async (_: void, { user }): Promise<sessionData> => {
			const User = await UserMDB.findOne({ email: `${user.email}` });
			if (!user) {
				return { userId: 'login failed', token: '', tokenExpiration: -1 }
			}
			// @ts-ignore: Object is possibly 'null'.
			const isEqual = await compare(user.password, User.password);
			if (!isEqual) {
				console.log('falló en !isEqual');
				return { userId: 'login failed', token: '', tokenExpiration: -1 }
			}
			const token = sign({ userId: user._id, email: user.email }, 'somesupersecretkey', {
				expiresIn: '1h'
			});
			// @ts-ignore: Object is possibly 'null'.
			return { userId: User._id, token: token, tokenExpiration: 1 }
		},
		getFlashCards(_: void, __: any): string {
			return 'getFlashCards'
		}
	}

};

export default queries;
