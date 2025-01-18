import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    // Define the association with EventModel
    models.EventCertifiedUsersModel.belongsToMany(models.EventModel, {
        as: "certified_users_events",
        through: "event_certified_users",
        otherKey: "event_certified_user_id",
        foreignKey: "event_id",
    });
}
