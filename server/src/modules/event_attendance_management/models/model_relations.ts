import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.EventModel.hasMany(models.EventAttendanceModel, {
        foreignKey: "event_id",
        as: "event_attendance",
    })

    models.EventAttendanceModel.belongsTo(models.UserModel, {
        foreignKey: "user_id",
        targetKey: "id",
        as: "user",
    });

    models.EventAttendanceModel.belongsTo(models.EventModel, {
        foreignKey: "event_id",
        targetKey: "id",
        as: "event",
    });
    models.EventAttendanceModel.belongsTo(models.EventSessionsModel, {
        foreignKey: "event_id",
        targetKey: "id",
        as: "session",
    });
}
