import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.BlogModel.belongsToMany(models.BlogCategoriesModel, {
        as: "blog_categories",
        through:"blog_category_blog",
        foreignKey: "blog_category_id",
        otherKey: "blog_id"
    })
}
