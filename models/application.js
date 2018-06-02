'use strict';
module.exports = (sequelize, DataTypes) => {
	var Application = sequelize.define(
		'Application',
		{
			status_id: {
				type: DataTypes.INTEGER,
			},
		},
		{}
	);
	Application.associate = function(models) {
		// associations can be defined here
	};
	return Application;
};
