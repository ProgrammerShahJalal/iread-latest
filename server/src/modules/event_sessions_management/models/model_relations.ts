import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.EventModel.hasMany(models.EventCertifiedUsersModel, {
        foreignKey: "event_id",
        as: "event_sessions",
    })
}
