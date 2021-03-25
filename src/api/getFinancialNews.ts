import axios from 'axios';
import cheerio from 'cheerio';
import ApiError from '../error/ApiError';

interface tickersI{
    ticker: string;
    exchange: string;
}

interface NewsI{
    title: string;
    link: string;
    date: string;
    description: string;
}

const getFinancialNews = async (tickers: tickersI | tickersI[]) => {

    try{
        let stockTickers: tickersI[];
        let news: NewsI[] = []

        if(!Array.isArray(tickers)){
            stockTickers = [tickers]
        } else{
            if(tickers.length === 0){
                return [];
            }
            stockTickers = tickers
        }

        for(let t of stockTickers){
            
            if(t.exchange === 'CRYPTO'){
                continue
            }

            let url = ""

            if(t.exchange.toUpperCase() === 'V'){
                url = `https://www.barchart.com/stocks/quotes/${t.ticker}.${t.exchange}N`
            } else if(t.exchange.toUpperCase() === 'TO'){
                url = `https://www.barchart.com/stocks/quotes/${t.ticker}.${t.exchange}`
            } else{
                url = `https://www.barchart.com/stocks/quotes/${t.ticker}`
            }
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            $('div.story.clearfix').each((index, el) => {
                const date = $(el).find('span.story-meta').text().trim().split("-")
                news.push({
                    title: $(el).find('a.story-link').text().trim(),
                    link: $(el).find('a.story-link').attr('href')!.trim(),
                    date: date[date.length - 1].trim(),
                    description: $(el).find('p.story-excerpt').text().trim()
                })

                if(index === 3){
                    return false
                }
            })
        }

        return news

    } catch(err){
        return ApiError.badRequest('Unable to Get Financial News...')
    }
}

export default getFinancialNews;