// import Models from "../../../database/models";
import db from "./db";

export async function init() {
    // let models = Models.get();
    let models = await db();
console.log('authentication relation models');
    if (!models.User ) {
        console.error("UserModel is undefined. Check model initialization.");
        return;
    }
    if (!models.UserRolesModel) {
        console.error("UserRolesModel is undefined. Check model initialization.");
        return;
    }

    models.User.belongsTo(models.UserRolesModel, {  
        foreignKey: "role_serial",
        as: "role",  
    });

    models.UserRolesModel.hasMany(models.User, {
        foreignKey: "role_serial",
        as: "users",
    });
}

