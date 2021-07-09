import { sanitizeHtml } from "./sanitizer";

import { UserConnections } from "../../src/db/entities/UserConnections";
import { IPointSummary } from "../../src/models/types";

const getCss = (theme: string, fontSize: string) => {
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
        background-image: url('https://portal.deltacraft.eu/img/banner.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        margin: 0;
        padding: 0;
        font-family: Roboto, sans-serif;
    }

    .overlay {
        background: #000000aa;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
        width: 100%;
    }

    .flex {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }

    .flex-row {
        flex-direction: row;
    }

    .flex-column {
        flex-direction: column;
    }

    .justify-around {
        justify-content: space-around;
    }

    .container {
    }

    .w-100 {
        width: 100%;
    }

    .points > div {
        color: #fff;
        overflow: hidden;
        font-size: 26px;
    }

    .progress {
        display: flex;
        height: 10px;
        overflow: hidden;
        font-size: 0.75rem;
        background-color: #eeeeee;
        border-radius: 0.25rem;
    }

    .progress-bar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        background-color: #1266f1;
    }

    .bkg-mining {
        background-color: #33bbee !important;
    }

    .bkg-crafting {
        background-color: #ee7733 !important;
    }

    .bkg-warfare {
        background-color: #cc3311 !important;
    }

    .bkg-journey {
        background-color: #ee3377 !important;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }



    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .deltacraft-logo {
        position: absolute;
        height: 200px;
        top: 20px;
        right: 50px;
    }

    
    .heading-team {
        font-size: 34px;
        color: ${foreground};
    }
    
    .heading {
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }`;
};

export const getUserCardHtml = (
  uc: UserConnections,
  summary: IPointSummary,
  ratios: IPointSummary
) => {
  //const { text, theme, md, fontSize, images, widths, heights } = parsedReq;
  const { name, team } = uc;

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss("dark", "52px")}
    </style>
    <body>
        <div class="overlay container">
            <img src="https://portal.deltacraft.eu/img/Season%203%20-%20Logo%20White.svg" alt="..." class="deltacraft-logo" />
            <div class="flex flex-column justify-around">
                <div class="flex justify-around w-100">
                    <img src="https://minotar.net/avatar/${name}/256" alt="..." />
                    <div>
                        <div class="heading" style="font-weight: 800;">
                            ${name}
                        </div>
                        <div class="heading-team" style="font-weight: 500;">
                            ${team?.name}
                        </div>
                    </div>
                </div>
                <div class="flex flex-column" style="height: 150px; width: 80%; margin-bottom: 150px;">
                    <div style="height: 100%; width: 100%;">
                        <div class="progress">
                            <div
                              class="progress-bar bkg-mining"
                              style="width: ${ratios.mining * 100}%;"
                            ></div>
                            <div
                              class="progress-bar bkg-crafting"
                              style="width: ${ratios.crafting * 100}%;"
                            ></div>
                            <div
                              class="progress-bar bkg-warfare"
                              style="width: ${ratios.warfare * 100}%;"
                            ></div>
                            <div
                              class="progress-bar bkg-journey"
                              style="width: ${ratios.journey * 100}%;"
                            ></div>
                        </div>
                    </div>
                    <div class="flex flex-row points" style="height: 100%; font-weight: 600;">
                        <div style="width: ${ratios.mining * 100}%;" >
                            Mining
                        </div>
                        <div style="width: ${ratios.crafting * 100}%;" >
                            Crafting
                        </div>
                        <div style="width: ${ratios.warfare * 100}%;" >
                            Warfare
                        </div>
                        <div style="width: ${ratios.journey * 100}%;" >
                            Journey
                        </div>
                    </div>
                    <div class="flex flex-row points" style="height: 100%">
                        <div style="width: ${ratios.mining * 100}%;" >
                            ${summary.mining} bodů
                        </div>
                        <div style="width: ${ratios.crafting * 100}%;" >
                            ${summary.crafting} bodů
                        </div>
                        <div style="width: ${ratios.warfare * 100}%;" >
                            ${summary.warfare} bodů
                        </div>
                        <div style="width: ${ratios.journey * 100}%;" >
                            ${summary.journey} bodů
                        </div>
                    </div>

                </div>
            </div>
        </div>
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
