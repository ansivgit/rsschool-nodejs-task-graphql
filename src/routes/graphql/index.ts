import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from 'graphql';

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
      const { data, errors } = await graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
      });

      return { data, errors };
    },
  });
};

export default plugin;
