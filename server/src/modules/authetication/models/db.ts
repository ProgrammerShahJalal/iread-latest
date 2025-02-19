import {
    Sequelize,
} from 'sequelize';
import DB from '../../../bootstrap/db.sql';
import * as user_module_model from './user_model';
import * as roles_module_model from './user_roles_model';
import * as parents_module_model from './user_parents_model';
import * as students_module_model from './user_students_model';


interface models {
    UserModel: typeof user_module_model.DataModel;
    UserRolesModel: typeof roles_module_model.DataModel;
    UserParentsModel: typeof parents_module_model.DataModel;
    UserStudentsModel: typeof students_module_model.DataModel;
    sequelize: Sequelize;
}
const db = async function (): Promise<models> {
    const sequelize: Sequelize = await DB.connect();

    let models: models = {
        UserModel: user_module_model.init(sequelize),
        UserRolesModel: roles_module_model.init(sequelize),
        UserParentsModel: parents_module_model.init(sequelize),
        UserStudentsModel: students_module_model.init(sequelize),
        sequelize,
    };

    await sequelize.sync({});

    /*__ define relation start __*/

    // models[module_model.modelName].hasMany(User, {
    //     sourceKey: 'id',
    //     foreignKey: 'user_id',
    //     as: 'users',
    // });

    /*__ define relation end __*/

    return models;
};
export default db;

/**
    models.User.hasMany(Project, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'projects',
    });

    models.User.hasOne(Project, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'project',
    });

    models.Project.belongsToMany(User, {
        through: 'project_user',
    });
    
    models.User.belongsToMany(Project, {
        through: 'project_user',
    });
 */