import puppeteer from "puppeteer";

const url = "https://www.eventbrite.com/o/ortliebs-lounge-19833288947";

const ortliebs = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const allShows = await page.evaluate(() => {
    const shows = document.querySelectorAll(".event-card");

    return Array.from(shows)
      .slice(0, 3)
      .map((show) => {
        const stripFormatting = (str) => {
          return str.replace(/ {4}|[\t\n\r]/gm, "");
        };

        const title = show.querySelector("h3").innerText;
        const date = stripFormatting(
          show.querySelector(".event-card-details div p").innerText
        );
        const url = show.querySelector("a").href;
        return { title, date, url };
      });
  });

  console.log(allShows);
};

export { ortliebs };
