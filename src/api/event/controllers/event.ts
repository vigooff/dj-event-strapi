import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('You must be logged in');

    // Menggunakan Document Service untuk mengambil data milik user yang sedang login
    const entities = await strapi.documents('api::event.event').findMany({
      filters: { 
        user: { id: { $eq: user.id } } 
      },
      populate: ['image', 'user'],
      sort: 'date:asc',
    });

    return entities;
  },

  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('You must be logged in');

    const { data } = ctx.request.body;
    const entity = await strapi.documents('api::event.event').create({
      data: {
        ...data,
        user: user.id, // Mengikat event ke user yang login
      },
      status: 'published',
      populate: ['image', 'user'],
    });

    return { data: entity };
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    const entity = await strapi.documents('api::event.event').update({
      documentId: id,
      data,
      status: 'published',
      populate: ['image', 'user'],
    });

    return { data: entity };
  },

  async delete(ctx) {
    const { id } = ctx.params;

    await strapi.documents('api::event.event').delete({
      documentId: id,
    });

    return { data: { message: 'Event removed successfully' } };
  },
}));