import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_Item";



const customer = new Customer("123", "Bruno Picinini");
const address = new Address("Rua Dois", 2, "12345-678", "São Paulo")
customer.changeAddress(address);;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 2);
const order = new Order("1", "123", [item1, item2])
