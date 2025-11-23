import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';

import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { schema } from './schemas.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      const { query, variables } = req.body;

      const queryDoc = parse(query);

      const validationErrors = validate(schema, queryDoc);
      // const validationErrors = validate(schema, queryDoc, [depthLimit(5)]);

      if (validationErrors?.length > 0) {
        return { data: '', errors: validationErrors };
      }
      const { data, errors } = await graphql({
        schema,
        source: query,
        variableValues: variables,
      });

      return { data, errors };
    },
  });
};

export default plugin;
