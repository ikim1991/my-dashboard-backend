import { Request, Response, NextFunction } from "express"
import getFinancialNews from "../api/getFinancialNews";
import getStockTickers from "../api/getStockTickers";
import ApiError from "../error/ApiError"
import Financial from '../model/financial';

export const setStockPrices = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const { userId } = req.session

        const stockPrices = await getStockTickers(req.body)

        if(stockPrices instanceof ApiError){
            return next(stockPrices)
        }

        const update = await Financial.updateTickerInfo(userId!, req.body)

        if(update instanceof ApiError){
            return next(update)
        }

        res.send(stockPrices)
        
    }catch(err){
        return ApiError.badRequest('Could Not Update Stock Prices...')
    }
}

export const loadStockPrices = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { userId } = req.session

        const tickers = await Financial.getTickerInfo(userId!)

        if(tickers instanceof ApiError){
            return next(tickers)
        }

        const stockPrices = await getStockTickers(tickers)

        if(stockPrices instanceof ApiError){
            return next(stockPrices)
        }

        res.send(stockPrices)

    }catch(err){
        return ApiError.badRequest('Could Not Get Stock Prices...')
    }
}

export const fetchFinancialNews = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const news = await getFinancialNews(req.body)

        if(news instanceof ApiError){
            return next(news)
        }

        res.send(news)
    }catch(err){
        return ApiError.badRequest('Could Not Update Financial News...')
    }
}

export const loadFinancialNews = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { userId } = req.session

        const tickers = await Financial.getTickerInfo(userId!)

        if(tickers instanceof ApiError){
            return next(tickers)
        }

        const news = await getFinancialNews(tickers)

        if(news instanceof ApiError){
            return next(news)
        }

        res.send(news)
    }catch(err){
        return ApiError.badRequest('Could Not Get Financial News...')
    }
}