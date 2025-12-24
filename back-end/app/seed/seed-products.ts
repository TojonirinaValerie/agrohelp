import Product from "@/models/product";
import ProductType from "@/models/product-type";
import * as products from "../data/products.json";
import * as superAdmin from "../data/super-admin.json";
import User from "@/models/user";

export const seedProducts = async () => {
    const count = await Product.count();
    if(count === 0) {
        const finalProducts: any[] = [];
        const super_admin = await User.findOne({ 
            where: { email: superAdmin.admin.email }
        });
        if(!super_admin) {
            console.log("Super admin not found");
            console.error("❌ Failed to insert products");
            return;
        } else {
            const adminId = super_admin.id;
        
            for (const productType of products["productTypes"]) {
                const type = await ProductType.findOne({ where: { name: productType.name } });
                if(type && type.id) {
                    const typeId = type.id;
                
                    for(const product of productType.products) {
                        finalProducts.push({
                            name: product.name,
                            nameEn: product.nameEn,
                            description: product.description,
                            descriptionEn: product.descriptionEn,
                            image: product.image,
                            barcode: product.barcode,
                            in_stock: product.in_stock,
                            quantity: product.quantity,
                            retailer_price: product.retailer_price,
                            consumer_price: product.consumer_price,
                            featured: product.featured,
                            typeId: typeId,
                            userId: adminId
                        });
                    }
                }
            }
        }

        try {
            await Product.bulkCreate(finalProducts);
            console.log('Products seeded successfully');
        } catch (err) {
            console.error("❌ Failed to insert Product:", err);
        }
    } else {
        console.log("Products already exist");
    }
}
