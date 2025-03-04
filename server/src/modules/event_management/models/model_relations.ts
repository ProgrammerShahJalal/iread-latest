import { Sequelize } from "sequelize";
import Models from "../../../database/models";

export function init() {
    const models = Models.get();

    if (!models.EventModel ) {
        console.error("EventModel is undefined (IN Event Management). Check model initialization.");
        return;
    }
    if (!models.EventCategoriesModel) {
        console.error("EventCategoriesModel is undefined (IN Event Management). Check model initialization.");
        return;
    }

    models.EventModel.hasMany(models.EventCategoryEventModel, {
        foreignKey: "event_id",
        sourceKey: "id",
        as: "event_categories",
    });
    models.EventModel.hasMany(models.EventTagEventModel, {
        foreignKey: "event_id",
        sourceKey: "id",
        as: "event_tags",
    });

    models.EventModel.belongsToMany(models.EventCategoriesModel, {
        as: "event_categories_cat",
        through: "event_category_event",
        foreignKey: "event_id",
        otherKey: "event_category_id",
    });
    models.EventModel.belongsToMany(models.EventTagsModel, {
        as: "event_tags_tag",
        through: "event_tag_event",
        foreignKey: "event_id",
        otherKey: "event_tag_id",
    });

    console.log('event management relation models');
}
