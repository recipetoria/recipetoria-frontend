export default function Button(props: { icon: JSX.Element }) {
  const { icon } = props;

  return (
    <button type="button" className="btn">
      {icon}
    </button>
  );
}
