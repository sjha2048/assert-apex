# **Assert Apex: Effortless Chai Assertion Generation** 

![npm version](https://img.shields.io/npm/v/assert-apex?color=blue&style=flat-square)  
![license](https://img.shields.io/npm/l/assert-apex?color=green&style=flat-square)  

Generate **Chai** assertions effortlessly from JSON objects or API response payloads. Simplify testing by letting `assert-apex` handle repetitive assertion generation tasks.

---

## **✨ Features**
- Automatically generate **Chai** assertions from any JSON structure.
- Supports deep nested objects and arrays.
- Configurable maximum depth for traversing nested structures.
- Intelligent type-checking with detailed validation messages.
- Reduces boilerplate code in tests and speeds up development.

---

## **📦 Installation**

Install the library using npm:

```bash
npm install assert-apex
```

---

## **🚀 Quick Start**

```javascript
// Import the library
const AssertApex = require('assert-apex');

// Initialize the generator with optional configurations
const generator = new AssertApex({
  maxDepth: 10 // Maximum depth to traverse for nested objects (default: 10)
});

// Example API response or JSON object
const response = {
  userId: 1,
  title: "Test",
  completed: false
};

// Generate Chai assertions
const assertions = generator.generate(response);

// Output the generated assertions
console.log(assertions);
```

**Output:**
```javascript
expect(response.userId, "userId should exist").to.exist;
expect(response.userId, "userId should be a number").to.be.a('number');
expect(response.title, "title should exist").to.exist;
expect(response.title, "title should be a string").to.be.a('string');
expect(response.completed, "completed should exist").to.exist;
expect(response.completed, "completed should be a boolean").to.be.a('boolean');
```

---

## **🛠 Configuration Options**

You can configure the generator to suit your needs by passing an options object to the constructor:

| **Option**    | **Type**   | **Default** | **Description**                                                                 |
|---------------|------------|-------------|---------------------------------------------------------------------------------|
| `maxDepth`    | `number`   | `10`        | Specifies the maximum depth to traverse nested objects and arrays.             |

---

## **💡 How It Works**

The library intelligently traverses your JSON structure and generates:
- **Existence checks**: Ensures every key in the object exists.
- **Type assertions**: Validates data types for all keys.
- **Structure validation**: Handles nested objects, arrays, and mixed types.

### Supported Assertions
- **Existence**: `to.exist`, `to.be.null`
- **Type**: `to.be.a('string')`, `to.be.an('array')`
- **Structure**: Validates non-emptiness and consistent array types.

---

## **🖋 Example Scenarios**

### **1. Nested Object**

```javascript
const response = {
  user: {
    id: 42,
    profile: {
      name: "John Doe",
      age: 30
    }
  }
};

console.log(generator.generate(response));
```

**Output:**
```javascript
expect(response.user, "user should exist").to.exist;
expect(response.user, "user should be an object").to.be.an('object');
expect(response.user.id, "id should exist").to.exist;
expect(response.user.id, "id should be a number").to.be.a('number');
expect(response.user.profile, "profile should exist").to.exist;
expect(response.user.profile, "profile should be an object").to.be.an('object');
expect(response.user.profile.name, "name should exist").to.exist;
expect(response.user.profile.name, "name should be a string").to.be.a('string');
expect(response.user.profile.age, "age should exist").to.exist;
expect(response.user.profile.age, "age should be a number").to.be.a('number');
```

### **2. Arrays with Mixed Types**

```javascript
const response = {
  items: [1, "string", { key: "value" }]
};

console.log(generator.generate(response));
```

**Output:**
```javascript
expect(response.items, "items should exist").to.exist;
expect(response.items, "items should be an array").to.be.an('array');
expect(response.items[0], "items[0] should be a number").to.be.a('number');
expect(response.items[1], "items[1] should be a string").to.be.a('string');
expect(response.items[2], "items[2] should be an object").to.be.an('object');
```

---

## **🎨 Advanced Customization**

- Modify the `maxDepth` option for large or complex JSON structures.
- Add support for custom validation logic by extending the `addAssertion` method.

---

## **📚 Documentation**

Refer to the [official documentation](https://github.com/yourusername/assert-apex#readme) for advanced usage and configuration examples.

---

## **🤝 Contributing**

We welcome contributions! Check out the [contribution guidelines](https://github.com/yourusername/assert-apex/blob/main/CONTRIBUTING.md) for more details.

---

## **📄 License**

This project is licensed under the MIT License. See the [LICENSE](https://github.com/yourusername/assert-apex/blob/main/LICENSE) file for details.

---

## **💬 Support**

For questions or issues, please open an [issue on GitHub](https://github.com/yourusername/assert-apex/issues).

--- 

With this README, your project should look much more professional and user-friendly. Don't forget to replace placeholder links like `yourusername` with your actual GitHub username or relevant URLs.