var color = require('cli-color');

var Product = function(productObj) {
  this.id = productObj.item_id;
  this.name = productObj.product_name;
  this.dept = productObj.department_name;
  this.price = productObj.price;
  this.quantity = productObj.stock_quantity
};

Product.prototype.displayItemToCustomer = function() {
  console.log('\n' + 
            color.green(this.id) +
            '\t' + 
            color.cyan(this.name) + 
            '\t' + 
            color.magenta(this.price));
}

Product.prototype.displayItemToManager = function() {
  console.log('\n' + 
            color.green(this.id)+
            '\t' + 
            color.cyan(this.name) + 
            '\t' + 
            color.magenta(this.price) + 
            '\t' + 
            color.yellow(this.quantity));
}

module.exports = {
  Product: Product
}