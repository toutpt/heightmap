module.exports = {
  use: [
    [
      '@neutrinojs/preact',
      {
        html: {
          title: 'heightmap'
        }
      }
    ],
    '@neutrinojs/jest',
    ['@neutrinojs/html-template', {
      title: 'Heightmap from BDAlti',
      scripts: [
        'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js',
      ],
      links: [
        'https://unpkg.com/normalize.css@8.0.1/normalize.css',
        'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css',
      ],
      // googleAnalytics
    }]
  ]
};
