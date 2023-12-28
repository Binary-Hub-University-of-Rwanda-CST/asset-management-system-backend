import express from 'express';
import auth from '../../middleware/auth';
import validation from '../../middleware/validation';
import { assetValidation } from '../../validations';
import { assetController } from '../../controllers';

const routes = express.Router();

routes.post('/add', validation(assetValidation.oneAsset) ,assetController.addAsset);
routes.post('/addMultiple', validation(assetValidation.multipleAssets) ,assetController.addMultipleAssets);
routes.get('/all', assetController.getAllAssets);
routes.get('/id/:id', assetController.getAllAssetById);
routes.post('/brand/add', validation(assetValidation.assetBrand) ,assetController.addAssetBrand);
routes.get('/brand/all' ,assetController.getAssetBrand);
routes.post('/stock/add', validation(assetValidation.assetStock) ,assetController.addAssetStock);
routes.get('/stock/all' ,assetController.getAssetStock);
routes.post('/supplier/add', validation(assetValidation.assetStock) ,assetController.addAssetStock);
routes.get('/supplier/all' ,assetController.getAssetStock);
routes.post('/category/add', validation(assetValidation.assetCategory) ,assetController.addAssetCategory);
routes.get('/category/all' ,assetController.getAssetCategory);

export default routes;
