import { Controller } from 'core/interfaces';
import { Router, Request, Response } from 'express';
import { SponsoredLinksService } from '../service';

class SponsoredLinksController implements Controller {
  public path = '/sponsored-links';
  public router: Router = Router();
  public sponsoredLinksService = new SponsoredLinksService();

  constructor() {
    this.getSponsoredLinks = this.getSponsoredLinks.bind(this);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.getSponsoredLinks);
  }

  private async getSponsoredLinks(request: Request, response: Response) {
    const { pages, keywords } = request.query;

    const pagesNum = parseInt(pages as string, 10) || 10;
    const keywordsArray = (keywords as string).split(', ');

    const resultOfSearch = await this.sponsoredLinksService.getSponsoredLinks(
      pagesNum,
      keywordsArray
    );

    return response.send(resultOfSearch);
  }
}

export { SponsoredLinksController };
