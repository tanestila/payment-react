export default function LoginLogin({ onChange, value }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-container">
      <i className="icon-user icon" />
      <input
        type="text"
        placeholder="Enter your email"
        onChange={handleChange}
        name="login"
        value={value}
      />
    </div>
  );
}
