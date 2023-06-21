import fakePhoto from "./tagsFakePhotos/photo.png";

const names = [
  "Chicken",
  "Dinners",
  "Gluten-free",
  "Meat",
  "Mom`s recipes",
  "Oven",
  "Passover",
  "Passover",
  "Quick recipes",
  "Romantic recipes",
  "Spaghetti",
  "Summer dishes",
  "Uncategorized",
];

const allTagsFakeDataArr: {
  id: number;
  name: string;
  mainPhoto: string | null;
  applicationUserId: number;
  recipeIds: [];
}[] = [];

names.map((item, id) =>
  allTagsFakeDataArr.push({
    id,
    name: item,
    mainPhoto: !(id % 3) ? fakePhoto : null,
    applicationUserId: 1,
    recipeIds: [],
  })
);

export default allTagsFakeDataArr;
