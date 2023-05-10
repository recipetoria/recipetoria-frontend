import Print from "../../assets/svg/Print";
import Share from "../../assets/svg/Share";
import Trash from "../../assets/svg/Trash";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ShoppingListTable from "../../components/ShoppingListTable/ShoppingListTable";
import "./ShoppingListPage.scss";

export default function ShoppingListPage() {
  return (
    <>
      <Header />
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
              <article className="shopping-list-block__table">
                <ShoppingListTable />
              </article>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
