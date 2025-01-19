import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.EventModel.hasMany(models.EventPaymentsModel, {
        foreignKey: "event_id",
        as: "event_payments",
    })
}
