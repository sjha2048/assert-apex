class AssertApex {
    constructor(options = {}) {
      this.assertions = [];
      this.options = {
        maxDepth: options.maxDepth || 10,
        ...options
      };
    }
  
    addAssertion(path, check, message) {
      this.assertions.push(`expect(${path}, "${message}").${check};`);
    }
  
    getJsType(value) {
      if (value === null) return 'null';
      if (Array.isArray(value)) return 'array';
      return typeof value;
    }
  
    checkObject(obj, path = "response", parentKey = "", depth = 0) {
      if (depth > this.options.maxDepth) return;
  
      // Skip redundant assertions for the top-level response object
      if (depth > 1) {
        this.addAssertion(
          path, 
          "to.be.an('object')", 
          `${parentKey} should be an object`.trim()
        );
  
        if (Object.keys(obj).length) {
          this.addAssertion(
            path, 
            "to.not.be.empty", 
            `${parentKey} should not be empty`.trim()
          );
        } else {
          this.addAssertion(
            path, 
            "to.be.empty", 
            `${parentKey} should be empty`.trim()
          );
        }
      }
  
      for (const [key, value] of Object.entries(obj)) {
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? `.${key}` : `['${key}']`;
        const newPath = `${path}${safeKey}`;
  
        if (value === null) {
          this.addAssertion(newPath, "to.be.null", `${key} should be null`);
        } else {
          this.addAssertion(newPath, "to.exist", `${key} should exist`);
  
          if (typeof value === 'object' && !Array.isArray(value)) {
            this.checkObject(value, newPath, key, depth + 1);
          } else if (Array.isArray(value)) {
            this.addAssertion(
              newPath, 
              "to.be.an('array')", 
              `${key} should be an array`
            );
  
            if (value.length) {
              this.addAssertion(
                newPath, 
                "to.not.be.empty", 
                `${key} should not be empty`
              );
  
              const firstType = this.getJsType(value[0]);
              const allSameType = value.every(item => this.getJsType(item) === firstType);
  
              if (allSameType) {
                if (typeof value[0] === 'object' && !Array.isArray(value[0])) {
                  this.checkObject(value[0], `${newPath}[0]`, `${key}[0]`, depth + 1);
                }
              } else {
                value.forEach((item, i) => {
                  const itemType = this.getJsType(item);
                  this.addAssertion(
                    `${newPath}[${i}]`,
                    `to.be.a('${itemType}')`,
                    `${key}[${i}] should be a ${itemType}`
                  );
                });
              }
            } else {
              this.addAssertion(newPath, "to.be.empty", `${key} should be empty`);
            }
          } else {
            const jsType = this.getJsType(value);
            this.addAssertion(
              newPath,
              `to.be.a('${jsType}')`,
              `${key} should be a ${jsType}`
            );
          }
        }
      }
    }
  
    generate(responseInfo) {
      this.assertions = [];
      this.checkObject(responseInfo);
      return this.assertions.join('\n');
    }
  }
  
  module.exports = AssertApex;