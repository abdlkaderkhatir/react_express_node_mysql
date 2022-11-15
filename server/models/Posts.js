module.exports = (sequelize, DataTypes) => {

       const Post=sequelize.define("Posts", {
                // Model attributes are defined here
                title: {
                type: DataTypes.STRING,
                allowNull: false,
                },
                postText: {
                type: DataTypes.STRING,
                allowNull: false,
                },
                username: {
                type: DataTypes.STRING,
                allowNull: false,
                },
            });

    return Post;
};
