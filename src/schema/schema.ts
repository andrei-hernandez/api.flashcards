import 'graphql-import-node';
import typeDefs from './schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import resolvers from '../resolvers/resolverMap';

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;


//here imports the typedefs is a skeleton from the api grapqhl`
//resolvers is an explicit name for the behaviour of the grapqhl queries