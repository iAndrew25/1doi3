export default function({email, name, handleChange}) {
	return(
		<div className="login-box">
			<h1>Sign up</h1>
			<input type="text" placeholder="Display Name" value={name} onChange={e => handleChange('name', e.target.value)}/>
			<input type="text" placeholder="E-mail Address" value={email} onChange={e => handleChange('email', e.target.value)}/>
			<button className="btn-add">Sign up</button>
		</div>
	)
}