import User from "@/models/user";
import * as adminUser from "../data/super-admin.json";

export const seedAdmin = async () => {
    const count = await User.count();
    if(count === 0) {
        const {name, email, password} = adminUser.admin;

        await User.create({ name, email, password });
        console.log("Super-Admin seeded successfully");
    } else {
        console.log("Super-Admin already exist");
    }
}