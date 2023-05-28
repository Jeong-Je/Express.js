const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: true,
            modeName: 'Post',
            tableName: 'posts',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }

    static associate(db){
        db.Post.belongsTo(db.User, { foreignKey: 'poster', sourceKey: 'id' });
        db.Post.hasMany(db.Comment, { foreignKey: 'postId', sourceKey: 'id' });
    }
}