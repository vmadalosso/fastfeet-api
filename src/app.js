import express from 'express'; // import express
import routes from './routes';

import './database';

// declare class App
class App {
  // constructor method
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // middlewares method
  middlewares() {
    this.server.use(express.json());
  }

  // routes method
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
