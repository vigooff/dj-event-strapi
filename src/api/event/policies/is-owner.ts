export default (policyContext, config, { strapi }) => {
  const { userAbility } = policyContext.state;
  const { id } = policyContext.params;

 
  if (userAbility.can('manage', 'all')) {
    return true;
  }

 
  return strapi.db.query('api::event.event').findOne({
    where: { 
      id: id,
      user: policyContext.state.user.id 
    },
  }).then(event => {
    if (!event) {
      return false;
    }
    return true;
  });
};