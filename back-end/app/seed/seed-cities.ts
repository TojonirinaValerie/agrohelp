import City from "@/models/city";
import * as citiesData from "../data/cities.json";
import Country from "@/models/country";

export const seedCities = async () => {
    const count = await City.count();
    if (count === 0) {
      await City.bulkCreate(citiesData.cities);
      console.log('Cities seeded successfully');
      await Country.create({ name: "Madagascar" });
      console.log('Country Madagascar seeded successfully');
    } else {
      console.log('Cities already exist');
    }
}

