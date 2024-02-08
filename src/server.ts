import dotenv from 'dotenv';
import App from './app';
import { SponsoredLinksController } from './modules/sponsored-links/controller';
dotenv.config();

const app = new App([new SponsoredLinksController()]);
app.listen();
