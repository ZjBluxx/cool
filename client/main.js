if(Meteor.isClient){
	Meteor.subscribe('resol');
	Template.body.helpers({
		resolutions: function () {
			if(Session.get('hideFinished')){
				return Resol.find({checked: {$ne: true}});   
			}else{
				return Resol.find();
			}
			
		},
		hideFinished: function () {
			return Session.get('hideFinished');
		}
	});

	Template.body.events({
		'submit .new-resolution': function(event){
			var title = event.target.title.value;
			Meteor.call("addResol", title);

			event.target.title.value = "";
			return false; // ensure the page doesnt refresht
		},
		'change .hide-finished':function (event) {
			
			Session.set('hideFinished', event.target.checked);
		}
	});

	Template.resolution.events({
		'click .toggle-checked': function() {
			Meteor.call("upResol", this._id, !this.checked);
		},
		'click .delete': function () {
			Meteor.call("delResol", this._id);
		},
		'click .toggle-private': function () {
			Meteor.call("priResol", this._id, !this.private);
		}
	});
	Template.resolution.helpers({
		isOwner: function () {
			return this.owner===Meteor.userId();
		}
	});

	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_ONLY' //  One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
	});
}
