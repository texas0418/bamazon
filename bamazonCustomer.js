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
    showItems();
});

// display all of the items available for sale. Include the ids, names, and prices of products for sale. Table from cli-table on npm
function showItems() {
    connection.query("SELECT * FROM products", function (err, res) { // allows user to purchase items listed.
        if (err) throw err;
        var table = new Table({
            head: ["ID", "Product Name", "Price"],
            colWidths: [5, 30, 10]
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].price]);
        }
        console.log(table.toString());

        inquirer.prompt([{
                name: "item",
                type: "input",
                message: "What is the ID of the product you wish to purchase?", // The first should ask them the ID of the product they would like to buy.
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?", // The second message should ask how many units of the product they would like to buy.
            }
        ]).then(function (answer) {
            connection.query(
                "SELECT * FROM products WHERE ?", {
                    id: answer.item
                },
                function (err, data) {
                    if (err) throw err;
                    if (answer.quantity > data[0].stock_quantity) {
                        console.log("We don't have that quantity in stock. Please choose another quantity");
                        
                    } else {
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [{
                                    stock_quantity: data[0].stock_quantity - answer.quantity,
                                },
                                {
                                    id: answer.item
                                }
                            ],
                            function (err) {
                                if (err) throw err;
                                console.log("Thanks for your order. Your total is $" + (parseInt(answer.quantity) * data[0].price).toFixed(2));
                            }
                        );
                        connection.end();
                    }
                }
            );
        });
    });
}