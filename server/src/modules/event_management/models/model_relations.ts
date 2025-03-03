import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.EventModel.hasMany(models.EventCategoryEventModel, {
        foreignKey: "event_id",
        sourceKey: "id",
        as: "event_categories",
    });
    models.EventModel.hasMany(models.EventTagEventModel, {
        foreignKey: "event_id",
        sourceKey: "id",
        as: "event_tags",
    });
}
