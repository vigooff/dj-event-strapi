module.exports = (plugin) => {
  // Override register controller
  const originalRegister = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx) => {
    // Call original register
    await originalRegister(ctx);

    // If registration successful, update role to authenticated
    if (ctx.response && ctx.response.body && ctx.response.body.user) {
      try {
        // Get authenticated role
        const authenticatedRole = await strapi
          .query('plugin::users-permissions.role')
          .findOne({ where: { type: 'authenticated' } });

        if (authenticatedRole) {
          // Update user role
          await strapi.entityService.update(
            'plugin::users-permissions.user',
            ctx.response.body.user.id,
            {
              data: { role: authenticatedRole.id },
            }
          );

          console.log('✅ User role updated to Authenticated');
          
          // Update response
          ctx.response.body.user.role = authenticatedRole;
        }
      } catch (error) {
        console.error('❌ Error updating user role:', error);
      }
    }

    return ctx;
  };

  return plugin;
};