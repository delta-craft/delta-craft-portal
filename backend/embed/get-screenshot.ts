// const core = require("puppeteer-core");
// const chrome = require("chrome-aws-lambda");
import * as playwright from "playwright-aws-lambda";

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

// export const getOptions = async (isDev: boolean) => {
//   let options: Options;
//   if (isDev) {
//     options = {
//       args: [],
//       executablePath: exePath,
//       headless: true,
//     };
//   } else {
//     options = {
//       args: chrome.args,
//       executablePath: await chrome.executablePath,
//       headless: chrome.headless,
//     };
//   }
//   return options;
// };

const getBrowser = async (isDev: boolean) => {
  // const options = await getOptions(isDev);
  // const browser = await core.launch(options);

  const browser = await playwright.launchChromium();
  return browser;
};

export const getScreenshot = async (
  html: string,
  isDev: boolean,
  transparentBackground: boolean = false,
  width: number = 2048,
  height: number = 1170
) => {
  const browser = await getBrowser(isDev);
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  // const page = await browser.newPage();
  await page.setViewportSize({ width, height });
  await page.setContent(html);
  const file = await page.screenshot({
    type: "png",
    omitBackground: transparentBackground,
  });
  await browser.close();
  return file;
};
