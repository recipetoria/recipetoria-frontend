import "./Button.scss";

export default function Button(props: {
  icon: JSX.Element;
  onClick: () => void;
}) {
  const { icon, onClick } = props;

  return (
    <button type="button" className="btn" onClick={onClick}>
      {icon}
    </button>
  );
}
