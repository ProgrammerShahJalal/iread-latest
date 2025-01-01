import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.BlogCategoriesModel.belongsToMany(models.BlogModel, {
        as: "category_blogs",
        through:"blog_category_blog",
        otherKey: "blog_category_id",
        foreignKey: "blog_id"
    })
    // models.ContactModel.hasOne(models.ContactModel2, {
    //     as: "contacts2",
    //     foreignKey: "contact_id",
    //     sourceKey: "id",
    // })
}
