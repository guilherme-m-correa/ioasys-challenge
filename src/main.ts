import 'reflect-metadata';
import 'dotenv/config';
import App from './app';

(async function main() {
  if (process.env.NODE_ENV !== 'test') {
    const app = new App();
    await app.initialize();
  }
})();
