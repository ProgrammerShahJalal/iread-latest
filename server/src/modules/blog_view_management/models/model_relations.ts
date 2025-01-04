import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    // models.BlogModel.hasMany(models.BlogViewModel, {
    //     foreignKey: "blog_id",
    //     as: "views",
    // })
    
}
