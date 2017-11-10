const DefaultHeadData = {
  title: 'MERN',
  titleTemplate: '%s - Blog App',
  meta: [
    { charset: 'utf-8' },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
  link: [
    {
      href: 'https://fonts.googleapis.com/css?family=Lato:400,300,700',
      rel: 'stylesheet',
      type: 'text/css',
    },
    {
      href: 'http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png',
      rel: 'shortcut icon',
      type: 'image/png',
    },
  ],
};

export default DefaultHeadData;
