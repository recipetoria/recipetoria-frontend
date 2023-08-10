import "./Button.scss";

export default function Button(props: {
  icon: JSX.Element;
  onClick: () => void;
  disabled: boolean;
}) {
  const { icon, onClick, disabled } = props;

  return (
    <button type="button" className="btn" onClick={onClick} disabled={disabled}>
      {icon}
    </button>
  );
}
