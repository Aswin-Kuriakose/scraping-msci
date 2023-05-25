import puppeteer from "puppeteer-core"

const blogScraper = async ( url, element, titleElement ) => {
try {
    
    const browser = await puppeteer.launch({channel: 'chrome'})
    const page = await browser.newPage()

    await page.goto(url)

    // const screenshot = await page.screenshot({path:'./screenShots/screenshot.png'})
    const blog = await page.$eval('article')
        
    // const allArticles = await page.evaluate(() => {
    //     return Array.from(articles).slice( 0, 3 ).map((article) => {

    //         const title = article.querySelector(titleElement).innerText
    //         const url = article.querySelector('a').href
    //         return { title, url }
    //     } )
    // })
    browser.close()

} catch (error) {
    console.error(error)
}
}

blogScraper('https://www.freecodecamp.org/news/', 'article', 'h2')