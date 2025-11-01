function Register() {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Şifre</label>
        <input type="password" className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Adres</label>
        <input type="text" className="form-control" placeholder="Örnek Mah. 1234 Sk." />
      </div>

      <div className="mb-3">
        <label className="form-label">Şehir</label>
        <input type="text" className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">İlçe</label>
        <select className="form-select">
          <option>Seçiniz...</option>
          <option>...</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Posta Kodu</label>
        <input type="text" className="form-control" />
      </div>

      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" />
        <label className="form-check-label">
          Şartları kabul ediyorum
        </label>
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" className="submit-button w-50 me-2">Kayıt Ol</button>
        <button type="button" className="btn-button w-50 me-2">Hakkında</button>
      </div>
    </form>
  );
}

export default Register;



