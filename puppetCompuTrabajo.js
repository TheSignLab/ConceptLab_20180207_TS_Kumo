const puppeteer = require("puppeteer");

var username = "miguelmayorga2014@gmail.com";
var password = "JUGUETICO2018";
var url = "https://www.computrabajo.com.co";

const USERNAME_SELECTOR = "#txEmail";
const PASSWORD_SELECTOR = "#txPwd";
const INPUTBUTTON_SELECTOR = "#btnLogin";

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.click(".logintoggle");
  await page.click(USERNAME_SELECTOR);

  await page.keyboard.type(username);

  await page.click(PASSWORD_SELECTOR);

  await page.keyboard.type(password);

  await page.click(INPUTBUTTON_SELECTOR);

  await page.click("");
})();
