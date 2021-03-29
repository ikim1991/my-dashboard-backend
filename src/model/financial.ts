import mongoose, { Document, Model } from 'mongoose';
import ApiError from '../error/ApiError';

interface TickersI{
    ticker: string;
    exchange: string;
}

interface FinancialI{
    user: string;
    tickers: TickersI[]
}

interface FinancialIDoc extends FinancialI, Document{

}

interface FinancialIModel extends Model<FinancialIDoc>{
    updateTickerInfo(userId: string, tickers: TickersI[]): TickersI[] | ApiError;
    getTickerInfo(userId: string): TickersI[] | ApiError;
}

const financialSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
      },
      tickers: []
})

financialSchema.static('updateTickerInfo', async (userId, tickers) => {
    try{
        let financials = await Financial.findOne({ user: userId })

        if(!financials){
            financials = await Financial.create({ user: userId, tickers })

            return financials.tickers
        }

        financials.tickers = tickers
        financials.markModified('tickers')

        await financials.save()

        return financials.tickers

    }catch(err){
        return ApiError.badRequest('Could not Update Ticker Info...')
    }
})

financialSchema.static('getTickerInfo', async (userId) => {
    try{
        const financials = await Financial.findOne({ user: userId })

        if(!financials){
            return ApiError.notFound('User not Found...')
        }

        return financials.tickers

    }catch(err){
        return ApiError.badRequest('Could not Get Ticker Info...')
    }
})

const Financial = mongoose.model<FinancialIDoc, FinancialIModel>("Financial", financialSchema)
export default Financial;