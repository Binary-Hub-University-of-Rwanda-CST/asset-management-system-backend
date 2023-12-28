import { PrismaClient } from '@prisma/client';
import { NewAssetData, Asset, AssetData, AssetSearch, idAndName, AssetCategory, AssetCategoryData } from '../models';
import catchAsync from '../utils/catchAsync';
const prisma = new PrismaClient();


const assetService = {

  async addAsset (newAssetData: NewAssetData): Promise<AssetData>  {
    if(await this.doesAssetAlreadyExist(newAssetData.asset_id))
    {
      const assetError: AssetData = {
        status: false,
        data: `Asset with id ${newAssetData.asset_id} already exist!, try another ID`
      }
      return assetError;
    }
    if(!await this.doesCategoryExist(newAssetData.category_id))
    {
      const assetError: AssetData = {
        status: false,
        data: `No category with id ${newAssetData.category_id}, Consider adding category first!`
      }
      return assetError;
    }
    if(!await this.doesStockExist(newAssetData.stock_id))
    {
      const assetError: AssetData = {
        status: false,
        data: `No category with id ${newAssetData.stock_id}, Consider adding Stock first!`
      }
      return assetError;
    }
    
    const createdAsset = await prisma.asset.create({
      data: {
        asset_id: newAssetData.asset_id,
        category: { 
          connect: { asset_category_id: newAssetData.category_id } },
        brand: {
          connectOrCreate: {
            where: { id: newAssetData.brand.id },
            create: { id: newAssetData.brand.id, name: newAssetData.brand.name }
          }
        },
        stock: { connect: { id: newAssetData.stock_id } },
        supplier: {
          connectOrCreate: {
            where: { id: newAssetData.supplier.id },
            create: { id: newAssetData.supplier.id, name: newAssetData.supplier.name }
          }
        },
        purchase_order_number: newAssetData.purchase_order_number,
        value: newAssetData.value,
        life_span_years: newAssetData.life_span_years,
        date_in: newAssetData.date_in,
      },
      include: {
        category: {
          include: {
            specifications: true,
          },
        },
        brand: true,
        stock: true,
        supplier: true,
      },
    });

    const createdAssetData: AssetData={
      status: true,
      data: createdAsset
    }
    
    return createdAssetData;
  }
  ,
  async addMultipleAssets(multipleAssetData: NewAssetData[]) : Promise<AssetData[]>
  {
    let createdAssets = [];
    for (const asset of multipleAssetData){
      createdAssets.push(await this.addAsset(asset));
    }
    return createdAssets;
  }
  ,

  async doesCategoryExist(categoryId: string): Promise<boolean> {
    const category = await prisma.assetCategory.findUnique({
      where: { asset_category_id: categoryId },
    });
    return !!category;
  },
  
  async doesStockExist(stockId: string): Promise<boolean> {
    const stock = await prisma.stock.findUnique({
      where: { id: stockId },
    });
    return !!stock;
  },
  
  async doesAssetAlreadyExist(AssetId: string): Promise<boolean> {
    const asset = await prisma.asset.findUnique({
      where: { asset_id: AssetId },
    });
    return !!asset;
  },
  async doesBrandAlreadyExist(brandId: string): Promise<boolean> {
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
    });
    return !!brand;
  },
  async doesSupplierAlreadyExist(supplierId: string): Promise<boolean> {
    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId },
    });
    return !!supplier;
  },
  
  async getAllAssets(): Promise<Asset[]> {
    return(await prisma.asset.findMany({
      include: {
        category: {
          include: {
            specifications: true,
          },
        },
        brand: true,
        stock: true,
        supplier: true,
      },
    })) 
  },
  async getAllAssetById(id: string): Promise<AssetSearch> {
    const allAssets = await prisma.asset.findMany({
        where: { asset_id: id },
        include: {
          category: {
            include: {
              specifications: true,
            },
          },
          brand: true,
          stock: true,
          supplier: true,
        },
      });

      const assetsFound: AssetSearch = {
        found: allAssets.length > 0,
        data: (allAssets.length > 0)? allAssets : `No Asset found with ID ${id}`
      }

    return assetsFound;
  },

  //Brand
  
  async addAssetBrand(brandData: idAndName): Promise<idAndName | Boolean> {
    if(await this.doesBrandAlreadyExist(brandData.id))
    {
      return false;
    }
    return(await prisma.brand.create({ data: brandData })) 
  },
  async getAssetBrand(): Promise<idAndName[]> {
    return(await prisma.brand.findMany()) 
  },

  //Stock
  
  async addAssetStock(idAndName: idAndName): Promise<idAndName | Boolean> {
    if(await this.doesStockExist(idAndName.id))
    {
      return false;
    }
    return(await prisma.stock.create({ data: idAndName })) 
  },
  async getAssetStock(): Promise<idAndName[]> {
    return(await prisma.stock.findMany()) 
  },

  //Supplier
  async addAssetSupplier(idAndName: idAndName): Promise<idAndName | Boolean> {
    if(await this.doesSupplierAlreadyExist(idAndName.id))
    {
      return false;
    }
    return(await prisma.supplier.create({ data: idAndName })) 
  },
  async getAssetSupplier(): Promise<idAndName[]> {
    return(await prisma.supplier.findMany()) 
  },


  //Category
  async addAssetCategory(categoryData: AssetCategory): Promise<AssetCategory | Boolean> {
    if(await this.doesCategoryExist(categoryData.id))
    {
      return false;
    }
    const createdAssetCategory = await prisma.assetCategory.create({
      data: {
        asset_category_id: categoryData.id,
        category_name: categoryData.name,
        specifications: {
          create: categoryData.specifications.map(specification => ({
            id: specification.id,
            name: specification.name,
            values: { set: specification.values },
          })),
        },
      },
      include: {
        specifications: true,
      },
    });
  
    return {
      id: createdAssetCategory.asset_category_id,
      name: createdAssetCategory.category_name,
      specifications: createdAssetCategory.specifications,
    }; 
  },
  async getAssetCategory(): Promise<AssetCategory[]> {
    const assetCategories = await prisma.assetCategory.findMany({
      include: { specifications: true },
    });
  
    return assetCategories.map(category => ({
      id: category.asset_category_id,
      name: category.category_name,
      specifications: category.specifications,
    }));  
  },

};

export default assetService;