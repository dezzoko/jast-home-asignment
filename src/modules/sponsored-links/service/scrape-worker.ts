const { parentPort } = require('worker_threads');
const { Browser } = require('puppeteer');
const puppeteer = require('puppeteer');

async function scrapeAds(keyword, pages) {
  const browser = await puppeteer.launch();
  const ads = {
    Google: [],
    Yahoo: [],
    Bing: [],
  };

  try {
    const promises = [];

    promises.push(scrapeGoogle(keyword, pages, ads, browser));

    promises.push(scrapeYahoo(keyword, pages, ads, browser));

    promises.push(scrapeBing(keyword, pages, ads, browser));

    await Promise.all(promises);
  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    await browser.close();
    return ads;
  }
}

async function scrapeGoogle(keyword, pages, ads, browser) {
  const page = await browser.newPage();
  for (let i = 0; i < pages; i++) {
    await page.goto(
      `https://www.google.com/search?q=${encodeURIComponent(keyword)}&start=${i * 10}`
    );

    const adLinks = await page.$$eval('a.plantl[data-impdclcc="1"]', (ads) => {
      return ads.map((ad) => ad.href);
    });

    const uniqueAdLinks = Array.from(new Set(adLinks));

    ads.Google.push(...uniqueAdLinks);
  }
  await page.close();
}

async function scrapeYahoo(keyword, pages, ads, browser) {
  const page = await browser.newPage();

  for (let i = 0; i < pages; i++) {
    await page.goto(
      `https://search.yahoo.com/search?p=${encodeURIComponent(keyword)}&b=${i * 10 + 1}`
    );
    if (i === 0) {
      await page.$$eval('button.reject-all', (buttons) => {
        buttons.forEach((button) => {
          button.click();
        });
      });
      await page.waitForNavigation();
    }

    const links = await page.$$eval('ol.searchCenterTopAds a', (elements) => {
      return elements.map((element) => element.href);
    });

    ads.Yahoo.push(...links);
  }
  await page.close();
}

async function scrapeBing(keyword, pages, ads, browser) {
  const page = await browser.newPage();

  for (let i = 0; i < pages; i++) {
    await page.goto(
      `https://www.bing.com/search?q=${encodeURIComponent(keyword)}&first=${i * 10 + 1}`
    );

    const links = await page.$$eval('[data-codexads] a', (elements) => {
      return elements.map((element) => element.href);
    });

    ads.Bing.push(...links.filter((link) => link !== 'javascript:void(0)'));
  }
  await page.close();
}

if (parentPort) {
  parentPort.on('message', async (message) => {
    const ads = await scrapeAds(message.keyword, message.pages);
    parentPort.postMessage(ads);
  });
}
