module.exports = function(mongoose) {
	var modelObject = {};

	var Schema = mongoose.Schema
	    , ObjectId = Schema.ObjectId;


	var crypto = require('crypto');

	var validatePresenceOf = function(value){
	  return value && value.length; 
	};


	// SCHEMAS
	// ============================================================================

	var UserSchema = new Schema({
	    createdOn: {type: Date, default: Date.now}
	    , firstName: String
	    , lastName: String
	    , emailAddress: String
	    , facebookUser: String
	    , hashed_password: String
	    , salt: String
	    , active: { type: Boolean, default: false }
	    , loginAttempts: { type: Number, default: 0 }
	});

	UserSchema.virtual('id')
	    .get(function() {
	      return this._id.toHexString();
	    });

	 UserSchema.virtual('password')
	   .set(function(password) {
	     this._password = password;
	     this.salt = this.makeSalt();
	     this.hashed_password = this.encryptPassword(password);
	   })
	   .get(function() { return this._password; });

	 UserSchema.method('authenticate', function(plainText) {
	   return this.encryptPassword(plainText) === this.hashed_password;
	 });

	 UserSchema.method('makeSalt', function() {
	   return Math.round((new Date().valueOf() * Math.random())) + '';
	 });

	 UserSchema.method('encryptPassword', function(password) {
	   return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	 });
	 UserSchema.method('encryptPin', function(pin) {
	   return crypto.createHmac('sha1', PIN_SALT).update(pin).digest('hex');
	 });

	 UserSchema.pre('save', function(next) {
	 	
	 	if (!validatePresenceOf(this.password)) {
		    next({ Error: 'Invalid password' });
		  } else {
		    next();
		  }

	 	next();
	 });

  	modelObject.User = mongoose.model('User', UserSchema);

	return modelObject;
}