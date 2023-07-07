
const handleRegister = (req,res,db,bcrypt)=>{
	const {name, email, password} = req.body
	if (!name || !email || !password){
		return res.status(400).json("incorrect format")
	}
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	db.transaction(trx=>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginemail=>{
				trx('users')
					.returning('*')
					.insert({
     					email: loginemail[0].email, 
						name:name,
						joined: new Date()
					})
					.then(user=>{
						res.json(user[0])
					})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})

	.catch(error=>res.status(400).json('Unable to register'))
	
}

module.exports = {
	handleRegister:handleRegister
}