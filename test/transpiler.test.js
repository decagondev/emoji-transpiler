const { transpileEmojiToJS } = require('../index');

describe('Emoji Transpiler', () => {
    test('should correctly transpile and execute Fibonacci function', () => {
        const emojiCode = `
🍕 fib (n) 👉 {
    📦 a 🔢
    📦 b 1
    📦 temp 🔢

    🔁 n 👎 🔢 {
        📦 temp b
        b = a ➕ b
        a = temp
        n = n ➖ 1
    }
    🔥 b
}

❤️ fib(5)
`;

        const jsCode = transpileEmojiToJS(emojiCode);
        
        // Expected fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
        const expectedOutput = `function fib(n) {
    const a = 0;
    const b = 1;
    const temp = 0;

    while(n !== 0) {
        const temp = b;
        b = a + b;
        a = temp;
        n = n - 1;
    }
    return b;
}

console.log(fib(5))`;

        // Test the transpiled code structure
        expect(jsCode.replace(/\s+/g, '')).toBe(expectedOutput.replace(/\s+/g, ''));

        // Test actual execution
        const executionContext = {};
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        
        eval(jsCode);

        expect(consoleSpy).toHaveBeenCalledWith(5); // 5th Fibonacci number
        consoleSpy.mockRestore();
    });
}); 