//Create layer Ayat quran mauri
const WH = { width: 865, height: 1270 };
const WHO = { width: 456, height: 707 };
const numberLine = 15;
let oldLine = 0;
let oldLeft = WH.width;
let line = 0;

const heightLine = (WH.height / numberLine);
const $ = (id) => document.getElementById(id);
let resCalcPage = [];
let page = getHashValue('page') || 3;
function creatLineFahras(i) {
    //alert(num)
    const elm = document.createElement("div");
    elm.className += "lineFahras";
    elm.style.top = (heightLine * i) + "px";
    elm.style.height = (heightLine) + "px";
    elm.onclick = (e) => creatLayerFahras(e, i);//calcThis(e,i);


    $("wino").appendChild(elm);
}
function creatLayerFahras({ pageX }, i) {

    console.log({ pageX, line: i })
    //if 1 line
    lineNumber = (i) - oldLine;
    thisLine = i;

    //alert(JSON.stringify({lineNumber,oldLine}))
    //oldLine = i;
    if (!lineNumber) {
        //alert("lineNumber1")
        renderLineFahres({ pageX, i, width: (oldLeft - pageX) })
        oldLeft = pageX;
        return;
    }
    //if 2 lineNumber
    if (lineNumber === 1) {
        //alert("lineNumber2")
        //lastLine
        renderLineFahres({ pageX, i, width: WH.width - pageX })
        //firstLine
        renderLineFahres({ pageX: 0, i: (oldLine), width: (oldLeft) })
        oldLine = thisLine;
        oldLeft = pageX;

        return;
    }


    //if multilineNumber
    if (lineNumber > 1) {
        //alert("multi line")
        //lastLine
        renderLineFahres({ pageX, i, width: WH.width - pageX })
        //firstLine
        renderLineFahres({ pageX: 0, i: (oldLine), width: (oldLeft) })
        //alert("looop")
        //renderMultiLine Btwn
        for (let ii = oldLine + 1; ii < thisLine; ii++)
            renderLineFahres({ pageX: 0, i: (ii), width: WH.width })

        oldLine = thisLine;
        oldLeft = pageX
    }
    //return;
}

function renderLineFahres({ pageX, i, width, cb }) {
    //alert(e)
    const elm = document.createElement("div");
    //elm.className += "lineFahras";
    const top = (heightLine * i).toFixed(2)

    const left = pageX.toFixed(2);
    const height = (heightLine).toFixed(2);

    const style = { left, i, width, top, height, page }
    resCalcPage.push(style)
    with (elm.style) {
        top = style.top + "px";
        height = style.height + "px";
        left = style.left + "px";
        width = style.width + "px";
        position = "absolute";
        background = "#336699";
        opacity = 0.7;
        zIndex = 999;
        border = "2px solid #F44"
    }

    //oldLeft = pageX;
    if (cb) cb()
    //elm.style.background = style.background;

    console.log({ style })
    elm.onclick = (e) => calcThis(e, i)
    $("wino").appendChild(elm);
}

const reRenderPage = () => {

    const pageUrl = `https://mushaf.me/fahres/page/images/muhammadi/page${+page + 1}.png`;
    $("imagino").setAttribute("src", pageUrl);
    //const idTest = $('test');
    //alert(idTest.innerHTML);
    //idTest.innerHTML = 444

    for (i = 0; i < numberLine; i++) {
        creatLineFahras(i)

    }

    calcThis = () => {
        alert("see console resCalc Page log")
        console.log({ resCalcPage })
        const win = window.open("", "Resault Page: " + page, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=500,top=" + (screen.height - 400) + ",left=" + (screen.width - 840));
        win.document.body.innerHTML = JSON.stringify(resCalcPage);

    };

    const elmCalcPage = $("calcPage");
    elmCalcPage.onclick = calcThis
    elmCalcPage.innerText = `Calc Page (${page})`;

    //
    const elmRerender = () => {
        resCalcPage = [];
        $("wino").innerHTML = "";
        oldLine = 0;
        oldLeft = WH.width;
        line = 0;
        reRenderPage();
    }
    const elmNextPage = $("nextPage");
    elmNextPage.onclick = () => {
        page = +page + 1;
        elmRerender();
    }
    elmNextPage.innerText = `next Page (${+page + 1})`;

    const elmPrevPage = $("prevPage");
    elmPrevPage.onclick = () => {
        page = +page - 1;
        elmRerender();
    }
    elmPrevPage.innerText = `prev Page (${+page - 1})`;


    //
    const coordinatePage = indexMuhammadi[page-1];
    for (const [, , left, top] of coordinatePage)
        creatLayerFahras({ pageX: (left / WHO.width * WH.width ) }, parseInt((top /WHO.height * (WH.height - 410) / heightLine)))

    /*
    const coordinatePage = coordinateMuhammadi.filter(itm => itm.p === page);
    for ({ X, Y, a, i, p, s } of coordinatePage)
        creatLayerFahras({ pageX: (X * WH.width) }, parseInt((Y * (WH.height-410) / heightLine)), { p, s, a, i })
    //*/
}

function getHashValue(key) {
    const matches = location.hash.match(new RegExp(key + '=([^&]*)'));
    return matches ? matches[1] : null;
}

window.onload = () => reRenderPage();


