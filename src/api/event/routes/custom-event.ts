export default {
  routes: [
    {
      method: 'GET',
      path: '/events/me',
      handler: 'event.me',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/events/:id',
      handler: 'event.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/events/:id',
      handler: 'event.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};