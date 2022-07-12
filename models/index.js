// Creating models 
const User = require('./User');
const Watch = require('./Watch');
const Comment = require('./Comment');
const Likes = require('./Likes');

User.hasMany(Watch, {
    foreignKey: 'user_id'
});

Watch.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Watch, {
    through: Likes,
    as: 'liked_watch',
    foreignKey: 'user_id'
});

Watch.belongsToMany(User, {
    through: Likes,
    as: 'liked_watch',
    foreignKey: 'watch_id'
});

Likes.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Likes.belongsTo(Watch, {
    foreignKey: 'watch_id'
});

User.hasMany(Likes, {
    foreignKey: 'user_id'
});
  
Watch.hasMany(Likes, {
    foreignKey: 'watch_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Comment.belongsTo(Watch, {
    foreignKey: 'watch_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Watch.hasMany(Comment, {
    foreignKey: 'watch_id'
});

module.exports = {User, Watch, Likes, Comment};