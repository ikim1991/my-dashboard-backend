import express from 'express';
import { fetchFinancialNews, loadFinancialNews, loadStockPrices, setStockPrices } from '../controller/financial';
import authenticate from '../middleware/auth';

const router = express.Router();

router.post('/stockprice', authenticate, setStockPrices)
router.post('/news', authenticate, fetchFinancialNews)
router.get('/stockprice', authenticate, loadStockPrices)
router.get('/news', authenticate, loadFinancialNews)

export default router;