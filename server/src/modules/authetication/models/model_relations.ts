import Models from "../../../database/models";

export async function init() {
    let models = Models.get();

    if (!models.UserModel ) {
        console.error("UserModel is undefined. Check model initialization.");
        return;
    }
    if (!models.UserRolesModel) {
        console.error("UserRolesModel is undefined. Check model initialization.");
        return;
    }

    models.UserModel.belongsTo(models.UserRolesModel, {  
        foreignKey: "role_serial",
        as: "role",  
    });

    models.UserRolesModel.hasMany(models.UserModel, {
        foreignKey: "role_serial",
        as: "users",
    });
}

