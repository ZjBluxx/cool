Meteor.publish("resol", function () {
	return Resol.find({
		$or:[
			{private: {$ne: true}}, // resolution is public
			{owner: this.userId}
		]
	});
});