import puppeteer from 'puppeteer'

const companyNames = ['apple inc', 'microsoft', 'netapp'];

async function getMsciRating(keyword) {
    const formatKey = keyword.replace(' ', '%20').replace('&', '%26');
    const msciUrl = `https://www.msci.com/zh/our-solutions/esg-investing/esg-ratings-climate-search-tool?p_p_id=esgratingsprofile&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=searchEsgRatingsProfiles&p_p_cacheability=cacheLevelPage&_esgratingsprofile_keywords=${formatKey}`;
    console.log(msciUrl);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        
        const response = await fetch(msciUrl)
        const msciData = await response.json()

        
        const encodedTitle = msciData[0].encodedTitle;
        const urlId = msciData[0].url;
        console.log(encodedTitle)
        const msciCompanyProfile = `https://www.msci.com/zh/our-solutions/esg-investing/esg-ratings-climate-search-tool/issuer/${encodedTitle}/${urlId}`;
        // console.log(msciCompanyProfile);

        await page.goto(msciCompanyProfile, { waitUntil: 'networkidle0' });

        const atag = await page.$x('//div/a[@class="cw-toggler-clicker"]')

        console.log(atag);


        const msciTemp = await page.$x(
            '//div[@class="esg-expandable"][2]/div/div/div[1]/div[1]/div[3]/span',
            (element) => element.textContent
        );

        const msciRating = await page.$x(
            '//div[@class="esg-expandable"][3]/div/div/div[1]/div[1]/div[1]/div[2]/div',
            (element) => element.classList[element.classList.length - 1].toUpperCase()
        );

        const msciText = await page.$x(
            '//div[@class="esg-expandable"][3]/div/div[2]/div/div/div',
            (element) => element.textContent
        );

        await browser.close();

        return { rating: msciRating, text: msciText, temp: msciTemp };

    } catch (error) {

        console.log('Failed to scrape data:', error);
        await browser.close();
        return null;
    }
}

(async () => {
    for (const keyword of companyNames) {
        if (keyword === 'Company name') {
            continue;
        }
        const ratingData = await getMsciRating(keyword);
        if (ratingData) {
            const { rating, text, temp } = ratingData;
            // Process the rating data as needed
            console.log(rating, text, temp);
        }
    }
})();
