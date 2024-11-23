import puppeteer from "puppeteer";

const url = "https://www.utphilly.com/calendar/";

const unionTransfer = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const allShows = await page.evaluate(() => {
    const shows = document.querySelectorAll(".c-axs-event-card__wrapper");

    return Array.from(shows)
      .slice(0, 3)
      .map((show) => {
        const stripFormatting = (str) => {
          return str.replace(/ {4}|[\t\n\r]/gm, "");
        };

        const title = show.querySelector(".c-axs-event-card__title");

        const subHeader = stripFormatting(
          show.querySelector(".c-axs-event-card__supporting-text")
        );
        const date = stripFormatting(
          show.querySelector(".c-axs-event-card__date date")
        );
        const url = show.querySelector("a").href;
        return { title, subheader, date, url };
      });
  });

  console.log(allShows);
};

export { unionTransfer };
