import Category from "@/models/category";
import * as productTypeData from "../data/product-types.json";
import ProductType from "@/models/product-type";

export const seedProductTypes = async () => {
    const count = await ProductType.count();
    if (count === 0) {
      const finalProductType: any[] = [];

      for (const type of productTypeData.types) {
        const category = await Category.findOne({ where: { name: type.name } });
        const category_id = category?.id;

        for (const product of type["productTypes"]) {
          finalProductType.push({
            name: product.name,
            nameEn: product.nameEn,
            description: product.description,
            descriptionEn: product.descriptionEn,
            categoryId: category_id
          });
        }
      }

      try {
        await ProductType.bulkCreate(finalProductType);
        console.log('Product Types seeded successfully');
      } catch (err) {
        console.error("❌ Failed to insert:", err);
      }
    } else {
      console.log('Product Types already exist');
    }
}

