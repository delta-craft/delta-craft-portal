import { sanitizeHtml } from "./sanitizer";
import twemoji from "twemoji";
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

import { UserConnections } from "../../src/db/entities/UserConnections";
import { IPointSummary } from "../../src/models/types";
import { Teams } from "../../src/db/entities/Teams";
import endpoint from "../../src/utils/endpoints";

const getCss = (theme: string, fontSize: string, nick: string) => {
  let background = "white";
  let foreground = "black";
  let radial = "lightgray";

  if (theme === "dark") {
    background = "black";
    foreground = "white";
    radial = "dimgray";
  }
  return `

    body {
        background: none;
        height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .head {
        position: absolute;
        top: 1px;
        bottom: 1px;
        left: 1px;
        right: 1;
        width: 28px;
        image-rendering: pixelated;
    }

    .icon {
        color: #fff;
        position: absolute;
        bottom: -2px;
        right: -2px;
        image-rendering: pixelated;
    }

    `;
};

export const getHomeCardHtml = (
  nick: string,
  colour: "red" | "blue" | "black" | string = "black"
) => {
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss("dark", "52px", nick)}
    </style>
    <body>
        <img src="https://minotar.net/helm/${nick}/500.svg" class="head" />
        <img src="${endpoint}/icons/home_${colour}.svg" alt="..." height="14" class="icon" />
    </body>
</html>`;
};

const getImage = (src: string, width = "auto", height = "225") => {
  return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
};

const getPlusSign = (i: number) => {
  return i === 0 ? "" : '<div class="plus">+</div>';
};
