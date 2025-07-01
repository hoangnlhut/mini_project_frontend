// 1. Declare empty inventory array
let inventory = [];

// 2. Function to find product index by name
function findProductIndex(productName) {
  const lowerCaseName = productName.toLowerCase();
  return inventory.findIndex(product => product.name === lowerCaseName);
}

// 3-5. Function to add product to inventory
function addProduct(productObject) {
  // Ensure product name is lowercase
  const product = {
    name: productObject.name.toLowerCase(),
    quantity: productObject.quantity
  };
  
  const existingIndex = findProductIndex(product.name);
  
  if (existingIndex !== -1) {
    // Product exists, update quantity
    inventory[existingIndex].quantity += product.quantity;
    console.log(`${product.name} quantity updated`);
  } else {
    // Product doesn't exist, add to inventory
    inventory.push(product);
    console.log(`${product.name} added to inventory`);
  }
}

// 6-9. Function to remove product from inventory
function removeProduct(productName, quantity) {
  const lowerCaseName = productName.toLowerCase();
  const productIndex = findProductIndex(lowerCaseName);
  
  if (productIndex === -1) {
    // Product not found
    console.log(`${lowerCaseName} not found`);
    return;
  }
  
  const product = inventory[productIndex];
  
  if (product.quantity < quantity) {
    // Not enough quantity available
    console.log(`Not enough ${lowerCaseName} available, remaining pieces: ${product.quantity}`);
    return;
  }
  
  // Subtract quantity
  product.quantity -= quantity;
  
  if (product.quantity === 0) {
    // Remove product from inventory if quantity is zero
    inventory.splice(productIndex, 1);
    console.log(`Remaining ${lowerCaseName} pieces: 0`);
  } else {
    // Log remaining quantity
    console.log(`Remaining ${lowerCaseName} pieces: ${product.quantity}`);
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