import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.BlogModel.hasMany(models.BlogCategoryBlogModel, {
        foreignKey: "blog_id",
        sourceKey: "id",
        as: "blog_categories",
    });
    models.BlogModel.hasMany(models.BlogTagBlogModel, {
        foreignKey: "blog_id",
        sourceKey: "id",
        as: "blog_tags",
    });

    // models.BlogCommentModel.belongsTo(models.BlogModel, {
    //     foreignKey: "blog_id",
    //     as: "blogs",
    // });
}
