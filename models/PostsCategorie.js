module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategorie',
    {},
    { timestamps: false, tableName: 'PostsCategories' });

  PostsCategorie.associate = (models) => {
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostsCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategorie;
};