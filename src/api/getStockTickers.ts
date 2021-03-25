import axios from 'axios';
import cheerio from 'cheerio';
import ApiError from '../error/ApiError';

interface tickersI{
    ticker: string;
    exchange: string;
}

interface stockPricesI{
    ticker: string;
    price: string;
    change: string;
    status: string;
    company: string;
}

const getStockTickers = async (tickers: (tickersI | tickersI[])) => {
    try{
        let stockTickers: tickersI[];
        let stockPrices: stockPricesI[] = [];

        if(!Array.isArray(tickers)){
            stockTickers = [tickers]
        } else{
            if(tickers.length === 0){
                return [];
            }
            stockTickers = tickers
        }

        for(let t of stockTickers){
            let url = ""

            if(t.exchange.toUpperCase() === 'V' || t.exchange.toUpperCase() === 'TO'){
                url = `https://ca.finance.yahoo.com/quote/${t.ticker}.${t.exchange}`
            } else if(t.exchange.toUpperCase() === 'CRYPTO'){
                url = `https://ca.finance.yahoo.com/quote/${t.ticker}-USD`
            }
            else{
                url = `https://ca.finance.yahoo.com/quote/${t.ticker}`
            }

            const { data } = await axios.get(url)
			const $ = cheerio.load(data);

            if(t.exchange.toUpperCase() === 'V' || t.exchange.toUpperCase() === 'TO'){
                stockPrices.push({
					ticker: `${t.ticker}.${t.exchange}`,
					company: $('h1[class="D(ib) Fz(18px)"]').text().trim(),
					price: $('span[class="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"]').text().trim(),
					change: $('div[class="D(ib) Mend(20px)"] span[data-reactid="33"]').text().trim(),
					status: $('div#quote-market-notice').text().trim()
				})
            } else if(t.exchange.toUpperCase() === 'CRYPTO'){
                const status = $('div#quote-market-notice').text().trim().split(".")[0].trim()
				stockPrices.push({
					ticker: `${t.ticker}-USD`,
					company: $('h1[class="D(ib) Fz(18px)"]').text().trim(),
					price: $('span[class="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"]').text().trim(),
					change: $('div[class="D(ib) Mend(20px)"] span[data-reactid="33"]').text().trim(),
					status: status
				})
            }
            else{
                stockPrices.push({
					ticker: `${t.ticker}`,
					company: $('h1[class="D(ib) Fz(18px)"]').text().trim(),
					price: $('span[class="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"]').text().trim(),
					change: $('div[class="D(ib) Mend(20px)"] span[data-reactid="33"]').text().trim(),
					status: $('div#quote-market-notice').text().trim()
				})
            }
        }

        return stockPrices
    }catch(err){
        return ApiError.badRequest('Unable to Get Stock Prices...')
    }
}

export default getStockTickers;