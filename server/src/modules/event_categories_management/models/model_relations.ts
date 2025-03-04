import Models from "../../../database/models";

export function init() {
    const models = Models.get();


    if (!models.EventModel ) {
        console.error("EventModel is undefined ( IN Event Categories Management). Check model initialization.");
        return;
    }
    if (!models.EventCategoriesModel) {
        console.error("EventCategoriesModel is undefined (IN Event Categories Management). Check model initialization.");
        return;
    }
    // Define the association with EventModel
    models.EventCategoriesModel.belongsToMany(models.EventModel, {
        as: "category_events",
        through: "event_category_event",
        foreignKey: "event_category_id",  // This should match event_category_event table
        otherKey: "event_id",
    });

    models.EventCategoryEventModel.belongsTo(models.EventModel, {
        foreignKey: "event_id",
        as: "event",
    });
    console.log('event category management relation models');

}
