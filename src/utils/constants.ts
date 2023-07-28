const BASE_URL = process.env.REACT_APP_BASE_URL;

const USER_SETTINGS = `${BASE_URL}client/settings`;
export const URL_USER_PROFILE_PHOTO = `${USER_SETTINGS}/photo`;
export const URL_UPDATE_USER_NAME = `${USER_SETTINGS}/personal-info`;
export const URL_USER_PASSWORD = `${USER_SETTINGS}/password`;
export const URL_USER_INFO = `${USER_SETTINGS}`;
export const URL_DELETE_ACCOUNT = `${USER_SETTINGS}/account`;

const SHOPPING_LIST = `${BASE_URL}client`;
export const URL_INGREDIENT = `${SHOPPING_LIST}`;

const TAGS = `${BASE_URL}client/tags`;
export const URL_TAGS = `${TAGS}`;
export const URL_TAG_BY_ID = (tagId: number) => `${TAGS}/${tagId}`;
export const URL_TAG_PHOTO_BY_ID = (tagId: number) => `${TAGS}/${tagId}/photo`;

const RECIPES = `${BASE_URL}client/recipes`;
export const URL_RECIPES = `${RECIPES}`;
export const URL_FROM_RECIPE_TO_SHOP_LIST = (
  recipeId: number,
  ingredientId: number
) => `${RECIPES}/${recipeId}/ingredient/${ingredientId}`;
export const URL_RECIPE_BY_ID = (recipeId: number) => `${RECIPES}/${recipeId}`;
export const URL_RECIPE_MAIN_PHOTO = (recipeId: number) =>
  `${RECIPES}/${recipeId}/main-photo`;
export const URL_RECIPE_INSTRUCTION_PHOTO = (recipeId: number) =>
  `${RECIPES}/${recipeId}/instruction-photo`;
export const URL_RECIPE_MAIN_PHOTO_FROM_INSTRUCTION = (
  recipeId: number,
  instructionPhotoSeqNo: number
) =>
  `${RECIPES}/${recipeId}/instruction-photos/${instructionPhotoSeqNo}/set-main-photo`;
export const URL_RECIPES_BY_TAG_ID = (tagId: number) =>
  `${RECIPES}/tagged/${tagId}`;

const AUTHENTICATION_CONTROLLER = `${BASE_URL}auth`;
export const URL_REGISTER = `${AUTHENTICATION_CONTROLLER}/register`;
export const URL_AUTHENTICATE = `${AUTHENTICATION_CONTROLLER}/authenticate`;
export const URL_VERIFY_EMAIL = `${AUTHENTICATION_CONTROLLER}/verify-email`;

const INGREDIENTS = `${BASE_URL}client/ingredients`;
export const URL_INGREDIENT_BY_ID = (ingredientId: number) =>
  `${INGREDIENTS}/${ingredientId}`;
