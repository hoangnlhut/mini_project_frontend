let inventory = [
];


function findProductIndex(nameItem){
  // console.log(inventory);
    for(let i = 0; i < inventory.length; i++)
    {
        if(inventory[i].name.toLowerCase() === nameItem.toLowerCase()) return i;
    }
    return -1;
}


function addProduct(productObj){
 // Ensure product name is lowercase
  const product = {
    name: productObj.name.toLowerCase(),
    quantity: productObj.quantity
  };

  let index = findProductIndex(product.name);

  console.log("index: " + index);

  if(index >= 0)
  {
    inventory[index].quantity += product.quantity;
    console.log(`${product.name} quantity updated`);
  }
  else
  {
    inventory.push(product);
    console.log(`${product.name} added to inventory`);
  }
}

function removeProduct(productName, quantity){
    let index = findProductIndex(productName);
    if(index < 0)
        {
            console.log(`${productName} not found`);
            return;
        } 

    const product = inventory[index];
  
  if (product.quantity < quantity) {
    // Not enough quantity available
    console.log(`Not enough ${product.name} available, remaining pieces: ${product.quantity}`);
    return;
  }
  
  // Subtract quantity
  product.quantity -= quantity;
  
  if (product.quantity === 0) {
    // Remove product from inventory if quantity is zero
    inventory.splice(index, 1);
    console.log(`Remaining ${product.name} pieces: 0`);
  } else {
    // Log remaining quantity
    console.log(`Remaining ${product.name} pieces: ${product.quantity}`);
  }

}

// Helper function to display current inventory
function displayInventory() {
    console.log("Current Inventory:");
    if (inventory.length === 0) {
      console.log("  (empty)");
    } else {
      inventory.forEach(product => {
        console.log(`  ${product.name}: ${product.quantity}`);
      });
    }
    console.log("---");
  }


  // Test the inventory management system
console.log("=== Inventory Management System Demo ===\n");

// Test adding products
console.log("Adding products:");
addProduct({ name: "Apple", quantity: 10 });
addProduct({ name: "Banana", quantity: 5 });
addProduct({ name: "Orange", quantity: 8 });
displayInventory();

// Test updating existing product
console.log("Adding more apples:");
addProduct({ name: "APPLE", quantity: 3 }); // Test case sensitivity
displayInventory();

// Test removing products
console.log("Removing products:");
removeProduct("apple", 5);
removeProduct("Banana", 2);
displayInventory();

// Test removing more than available
console.log("Trying to remove more than available:");
removeProduct("orange", 10);
displayInventory();

// Test removing exact quantity (should remove from inventory)
console.log("Removing all remaining oranges:");
removeProduct("orange", 8);
displayInventory();

// Test removing non-existent product
console.log("Trying to remove non-existent product:");
removeProduct("grape", 1);
displayInventory();

// Test edge cases
console.log("Testing edge cases:");
addProduct({ name: "MANGO", quantity: 0 }); // Adding zero quantity
removeProduct("mango", 0); // Removing zero quantity
displayInventory();