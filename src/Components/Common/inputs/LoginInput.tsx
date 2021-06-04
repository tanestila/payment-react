type Props = {
  onChange: Function;
  value: string;
};
export const LoginInput: React.FC<Props> = ({ onChange, value }) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
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
};
