import {
    // Association,
    DataTypes,
    // HasManyAddAssociationMixin,
    // HasManyCountAssociationsMixin,
    // HasManyCreateAssociationMixin,
    // HasManyGetAssociationsMixin,
    // HasManyHasAssociationMixin,
    // HasManySetAssociationsMixin,
    // HasManyAddAssociationsMixin,
    // HasManyHasAssociationsMixin,
    // HasManyRemoveAssociationMixin,
    // HasManyRemoveAssociationsMixin,
    Model,
    // ModelDefined,
    // Optional,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

export const tableName = 'event_feedback_form_fields';
export const modelName = 'EventFeedbackFormFieldsModel';

interface SelectOption {
    label: string;
    value: string | number;
}

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive';
type type = 'text' | 'date' | 'number' | 'textarea' | 'select' | 'checkbox';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare event_id: number;
    declare label: string;
    declare type: type;
    declare select_options: SelectOption[];
    declare serial: number;

    declare status?: status;
    declare creator?: number;

    declare created_at?: CreationOptional<Date>;
    declare updated_at?: CreationOptional<Date>;
}

function init(sequelize: Sequelize) {
    DataModel.init(
        {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            event_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            label: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            type: {
                type: new DataTypes.ENUM('text', 'date', 'number', 'textarea', 'select', 'checkbox'),
                defaultValue: 'text',
            },
            select_options: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            serial: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },


            status: {
                type: new DataTypes.ENUM('active', 'deactive'),

                defaultValue: 'active',
            },

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: tableName,
            modelName: modelName,
            sequelize, // passing the `sequelize` instance is required
            underscored: true,
        },
    );

    return DataModel;
}

export { init, DataModel };
