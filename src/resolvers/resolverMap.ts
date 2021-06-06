import { IResolvers } from 'graphql-tools';
import queries from './queries/query';
import mutations from './mutations';

const resolversMap: IResolvers = {
    ...queries,
    ...mutations
};
export default resolversMap;

//here are export the resolvers behaviour, i've divided in two: queries (only request data) and mutations (modify data)