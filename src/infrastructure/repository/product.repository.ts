import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import Product from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    find(id: string): Promise<Product> {
        return Promise.resolve(undefined);
    }

    findAll(): Promise<Product[]> {
        return Promise.resolve([]);
    }

    update(entity: Product): Promise<void> {
        return Promise.resolve(undefined);
    }
}