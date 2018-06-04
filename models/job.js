'use strict';
module.exports = (sequelize, DataTypes) => {
	var Job = sequelize.define(
		'Job',
		{
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			responsibilities: DataTypes.TEXT,
			skills: DataTypes.TEXT,
		},
		{}
	);
	Job.associate = models => {
		// associations can be defined here -- one to many
		Job.belongsTo(models.Company, {
			foreignKey: {
				allowNull: false,
			},
		});
		Job.belongsToMany(models.Candidate, {
			through: 'Application',
		});
	};
	return Job;
};
