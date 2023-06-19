import "./StartPageBottomPartTrigger.scss";

interface StartPageBottomPartTriggerProps {
  image: {
    src: string;
    alt: string;
  };
  textHeader: string;
  textDescription: string;
}

export default function StartPageBottomPartTrigger(
  props: StartPageBottomPartTriggerProps
) {
  const { image, textHeader, textDescription } = props;

  return (
    <article className="trigger">
      <div className="trigger__image-wrapper">
        <img src={image.src} alt={image.alt} className="trigger__image" />
      </div>
      <section className="trigger__text-wrapper">
        <h4 className="trigger__h4">{textHeader}</h4>
        <span className="trigger__descr">{textDescription}</span>
      </section>
    </article>
  );
}
