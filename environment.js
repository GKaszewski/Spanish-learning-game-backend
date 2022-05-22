const environment = {
  dev: {
    database: {
      host: "localhost",
      port: "5432",
      user: "",
      password: "",
      name: "spanish_api",
    },
    server: {
      host: "localhost",
      port: 8888,
    },
    secret: "secret",
  },
  production: {
    database: {
      host: "localhost",
      port: "5432",
      user: "",
      password: "",
      name: "spanish_api",
    },
    server: {
      host: "localhost",
      port: 8888,
    },
    secret: "",
  },
};

module.exports = environment;
