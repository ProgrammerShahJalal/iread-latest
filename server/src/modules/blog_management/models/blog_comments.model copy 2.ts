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

export const tableName = 'blog_comments';
export const modelName = 'BlogCommentModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive' | 'block';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare title: string;
    declare author_id: number;
    declare short_description: string;
    declare full_description: string;
    declare cover_image: string;

    declare is_published: status;
    declare publish_date?: Date;

    declare slug: string;
    declare seo_title: string;
    declare seo_keyword: string;
    declare seo_description: string;


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

            title: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            author_id: {
                type: DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            short_description: {
                type: DataTypes.TEXT(),
                allowNull: true,
            },
            full_description: {
                type: DataTypes.TEXT(),
                allowNull: true,
            },
            cover_image: {
                type: DataTypes.STRING(),
                allowNull: true,
            },

            is_published: {
                type: DataTypes.BOOLEAN(),
                allowNull: true,
                defaultValue: false,
            },

            publish_date: {
                type: DataTypes.DATE(),
                allowNull: true,
            },

            seo_title: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            seo_keyword: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            seo_description: {
                type: DataTypes.TEXT(),
                allowNull: true,
            },

            slug: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            status: {
                type: new DataTypes.ENUM('active', 'deactive', 'draft', 'published'),

                defaultValue: 'draft',
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
