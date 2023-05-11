export default function SnackBar(props: { text: string }) {
  const { text } = props;

  return (
    <aside className="snackbar">
      <span className="snackbar__text">{text}</span>
    </aside>
  );
}
