import OrderModel from "../db/sequelize/model/order.model";
import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItem from "../../domain/entity/order_Item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                }))
            },
            {
                include: [{model: OrderItemModel}],
            }
        );
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: {id},
                rejectOnEmpty: true, include: [{model: OrderItemModel}]
            },);
        } catch (error) {
            throw new Error("Order not found");
        }
        const orderItems = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
        return new Order(id, orderModel.customer_id, orderItems);
    }

    async findAll(): Promise<Order[]> {
        const ordersModels = await OrderModel.findAll({
            include: [{ model: OrderItemModel }],
        })

        return ordersModels.map(orderModel => {
            const items = orderModel.items.map(
                itemModel => new OrderItem(
                    itemModel.id,
                    itemModel.name,
                    itemModel.price,
                    itemModel.product_id,
                    itemModel.quantity
                )
            )
            return new Order(orderModel.id, orderModel.customer_id, items)
        })
    }

    async update(entity: Order): Promise<void> {
        const transaction = await OrderModel.sequelize.transaction();

        try {
            await OrderItemModel.destroy({
                where: {
                    order_id: entity.id,
                }, transaction,
            });

            await OrderItemModel.bulkCreate(entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id
            })), {transaction});

            await OrderModel.update({
                    customer_id: entity.customerId,
                    total: entity.total()
                },
                {
                    where: {id: entity.id},transaction
                }
            );
        } catch (error) {
            await transaction.rollback();
            throw new Error("Order not updated");
        }

        await transaction.commit();
    }
}