var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// connects to mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

// connection error if applicable and starts functions
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

// List a set of menu options: View Products for Sale * View Low Inventory * Add to Inventory * Add New Product
function start() {
    inquirer
        .prompt({
            name: "managerChoices",
            type: "list",
            message: "Choose an option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit to Terminal"]
        })
        .then(function (answer) {
            if (answer.managerChoices === "View Products for Sale") {
                showItems();
            } else if (answer.managerChoices === "View Low Inventory") {
                lowInventory();
            } else if (answer.managerChoices === "Add to Inventory") {
                updateInventory();
            } else if (answer.managerChoices === "Add New Product") {
                addNewProduct();
            } else {
                exit();
            }
        });
}

// If a manager selects "View Products for Sale", the app should list every available item: the item IDs, names, prices, and quantities.
function showItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["ID", "Product Name", "Price", "Quantities"],
            colWidths: [5, 30, 10, 15]
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        showItems();
    });
}

// If a manager selects "View Low Inventory", shows all items that have under 5 left in stock
function lowInventory() {
    var query =("SELECT * FROM products WHERE stock_quantity BETWEEN ? AND ?");
        connection.query(query, [0, 5], function (err, res) {
                if (err) throw err;
                var table = new Table({
                    head: ["ID", "Product Name", "Price", "Quantities"],
                    colWidths: [5, 30, 10, 15]
                });
                for (var i = 0; i < res.length; i++) {
                    table.push([res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity]);
                }
                console.log(table.toString());
                start();
            });
}

function updateInventory() {  
    inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What product would you like to update inventory amount?"
      },
      {
        name: "inventory",
        type: "input",
        message: "How many would you like to add?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE products SET ? WHERE ?",
        {
            stock_quantity: answer.inventory,
        },
        {
            product_name: answer.item,
        },
        function(err, res) {
            console.log("Your product was added successfully!");
            start();
        }
      );
    });
}


function addNewProduct() {
    inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the new product you would like to add?"
      },
      {
        name: "category",
        type: "input",
        message: "What category or department does your item belong in?"
      },
      {
        name: "cost",
        type: "input",
        message: "What price does the item sell for?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of this item do you have to sell?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.product,
            department_name: answer.category,
            price: answer.cost,
            stock_quantity: answer.quantity
          },
          function(err) {
            if (err) throw err;
            console.log("Your product was added successfully!");
            start();
          }
        );
      });
  }

function exit() {
    connection.end();
}

