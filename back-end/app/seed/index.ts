import { seedAdmin } from "./seed-admin";
import { seedCategories } from "./seed-categories";
import { seedCities } from "./seed-cities"
import { seedProductTypes } from "./seed-product-types";
import { seedProducts } from "./seed-products";

export const seed = async () => {
    await seedCities();
    await seedCategories();
    await seedProductTypes();
    await seedAdmin();
    await seedProducts();
}