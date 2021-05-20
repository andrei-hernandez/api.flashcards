import { IResolvers } from "graphql-tools";

// Los resolvers de las operaciones de consulta para devolver información
const queries: IResolvers = {
	Query: {
		accountLogIn(_: void, __: any): string {
			return 'accountLogIn'
		},
		getFlashCards(_: void, __: any): string {
			return 'getFlashCards'
		}
	}

};

export default queries;
