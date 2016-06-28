Meteor.methods({
	addResol: function (title) {
		Resol.insert({
				title: title,
				createdAt: new Date(),
				owner:Meteor.userId()
			});
	},

	delResol: function (id) {
		var res = Resol.findOne(id); 
		if(res.owner!== Meteor.userId()){
			throw new Meteor.Error("not_authorised");
		}

		Resol.remove(id);
	},

	upResol: function (id, checked) {
		var res = Resol.findOne(id); 
		if(res.owner!== Meteor.userId()){
			throw new Meteor.Error("not_authorised");
		}

		Resol.update(id, {$set: {checked: checked}});
	},

	priResol: function (id, private) {
		var res = Resol.findOne(id); 
		if(res.owner!== Meteor.userId()){
			throw new Meteor.Error("not_authorised");
		}

		Resol.update(id, {$set: {private: private}});
	}


});