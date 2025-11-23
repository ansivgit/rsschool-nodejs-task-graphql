import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';

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
      // console.log('Query:', schema);
      const { data, errors } = await graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
      });

      console.log(555, data, errors);

      return { data, errors };
    },
  });
};

export default plugin;
