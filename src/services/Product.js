import { API, DEFAULT_STOCK_QUANTITY } from "../constants/wordpress";
import { buildURL, getPaginationData } from "./URLs";

export class Product {
  async getProducts({
    category,
    page = 1,
    perPage = API.PRODUCTS.RESULTS_PER_PAGE,
    orderBy = "name",
  }) {
    const url = buildURL(API.PRODUCTS.URL, {
      status: "publish",
      skip_cache: 1,
      page,
      per_page: perPage,
      category,
      orderby: orderBy,
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const responseJson = await response.json();
    const products = this.formatResults(responseJson);
    const pagination = getPaginationData(response);
    return { data: products, pagination };
  }

  async getProduct({ id }) {
    const url = buildURL(`${API.PRODUCTS.URL}/${id}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const responseJson = await response.json();
    const product = this.formatProduct(responseJson);
    return product;
  }

  async getProductsByIds({
    page = 1,
    perPage = API.PRODUCTS.RESULTS_PER_PAGE,
    ids,
  }) {
    const url = buildURL(
      API.PRODUCTS.URL,
      {
        status: "publish",
        skip_cache: 1,
        page,
        per_page: perPage,
      },
      {
        include: ids.join(","),
      }
    );

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products by ids");
    }

    const responseJson = await response.json();
    const products = this.formatResults(responseJson);
    const pagination = getPaginationData(response);

    return { data: products, pagination };
  }

  formatResults(products) {
    return products.map((product) => this.formatProduct(product));
  }

  /**
   * Formats a WooCommerce product object into a simplified format.
   * @see {@link https://woocommerce.github.io/woocommerce-rest-api-docs/?shell#product-properties | WooCommerce Product Properties.}
   * @param {Object} product WooCommerce product object.
   * @return {Object} Simplified product object.
   */
  formatProduct(product) {
    const categories = this.getCategoriesNames(product?.categories);
    const stockQuantity = this.getStockQuantity(product?.stock_quantity);
    return {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      regularPrice: product?.regular_price,
      salePrice: product?.sale_price,
      imageUrl: product?.images[0]?.src,
      inStock: product?.stock_status === "instock",
      description: product?.description,
      sku: product?.sku,
      stockQuantity,
      categories,
      relatedIds: product?.related_ids,
    };
  }

  getCategoriesNames(categories) {
    if (!categories) return [];
    return categories.map((category) => category.name);
  }

  getStockQuantity(stock) {
    try {
      if (stock === null || isNaN(stock)) return DEFAULT_STOCK_QUANTITY;
      return stock;
    } catch (error) {
      return DEFAULT_STOCK_QUANTITY;
    }
  }
}
