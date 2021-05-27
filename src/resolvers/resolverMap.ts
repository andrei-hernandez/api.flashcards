import { IResolvers } from 'graphql-tools';
import queries from './queries/query';
import type from './type';
import mutations from './mutations';

const resolversMap: IResolvers = {
    ...queries,
    ...type,
    ...mutations
};
export default resolversMap;

//aquí mapeamos los resolvers.