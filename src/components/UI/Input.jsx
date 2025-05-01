export default function Input({ label, id, ...props }) {
  return (
    <p className="control">
      <label htmlFor={label}>{label}</label>
      <input id={id} name={id} {...props} required />
    </p>
  );
}
