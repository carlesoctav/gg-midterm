const config = require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.YOUTUBE_API_KEY;

async function getVideoAndTokopediaLinks(videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}&part=snippet`;
  const response = await axios.get(url);

  try {
    response.data.items[0].snippet;
  } catch (error) {
    throw new Error(
      "not a valid youtube video, make sure it is an id to youtube video and not a link"
    );
  }

  const data = response.data.items[0].snippet;

  const tokopediaLinks = data.description.match(
    /https?:\/\/(?:www\.)?tokopedia\.link\/\b\S{11}\b/g
  );

  if (!tokopediaLinks) {
    throw new Error(
      "no tokopedia links founds, make sure the video has tokopedia links in the description on this format: https://tokopedia.link/xxxxxxxxxxx"
    );
  }
  const videoDetails = {
    title: data.title,
    thumbnail: data.thumbnails.high.url,
    tokopediaLinks: tokopediaLinks,
  };

  return videoDetails;
}

async function getVideoAndProduct(videoId) {
  const videoDetails = await getVideoAndTokopediaLinks(videoId);
  const productList = [];
  for (const link of videoDetails.tokopediaLinks) {
    const product = await scrapTokopediaProduct(link, videoId);
    if (product) {
      productList.push(product);
    }
  }

  if (productList.length == 0) {
    throw new Error(
      "no products found, probably a most of the links are broken or not a product page"
    );
  }

  const products = {
    message: `found ${productList.length} products from ${videoDetails.tokopediaLinks.length} links`,
    productList: productList,
    videoDetails: videoDetails,
  };

  return products;
}

async function scrapTokopediaProduct(tokopediaLink, videoId) {
  try {
    const html = await axios.get(tokopediaLink);

    const hrefRegex = /<a[^>]* href="([^"]*)"/g;
    const regexImg = /<img[^>]* src="([^"]*)"/g;
    const img = html.data.match(regexImg)[0].split('"')[1];
    const hrefs = [];
    let match;
    while ((match = hrefRegex.exec(html.data)) !== null) {
      hrefs.push(match[1]);
    }

    if (hrefs.length == 2) {
      const redirectLink = hrefs[0];
      const productPage = await axios.get(redirectLink);

      const regexPrice = /<div class="price"[^>]*>(.*?)<\/div>/;
      const regexTitle = /<h1 class="css-1os9jjn"[^>]*>(.*?)<\/h1>/;

      try {
        const price = productPage.data.match(regexPrice)[1];
        const title = productPage.data.match(regexTitle)[1];

        return {
          productName: title,
          productPrice: price,
          productLink: tokopediaLink,
          productImage: img,
          productVideo: `youtube.com/watch?v=${videoId}`,
        };
      } catch (error) {
        console.log("probably not a product page");
        return undefined;
      }
    }
  } catch (error) {
    console.log("probably a broken link");
    return undefined;
  }
}

// async function scrapTokopedia(tokopediaLink){
//     //NOT FEASIBLE TOO SLOW SINCE IT"S SIMULATING A BROWSER
//     const browser = await puppeteer.launch({ headless: false, defaultViewport: null })
//     const page = await browser.newPage()
//     await page.goto(tokopediaLink, { waitUntil: 'domcontentloaded' })

//     const productDetails = await page.evaluate(() => {

//         try{
//             const title = document.querySelector('.css-1os9jjn').innerText
//             const price = document.querySelector('.price').innerText
//             const image = document.querySelector('.magnifier').style.backgroundImage.split('"')[1]

//             const data = {
//                 title,
//                 price,
//                 image
//             }

//             return data

//         }
//         catch(error){
//             throw new Error('probably not a product page')
//         }
//     })

//     await browser.close()

// }

// getVideoAndProduct('uxjsdZsm4oQ&')

async function main() {
  // await scrapTokopedia('https://tokopedia.link/jha58X8S5xb')
  // await scrapTokopedia('https://tokopedia.link/6Z3Z1X8S5xblaajffj')
  // await scrapTokopedia('https://tokopedia.link/david-wib12-yt')
  // await scrapTokopedia('https://tokopedia.link/pMWv2tU8Qvb')
  // await scrapTokopedia('https://tokopedia.link/r4Pmeffx2vb')
  await getVideoAndProduct("uic5AyVYlI4");
}
main();
module.exports = getVideoAndProduct;
