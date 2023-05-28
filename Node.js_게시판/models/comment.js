const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
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
            modeName: 'Comment',
            tableName: 'comments',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }

    static associate(db){
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', sourceKey: 'id' });
        db.Comment.belongsTo(db.Post, { foreignKey: 'postId', sourceKey: 'id' });
    }
}