import "./LoginRegister.css"
function Login(){
    return(

<div className="login-card">


<form>
  <div className="mb-3">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control" id="inputEmail4"/>
  </div>

    <div className="mb-3">
    <label htmlFor="inputPassword4" className="form-label">Şifre</label>
    <input type="password" className="form-control" id="inputPassword4"/>
  </div>
  
  
  <div className="col-12 d-flex justify-content-between" >
    <button type='submit' className="btn-button btn-primary w-50 me-2" >Giriş Yap</button>
</div>

        
</form>
    </div>
);

}

export default Login;

