import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.BlogCommentRepliesModel.belongsTo(models.BlogCommentModel, {
        foreignKey: "parent_comment_id",
        targetKey: "id",
        as: "comments",
    });
    


}
