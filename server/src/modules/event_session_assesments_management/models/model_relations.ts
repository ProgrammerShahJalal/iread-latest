import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.EventSessionsModel.hasMany(models.EventSessionsAssesmentsModel, {
        foreignKey: "event_session_id",
        as: "event_sessions_assesments",
    })
}
