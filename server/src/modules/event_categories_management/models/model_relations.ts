import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    // Define the association with EventModel
    models.EventCategoriesModel.belongsToMany(models.EventModel, {
        as: "category_events",
        through: "event_category_event",
        otherKey: "event_category_id",
        foreignKey: "event_id",
    });

}
