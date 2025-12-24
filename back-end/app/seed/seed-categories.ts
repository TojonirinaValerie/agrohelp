import Category from "@/models/category";
import * as categoriesData from "../data/categories.json";

export const seedCategories = async () => {
    const count = await Category.count();
    if (count === 0) {
      await Category.bulkCreate(categoriesData.categories);
      console.log('Categories seeded successfully');
    } else {
      console.log('Categories already exist');
    }
}

