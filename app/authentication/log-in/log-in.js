export default function({email, password, handleChange}) {
	return(
		<div className="login-box">
			<h1>Log in</h1>
			<input type="text" placeholder="E-mail Address" value={email} onChange={e => handleChange('email', e.target.value)}/>
			<input type="password" placeholder="Password" value={password} onChange={e => handleChange('password', e.target.value)}/>
			<button className="btn-add">Log in</button>
			<p className="forgot-password">Forgot password</p>
		</div>
	)
}