import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import assetService from '../services/assetService';
import { AssetData } from '../models';
import httpStatus from 'http-status';


export const getAllAssets = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json(await assetService.getAllAssets());
});

export const getAllAssetById = catchAsync(async (req: Request, res: Response) => {
  return res.status(200).json(await assetService.getAllAssetById(req.params.id));
});

export const addAsset = catchAsync(async (req: Request, res: Response) => {
  const createdAsset: AssetData = await assetService.addAsset(req.body);
  if(!createdAsset.status)
  {
    return res.status(400).json(createdAsset);
  }
  return res.status(201).json(createdAsset);
});

export const addMultipleAssets = catchAsync(async (req: Request, res: Response) => {
  const createdAssets: AssetData[] = await assetService.addMultipleAssets(req.body);
  let failedToCreate = 0;
  for(let createdAsset of createdAssets)
  {
    if(!createdAsset.status)
    {
      failedToCreate++;
    }
  }
  const statusCode = (failedToCreate === 0) ? 201 : (failedToCreate < createdAssets.length) ? 207 : 400;
  return res.status(statusCode).json(createdAssets);
});

//Brand controller
export const addAssetBrand = catchAsync(async (req: Request, res: Response) => {
  const createdBrand = await assetService.addAssetBrand(req.body);
  if(!createdBrand)
  {
    return res.status(httpStatus.BAD_REQUEST).json("Brand with ID " + req.body.id + " already exists!");
  }
  return res.status(httpStatus.CREATED).json(createdBrand);
});

export const getAssetBrand = catchAsync(async (req: Request, res: Response) => {
  return res.status(httpStatus.OK).json(await assetService.getAssetBrand()); 
});

//Stock controller
export const addAssetStock = catchAsync(async (req: Request, res: Response) => {
  const createdStock = await assetService.addAssetStock(req.body);
  if(!createdStock)
  {
    return res.status(httpStatus.BAD_REQUEST).json("Stock with ID " + req.body.id + " already exists!");
  }
  return res.status(httpStatus.CREATED).json(createdStock);
});

export const getAssetStock = catchAsync(async (req: Request, res: Response) => {
  return res.status(httpStatus.OK).json(await assetService.getAssetStock()); 
});

//Supplier controller
export const addAssetSupplier = catchAsync(async (req: Request, res: Response) => {
  const createdSupplier = await assetService.addAssetSupplier(req.body);
  if(!createdSupplier)
  {
    return res.status(httpStatus.BAD_REQUEST).json("Supplier with ID " + req.body.id + " already exists!");
  }
  return res.status(httpStatus.CREATED).json(createdSupplier);
});

export const getAssetSupplier = catchAsync(async (req: Request, res: Response) => {
  return res.status(httpStatus.OK).json(await assetService.getAssetSupplier()); 
});

//Category controller
export const addAssetCategory = catchAsync(async (req: Request, res: Response) => {
  const createdCategory = await assetService.addAssetCategory(req.body);
  if(!createdCategory)
  {
    return res.status(httpStatus.BAD_REQUEST).json("Category with ID " + req.body.id + " already exists!");
  }
  return res.status(httpStatus.CREATED).json(createdCategory);
});

export const getAssetCategory = catchAsync(async (req: Request, res: Response) => {
  return res.status(httpStatus.OK).json(await assetService.getAssetCategory()); 
});

export default { addAsset, addMultipleAssets, getAllAssets, getAllAssetById, addAssetBrand, getAssetBrand, addAssetStock, getAssetStock, addAssetSupplier, getAssetSupplier, addAssetCategory, getAssetCategory };
