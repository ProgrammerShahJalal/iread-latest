import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    // Define the association with EventModel
    models.EventTagsModel.belongsToMany(models.EventModel, {
        as: "tag_events",
        through: "event_tag_event",
        otherKey: "event_tag_id",
        foreignKey: "event_id",
    });
}
