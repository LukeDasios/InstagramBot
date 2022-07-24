const puppeteer = require("puppeteer");

const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://quotes.toscrape.com/");

  await page.click(`a[href="/login"`);

  await page.type("#username", "Luke_Das", { delay: 100 });
  await page.type("#password", "Password123", { delay: 100 });

  await page.click(`input[value="Login"`);
  // await browser.close();
};

main();
