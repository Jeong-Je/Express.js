const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Post = require('./post');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {}; // db 빈 객체 생성

// new Sequelize(..options)로 DB와 연결
// config 파일에 만든 내용
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;
db.Post = Post;


User.init(sequelize);
Comment.init(sequelize);
Post.init(sequelize);

User.associate(db);
Comment.associate(db);
Post.associate(db);


module.exports = db;