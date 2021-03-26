import mongoose, { Document, Model } from 'mongoose';
import ApiError from '../error/ApiError';

interface StockPricesI{
    ticker: string;
    price: string;
    change: string;
    status: string;
    company: string;
}

interface NewsI{
    title: string;
    link: string;
    date: string;
    description: string;
}

interface FinancialI{
    user: string;
    tickers: {
        ticker: string,
        exchange: string
    }[];
    stockPrices: StockPricesI[];
    news: NewsI[];
}

interface FinancialIDoc extends FinancialI, Document{

}

interface FinancialIModel extends Model<FinancialIDoc>{
    getStockPrices(email: string): StockPricesI[] | ApiError;
    getFinancialNews(_id: string): NewsI[] | ApiError;
    updateTickerInfo(_id: string): FinancialI | ApiError;
}

const financialSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
      },
      tickers: [],
      stockPrices: [],
      news: []
})

financialSchema.static('getStockPrices', async (userId) => {
    try{
        const financials = await Financial.findOne({ user: userId })

        if(!financials){
            return ApiError.notFound('User not Found...')
        }

        return financials.stockPrices

    }catch(err){
        return ApiError.badRequest('Could not Get Stock Prices...')
    }
})

financialSchema.static('getFinancialNews', async (userId) => {
    try{

        const financials = await Financial.findOne({ user: userId })

        if(!financials){
            return ApiError.notFound('User not Found...')
        }

        return financials.news

    }catch(err){
        return ApiError.badRequest('Could not Get Stock Prices...')
    }
})

financialSchema.static('updateTickerInfo', async (userId, tickers, stockPrices, news) => {
    try{
        const financials = await Financial.findOne({ user: userId })

        if(!financials){
            return ApiError.notFound('User not Found...')
        }

        financials.tickers = tickers
        financials.markModified('tickers')
        financials.stockPrices = stockPrices
        financials.markModified('stockPrices')
        financials.news = news
        financials.markModified('news')

        await financials.save()

        return financials

    }catch(err){
        return ApiError.badRequest('Could not Update Ticker Info...')
    }
})


const Financial = mongoose.model<FinancialIDoc, FinancialIModel>("Financial", financialSchema)
export default Financial;