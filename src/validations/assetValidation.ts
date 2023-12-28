import Joi from 'joi';

const specificationSchema = Joi.object({
  name: Joi.string().required(),
  values: Joi.string().required(),
  category_id: Joi.string().required(),
});

const oneAsset = Joi.object({
  asset_id: Joi.string().required(),
  category_id: Joi.string().required(),
  brand: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required()
  }).required(),
  stock_id: Joi.string().required(),
  supplier: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required()
  }).required(),
  purchase_order_number: Joi.string().required(),
  value: Joi.number().required(),
  life_span_years: Joi.number().required(),
  date_in: Joi.string().required(),
});

const assetBrand = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required()
}).required();

const assetCategory = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  specifications: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      values: Joi.array().items(Joi.string()).required()
    })
  ).required()
}).required();


const assetStock = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required()
}).required();

const assetSupplier = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required()
}).required();

const multipleAssets = Joi.array().items(oneAsset);

export default { oneAsset, multipleAssets, assetBrand, assetCategory, assetStock, assetSupplier };