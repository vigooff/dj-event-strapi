function slugify(text) {
  if (!text) return '';
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    
    if (data.name) {
      data.slug = slugify(data.name);
    }

    if (!data.user && event.state?.user) {
      data.user = event.state.user.id;
    }
  },
  
  async beforeUpdate(event) {
    const { data } = event.params;
    
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }
  },
};