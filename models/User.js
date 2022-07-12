// Model Dependancies 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt'); //new library that helps hash passwords

// Create User Model
class User extends Model {
    // Method to check pasword for each user
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// // Const to validate email input
// // Regex email validation pulled from https://www.regular-expressions.info/email.html
// const validateEmail = (email) => {
// 	const valid = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(email);
// 	if (valid) {
// 		return true;
// 	} else {
// 		return "Please enter a valid email address"
// 	}
// }
// // Const to validate id input = cannot be NULL
// const validateId = (id) => {
// 	if (!id) {
// 		return "Input cannot be blank. Please try again."
// 	} 
// 	return true;
// }

// Table Columns and Configs definitions
User.init(
    {
        // Column ID
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // Username Column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // Email Column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { 
                isEmail: true
             }
        },
        // Password Column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [6]
            }
        }

    },
    { 
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
          // set up beforeUpdate lifecycle "hook" functionality
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
      },
      
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'

    }
);

module.exports = User;