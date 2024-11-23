import puppeteer from "puppeteer";

const url = "https://johnnybrendas.com/events/";

const johnnyBrendas = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const allShows = await page.evaluate(() => {
    const shows = document.querySelectorAll(".eventWrapper");

    return Array.from(shows)
      .slice(0, 3)
      .map((show) => {
        const stripFormatting = (str) => {
          return str.replace(/ {4}|[\t\n\r]/gm, "");
        };

        const title = show.querySelector("a").title;
        const date = stripFormatting(
          show.querySelector(".singleEventDate").innerText
        );
        const subHeader = stripFormatting(
          show.querySelector(".eventSubHeader").innerText
        );
        const url = show.querySelector("a").href;
        return { title, subHeader, date, url };
      });
  });

  console.log(allShows);
};

export { johnnyBrendas };
