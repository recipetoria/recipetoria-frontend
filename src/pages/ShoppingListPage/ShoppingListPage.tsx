import Print from "../../assets/svg/Print";
import Share from "../../assets/svg/Share";
import Trash from "../../assets/svg/Trash";
import Button from "../../components/Button/Button";
import "./ShoppingListPage.scss";

export default function ShoppingListPage() {
  return (
    <main>
      <article className="shopping-list-page">
        <section className="img-block" />
        <section className="shopping-list-block">
          <div className="shopping-list-block__wrapper">
            <article className="shopping-list-block__header">
              <h2 className="shopping-list-block__h2">Shopping list</h2>
              <section className="shopping-list-block__btns">
                <Button icon={<Print />} />
                <Button icon={<Share />} />
                <Button icon={<Trash />} />
              </section>
            </article>
          </div>
        </section>
      </article>
    </main>
  );
}
