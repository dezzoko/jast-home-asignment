import { Worker } from 'worker_threads';
import { aggregateSponsoredLinks } from '../utils/aggregate';

class SponsoredLinksService {
  async getSponsoredLinks(pages: number, keywords: string[]) {
    const workers = [];
    for (const keyword of keywords) {
      const worker = new Worker(
        './src/modules/sponsored-links/service/scrape-worker.ts'
      );
      worker.postMessage({ keyword, pages });

      workers.push(
        new Promise((resolve, reject) => {
          worker.on('message', (data) => {
            worker.terminate();
            resolve({ keyword, data });
          });
          worker.on('error', (error) => {
            worker.terminate();
            reject(error);
          });
          worker.on('exit', (code) => {
            if (code !== 0)
              reject(new Error(`Worker stopped with exit code ${code}`));
            worker.terminate();
          });
        })
      );
    }

    const adsArray = await Promise.all(workers);

    return aggregateSponsoredLinks(adsArray);
  }
}

export { SponsoredLinksService };
