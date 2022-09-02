const puppeteer = require("puppeteer");
const fs = require("fs/promises");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.otomoto.pl/",{
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0
  });

   page.setDefaultNavigationTimeout(3000); 
  await page.screenshot({ path: "example.png" });

  const photos = await page.$$eval("article img", (text) => {
    return text.map((x) => x.src);
  });
  const carTitles = await page.$$eval(".ooa-j7qwjs h3", (text) => {
    return text.map((x) => x.innerText);
  });
  const carPrices = await page.$$eval(".evznqyf1 span", (text) => {
    return text.map((x) => x.innerText);
  });
  const dealOfTheDay = await page.$eval(
    ".e2nxjc60 h3",
    (text) => text.textContent
  );
  let result = [];
  //const mostPopularCar =await page.$$eval(".ooa-hpeugt div", (text) => text.innerHtml);
  const mostPopularCar = await page.$$eval(".e4b5enj1 div h4", (text) => {
    text.map((x) => {
      return x.innerText;
    });
  });

  const mostPopularCar1 = await page.$$eval(".e4b5enj1 div ol li", (text) => {
    return text.map((x) => x.innerText);
  });
  console.log(result);
  let arr = [];
  for (const photo of photos) {
    arr.push(photo);
  }
  await fs.writeFile("photo", photos.join("\r\n"));
  await fs.writeFile("carTitles", carTitles.join("\r\n"));
  await fs.writeFile("carPrices", carPrices.join("\r\n"));
  await fs.writeFile("dealOfTheDay", dealOfTheDay);
  //await page.click('button[role="button"]')
  await page.goto("https://www.otomoto.pl/osobowe",{
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0
  });
  // const button = await page.$(".ooa-1ralhqm button");
  // const f = await page.$("button[data-testid='submit-btn']")
  // await f.click();
  //await page.waitForNavigation();
  const mostPopularCarr= await page.$eval(".ooa-1uewmxv h1", (text) => text.innerText);


  const adscars = await page.$$eval(".e1b25f6f4 h2 a", (text) => {
    return text.map((x) => x.innerText);
  });
  const adscarsFeature = await page.$$eval(".ooa-ggoml6-Text", (text) => {
    return text.map((x) => x.innerText);
  });
  const adscarsInformation = await page.$$eval(".e1b25f6f6 li", (text) => {
    return text.map((x) => x.innerText);
  });
  const adscarsLocation = await page.$$eval(".ooa-1otyv8u-Text", (text) => {
    return text.map((x) => x.innerText);
  });
  const adscarsPrice = await page.$$eval(".ooa-1w7uott-Text", (text) => {
    return text.map((x) => x.innerText);
  });
  const adscarsOthersInfo = await page.$$eval(".ooa-1xh2xec-Text", (text) => {
    return text.map((x) => x.innerText);
  });
  const adscarspriceInfoothers = await page.$$eval(".fin_link_list_inside span", (text) => {
    return text.map((x) => x.innerText);
  });
  console.log(adscarspriceInfoothers)
  await fs.writeFile("adscars", adscars.join("\r\n"));
  await fs.writeFile("adscarsFeature", adscarsFeature.join("\r\n"));
  await fs.writeFile("adscarsInformation", adscarsInformation.join("\r\n"));
  await fs.writeFile("adscarsLocation", adscarsLocation.join("\r\n"));
  await fs.writeFile("adscarsPrice", adscarsPrice.join("\r\n"));
  await fs.writeFile("adscarsOthersInfo", adscarsOthersInfo.join("\r\n"));
  await fs.writeFile("adscarspriceInfoothers", adscarspriceInfoothers.join("\r\n"));


  await browser.close();
})();
