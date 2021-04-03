//Create layer  quran mauri
const DEVICE_WIDTH_HEIGHT = { width: 600 };
DEVICE_WIDTH_HEIGHT.height = DEVICE_WIDTH_HEIGHT.width * 1.471676300578035;

const ORIGINAL_WIDTH_HEIGHT = { width: 456, height: 990 };
const numberLine = 15;

const HEIGHT_LINE = DEVICE_WIDTH_HEIGHT.height / numberLine;
const NEXT_PAGE_LEFT = 0;
const NEXT_PAGE_TOP = 985.8; // ORIGINAL_WIDTH_HEIGHT.height;

let oldLine = 0;
let oldLeft = DEVICE_WIDTH_HEIGHT.width;
let line = 0;

//==>
const $ = (id) => document.getElementById(id);
let resCalcPage = [];
let page = getHashValue("page") || 3;

const reRenderPage = () => {
  const pageUrl = `https://mushaf.me/fahres/page/images/muhammadi/page${
    +page + 1
  }.png`;
  const elmImage = $("imagino");
  elmImage.setAttribute("src", pageUrl);
  const elmPage = $("wino");

  const { height, width } = DEVICE_WIDTH_HEIGHT;
  elmImage.style.height = `${height}px`;
  elmImage.style.width = `${width}px`;

  elmPage.style.height = `${height}px`;
  elmPage.style.width = `${width}px`;

  //===>
  const [nextPageSura = null, nextAya] = indexMuhammadi[page]
    ? indexMuhammadi[page][0]
    : [];

  const coordinatePage = nextPageSura
    ? [
        ...indexMuhammadi[page - 1],
        [nextPageSura, nextAya, NEXT_PAGE_LEFT, NEXT_PAGE_TOP],
      ]
    : indexMuhammadi[page - 1];

  for (let [index, [sura, aya, left, top]] of coordinatePage.entries()) {
    left = (left / ORIGINAL_WIDTH_HEIGHT.width) * DEVICE_WIDTH_HEIGHT.width;
    let line = parseInt(
      ((top / ORIGINAL_WIDTH_HEIGHT.height) * DEVICE_WIDTH_HEIGHT.height) /
        HEIGHT_LINE
    );

    console.log("original", { index, aya, sura, left, top });
    //if 1 line
    lineNumber = line - oldLine;
    thisLine = line;
    const wino = {
      aya,
      sura,
      page,
      id: `s${sura}a${aya}z`,
    };
    if (!lineNumber) {
      //alert("lineNumber1")
      renderLineFahres({ left, line, width: oldLeft - left, wino });
      oldLeft = left;
      //  return;
    }
    //if 2 lineNumber
    else if (lineNumber === 1) {
      //alert("lineNumber2")
      //lastLine
      renderLineFahres({
        left,
        line,
        width: DEVICE_WIDTH_HEIGHT.width - left,
        wino,
      });
      //firstLine
      renderLineFahres({ left: 0, line: oldLine, width: oldLeft, wino });
      oldLine = thisLine;
      oldLeft = left;
    }
    //if multilineNumber
    else if (lineNumber > 1) {
      //alert("multi line")
      //lastLine
      renderLineFahres({
        left,
        line,
        width: DEVICE_WIDTH_HEIGHT.width - left,
        wino,
      });
      //firstLine
      renderLineFahres({ left: 0, line: oldLine, width: oldLeft, wino });
      //alert("looop")
      //renderMultiLine Btwn
      for (let ii = oldLine + 1; ii < thisLine; ii++)
        renderLineFahres({
          left: 0,
          line: ii,
          width: DEVICE_WIDTH_HEIGHT.width,
          wino,
        });

      oldLine = thisLine;
      oldLeft = left;
    }

    ////===>

    const elmNextPage = $("nextPage");
    elmNextPage.onclick = () => {
      page = +page + 1;
      elmRerender();
    };
    elmNextPage.innerText = `next Page (${+page + 1})`;

    const elmPrevPage = $("prevPage");
    elmPrevPage.onclick = () => {
      page = +page - 1;
      elmRerender();
    };
    elmPrevPage.innerText = `prev Page (${+page - 1})`;
  }
};
function renderLineFahres({ left, line, width, wino, cb }) {
  //===>
  const top = +(HEIGHT_LINE * line).toFixed(2);
  const height = +HEIGHT_LINE.toFixed(2);
  left = +left.toFixed(2);
  width = +width.toFixed(2);

  //return {left, width, top, height, wino}

  //==>end
  const style = { left, line, width, top, height, page };
  resCalcPage.push(style);
  const elm = document.createElement("div");
  with (elm.style) {
    top = style.top + "px";
    height = style.height + "px";
    left = style.left + "px";
    width = style.width + "px";
    position = "absolute";
    background = "#ccc";
    opacity = 0.6;
    zIndex = 999;
    border = "3px solid #F44";
  }

  //oldLeft = left;
  if (cb) cb();
  //elm.style.background = style.background;

  //console.log({ style })
  elm.onclick = (e) => calcThis(e, i);
  $("wino").appendChild(elm);
}

function getHashValue(key) {
  const matches = location.hash.match(new RegExp(key + "=([^&]*)"));
  return matches ? matches[1] : null;
}

window.onload = () => reRenderPage();
