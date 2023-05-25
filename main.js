import puppeteer from 'puppeteer-core'
import dotenv from 'dotenv'
dotenv.config()


async function run() {

  let browser
  
  try {
    
    // const auth = `brd-customer-hl_74c0ca3e-zone-scraping_browser:fnb03y1nv4xm`

    // browser = await puppeteer.connect({
    //   browserWSEndpoint: `wss://${auth}@zproxy.lum-superproxy.io:9222`
    // })
    browser = await puppeteer.launch()
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    await page.goto('https://www.msci.com/')

    await page.screenshot({path: 'ss.png'})

//     const body = await page.$('body')

//     const html  = await page.evaluate(() => {

//       document.documentElement.outerHTML
// })


  } catch (error) {

    console.error(error)

  } finally{

    await browser?.close()

  }

}

run()