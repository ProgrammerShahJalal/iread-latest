import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.EventModel.hasMany(models.EventSessionsModel, {
        foreignKey: "event_id",
        as: "event_sessions",
    })
}
