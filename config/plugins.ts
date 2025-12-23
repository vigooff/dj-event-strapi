const { env } = require('@strapi/utils'); 

export default () => ({
    // ...
    upload: {
        provider: "cloudinary",
        providerOptions: {
            cloud_name: env("CLOUDINARY_NAME"),
            api_key: env("CLOUDINARY_KEY"),
            api_secret: env("CLOUDINARY_SECRET"),
        },
        actionOptions: {
            upload: {},
            delete: {},
        },
    },
    // ...
});