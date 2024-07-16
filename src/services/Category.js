import { API, BLOCKED_CATEGORY_IDS } from "../constants/wordpress";
import { buildURL, getPaginationData } from "./URLs";

export class Category {
  async getCategories({
    parentId,
    page = 1,
    perPage = API.CATEGORIES.RESULTS_PER_PAGE,
    orderBy = "name",
  }) {
    const url = buildURL(
      API.CATEGORIES.URL,
      {
        parent: parentId,
        page,
        per_page: perPage,
        orderby: orderBy,
      },
      {
        exclude: BLOCKED_CATEGORY_IDS.join(","),
      }
    );

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const responseJson = await response.json();
    const categories = this.formatResults(responseJson);
    const pagination = getPaginationData(response);

    return { data: categories, pagination };
  }

  formatResults(categories) {
    return categories.map((category) => this.formatCategory(category));
  }

  /**
   * Formats a WooCommerce category object into a simplified format.
   * @see {@link https://woocommerce.github.io/woocommerce-rest-api-docs/?shell#product-category-properties | WooCommerce Product Category Properties.}
   * @param {Object} category WooCommerce category object.
   * @return {Object} Simplified category object.
   */
  formatCategory(category) {
    return {
      id: category?.id,
      name: category?.name,
      slug: category?.slug,
      description: category?.description,
      imageUrl: category?.image?.src,
    };
  }
}
