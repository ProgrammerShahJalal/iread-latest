import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    models.EventModel.hasMany(models.EventPaymentRefundsModel, {
        foreignKey: "event_id",
        as: "event_payment_refunds",
    })
}
