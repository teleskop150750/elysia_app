import Elysia from 'elysia';
import { z } from 'zod';
import { CustomerMock, CustomerSchema } from './schemas';

export const customers = new Elysia().post(
  '/api/v2/workspace/:workspaceId/customer-list/get',
  () => {
    return {
      success: true,
      data: [CustomerMock],
    };
  },
  {
    tags: ['Customers'],
    response: {
      200: z.strictObject({
        success: z.boolean(),
        data: z.array(CustomerSchema),
      }),
    },
  },
);
