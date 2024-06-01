module.exports = ({ env }) => ({
  upload: {
    provider: 'local',
    providerOptions: {
      sizeLimit: 10000000, // Set the size limit for uploads
    },
  },
});
