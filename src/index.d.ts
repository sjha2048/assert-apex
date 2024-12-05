interface GeneratorOptions {
    maxDepth?: number;
  }
  
  declare class AssertApex {
    constructor(options?: GeneratorOptions);
    generate(responseInfo: Record<string, any>): string;
  }
  
  export = AssertApex;