const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            username: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: true,
            modeName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
        db.User.hasMany(db.Post, { foreignKey: 'poster', sourceKey: 'id' });
    }
}