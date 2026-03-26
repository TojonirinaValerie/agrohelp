import Address from "./address";
import Category from "./category";
import City from "./city";
import Country from "./country";
import CustomerHistory from "./customer-history";
import Order from "./order";
import OrderList from "./order-list";
import Payment from "./payment";
import PaymentType from "./payment-type";
import Product from "./product";
import ProductType from "./product-type";
import TopSelling from "./top-selling";
import User from "./user";

export const initForeignKey = () => {
    CustomerHistory.belongsTo(Address, { foreignKey: 'customerId', as: 'customer', });

    Address.hasMany(Order, { foreignKey: 'addressId' });
    Address.belongsTo(Country, { foreignKey: 'countryId', as: 'country' });
    Address.belongsTo(City, { foreignKey: 'cityId', as: 'city' });
    Address.hasMany(CustomerHistory, { foreignKey: 'customerId' });

    Category.hasMany(ProductType, { foreignKey: 'categoryId' });

    ProductType.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
    ProductType.hasMany(Product, { foreignKey: 'typeId' });

    Product.hasMany(OrderList, { foreignKey: 'productId' });
    Product.hasMany(TopSelling, { foreignKey: 'productId' });
    Product.belongsTo(ProductType, { foreignKey: 'typeId', as: 'type' });

    User.hasMany(Product, { foreignKey: 'userId' });

    Order.hasMany(OrderList, { foreignKey: 'orderId' });
    Order.belongsTo(Address, { foreignKey: 'addressId', as: 'address' });

    OrderList.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
    OrderList.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

    PaymentType.hasMany(Payment, { foreignKey: 'paymentTypeId' });

    Payment.belongsTo(PaymentType, { foreignKey: 'paymentTypeId', as: 'payment_type' });

    TopSelling.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
}
