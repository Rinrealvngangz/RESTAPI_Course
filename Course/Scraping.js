const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");

(async () => {
  console.log("hello Scraping");
  const browser = await puppeteer.launch({ headless: true }); // open chrome
  const page = await browser.newPage(); // open new page in browser
  await page.goto("https://thevaat.com/?s=javascript"); // go to url
  const articles = await page.evaluate(() => {
    let arrDate = Array.from(
      document.querySelectorAll(
        "div.item-details div.td-module-meta-info span.td-post-date time.updated"
      )
    ).map((i) => i.innerText);
    let arrDescription = Array.from(
      document.querySelectorAll("div.item-details div.td-excerpt")
    ).map((i) => i.innerText);
    let arrlink = document.querySelectorAll(
      "div.td_module_16 div.td-module-thumb a"
    );
    arrlink = [...arrlink];
    arrDate = [...arrDate];
    arrDescription = [...arrDescription];
    let data = arrlink.map((i, index) => ({
      id: index,
      link: i.href,
      title: i.title,
      Description: arrDescription[index],
      Date: arrDate[index],
    }));
    return data;
  });
  await fs.writeFileSync("dataJS.json", JSON.stringify(articles), (err) => {
    if (err) console.log(err);
    else console.log("WriteFile Success");
  });

  await browser.close();
})();

(async () => {
  console.log("hello Scraping2");
  const browser = await puppeteer.launch({ headless: true }); // open chrome

  const page = await browser.newPage();
  // go to url
  await page.goto("https://spaceit.org/category/download/khoa-hoc/page/9/");

  const articles = await page.evaluate(() => {
    let arrDescription = Array.from(
      document.querySelectorAll(
        "article.jeg_post div.jeg_postblock_content div.jeg_post_excerpt p"
      )
    ).map((i) => i.innerText);

    let arrDate = Array.from(
      document.querySelectorAll(
        "article.jeg_post div.jeg_postblock_content div.jeg_post_meta div.jeg_meta_date a"
      )
    ).map((i) => i.innerText);
    let arrtitle = document.querySelectorAll(
      "article.jeg_post div.jeg_postblock_content h3.jeg_post_title a"
    );
    arrDescription = [...arrDescription];
    arrDate = [...arrDate];
    arrtitle = [...arrtitle];

    let data = arrtitle.map((i, index) => ({
      id: index,
      link: i.href,
      title: i.innerText,
      Description: arrDescription[index],
      Date: arrDate[index],
    }));

    return data;
  });
  console.log(articles);
  await fs.writeFileSync("datapage9.json", JSON.stringify(articles), (err) => {
    if (err) console.log(err);
    else console.log("WriteFile Success");
  });

  await browser.close();
})();

//Cheerio
// const obj = {};
// axios.get("https://thevaat.com/?s=javascript").then((res) => {
//   const arr = [];
//   const $ = cheerio.load(res.data);
//   $(".item-title").each((index, el) => {
//     const link = $(el).children("a").attr("href");
//     const title = $(el).children("a").text();
//     obj = {
//       id: index,
//       title,
//       link,
//     };
//     console.log(obj);
//     arr[index] = obj;
//   });
//   fs.writeFile("data.json", JSON.stringify(arr), function (err) {
//     if (err) console.log(err);
//     else console.log("Writefile success");
//   });
// });
