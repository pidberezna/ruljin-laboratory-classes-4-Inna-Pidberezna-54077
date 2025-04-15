const { MENU_LINKS } = require('../constants/navigation');
const { STATUS_CODE } = require('../constants/statusCode');
const Product = require('../models/Product');

const getProductsView = (_request, response) => {
  response.render('products.ejs', {
    headTitle: 'Shop - Products',
    path: '/',
    menuLinks: MENU_LINKS,
    activeLinkPath: '/products',
    products: Product.getAll(),
  });
};

const getAddProductView = (_request, response) => {
  response.render('add-product.ejs', {
    headTitle: 'Shop - Add product',
    path: '/add',
    menuLinks: MENU_LINKS,
    activeLinkPath: '/products/add',
  });
};

const addNewProduct = (request, response) => {
  const { name, description } = request.body;
  const newProduct = new Product(name, description);
  Product.add(newProduct);
  response.status(STATUS_CODE.FOUND).redirect('/products/new');
};

const getNewProductView = (_request, response) => {
  response.render('new-product.ejs', {
    headTitle: 'Shop - New product',
    path: '/new',
    activeLinkPath: '/products/new',
    menuLinks: MENU_LINKS,
    newestProduct: Product.getLast(),
  });
};

const getProductView = (request, response) => {
  const { name } = request.params;
  const product = Product.findByName(name);

  response.render('product.ejs', {
    headTitle: `Shop - ${product ? product.name : 'Product'}`,
    path: `/products/${name}`,
    activeLinkPath: '/products',
    menuLinks: MENU_LINKS,
    product: product,
  });
};

const deleteProduct = (request, response) => {
  const { name } = request.params;
  Product.deleteByName(name);
  response.status(STATUS_CODE.OK).json({ success: true });
};

module.exports = {
  getProductsView,
  getAddProductView,
  addNewProduct,
  getNewProductView,
  getProductView,
  deleteProduct,
};
