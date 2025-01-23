const emojiToJS = {
    // Variables and constants
    "📦": "const",
    "📝": "let",
  
    // Functions
    "🍕": "function",
    "👉": "=>",
    "🔥": "return",
  
    // Control flow
    "🤔": "if",
    "🧢": "else",
    "🔁": "while",
  
    // Console output
    "❤️": "console.log",
  
    // DOM Manipulation
    "🖼️": "document.createElement('canvas')",
    "🎨": "getContext",
    "🏗️": "document.body.appendChild",
    "🔍": "document.querySelector",
    "📡": "addEventListener",
  
    // Canvas Drawing
    "⬜": "fillRect",
    "🔲": "clearRect",
    "✏️": ["beginPath", "moveTo", "lineTo", "stroke"],
    "🌈": "fillStyle",
  
    // Animation
    "🔄": "requestAnimationFrame",
  
    // Arithmetic
    "➕": "+",
    "➖": "-",
    "✖️": "*",
    "➗": "/",
    "➖1": "-1",
  
    // Logical and comparison
    "🙌": "===",
    "👎": "!==",
    "💡": "&&",
    "🚪": "||",
  
    // Input/Output
    "📩": "prompt",
  
    // Values
    "😊": "\"Hello, World!\"",
    "🔢": "0",
  };
  
  function transpileEmojiToJS(emojiCode) {
    // Split into lines for better processing
    const lines = emojiCode.split('\n').filter(line => line.trim());
    
    // Process each line
    const processedLines = lines.map(line => {
        const tokens = line.trim().split(/\s+/);
        
        // Handle special cases
        if (tokens[0] === "📦" || tokens[0] === "📝") {
            // Variable declaration
            if (tokens.length === 3 && tokens[2] === "🖼️") {
                return `${emojiToJS[tokens[0]]} ${tokens[1]} = document.createElement('canvas')`;
            }
            // Handle canvas context with equals sign
            if (tokens[2] === "=" && tokens[4] === "🎨") {
                return `${emojiToJS[tokens[0]]} ${tokens[1]} = ${tokens[3]}.getContext(${tokens[5] || '"2d"'})`;
            }
            // Normal variable declaration with assignment
            if (tokens.includes("=")) {
                const varName = tokens[1];
                const value = tokens.slice(3).join(" ");
                return `${emojiToJS[tokens[0]]} ${varName} = ${value}`;
            }
        }

        // Handle canvas append
        if (tokens.length === 2 && tokens[1] === "🏗️") {
            return `document.body.appendChild(${tokens[0]})`;
        }

        // Handle function declarations
        if (tokens[0] === "🍕") {
            const funcName = tokens[1];
            // Look for parameters between parentheses, handling both spaced and non-spaced cases
            const fullLine = tokens.join(" ");
            const paramMatch = fullLine.match(/\((.*?)\)/);
            if (paramMatch) {
                const params = paramMatch[1].trim();
                return `function ${funcName}(${params}) {`;
            }
            return `function ${funcName}() {`;
        }

        // Handle if statements
        if (tokens[0] === "🤔") {
            const braceIndex = tokens.indexOf("{");
            if (braceIndex === -1) return line;
            
            const conditionTokens = tokens.slice(1, braceIndex);
            const processedCondition = conditionTokens
                .map(token => {
                    const replacement = emojiToJS[token];
                    if (replacement) {
                        return replacement;
                    }
                    return token;
                })
                .join(" ");
            
            return `if (${processedCondition}) {`;
        }

        // Handle canvas operations
        if (tokens[1] === "🔲" || tokens[1] === "⬜") {
            const method = emojiToJS[tokens[1]];
            const args = tokens.slice(2).join(", ").replace(/,+/g, ',');
            return `${tokens[0]}.${method}(${args})`;
        }

        if (tokens[1] === "🌈") {
            if (tokens[2] === "=") {
                return `${tokens[0]}.fillStyle = ${tokens[3]}`;
            }
            return `${tokens[0]}.fillStyle = ${tokens[2]}`;
        }

        // Handle animation frame
        if (tokens[0] === "🔄") {
            return `requestAnimationFrame(${tokens[1]})`;
        }

        // Handle while statements
        if (tokens[0] === "🔁") {
            const braceIndex = tokens.indexOf("{");
            let condition;
            
            if (braceIndex !== -1) {
                condition = tokens.slice(1, braceIndex)
                    .map(token => emojiToJS[token] || token)
                    .join(" ");
            } else {
                condition = tokens.slice(1)
                    .map(token => {
                        // Handle special cases for comparison operators and variables
                        const replacement = emojiToJS[token];
                        return replacement || token;
                    })
                    .filter(token => token !== "{") // Remove any stray braces
                    .join(" ");
            }
            
            return `while (${condition}) {`;
        }

        // Handle variable updates with operators
        if (tokens.includes("=")) {
            const varName = tokens[0];
            const rightSide = tokens.slice(2)
                .map(token => {
                    const replacement = emojiToJS[token];
                    // Handle special cases for operators
                    if (replacement) {
                        return replacement;
                    }
                    return token;
                })
                .join(" ");
            return `${varName} = ${rightSide}`;
        }

        // Handle closing braces
        if (tokens[0] === "}") {
            return "}";
        }

        // Handle console.log
        if (tokens[0] === "❤️") {
            const args = tokens.slice(1).join(", ");
            return `console.log(${args})`;
        }

        // Handle variable declarations
        if (tokens[0] === "📦") {  // const
            const varName = tokens[1];
            const valueTokens = tokens.slice(2).map(token => emojiToJS[token] || token);
            const value = valueTokens.join(" ");
            return `const ${varName} = ${value}`;
        }

        // Replace emoji tokens first
        const processedTokens = tokens.map(token => emojiToJS[token] || token);
        return processedTokens.join(" ");
    });

    // Join lines and clean up
    const minifiedCode = processedLines
        .join("\n")
        .replace(/\s+/g, " ")  // Normalize whitespace to single spaces
        .trim();

    // Prettify the code
    return prettifyJS(minifiedCode);
  }
  
  // Helper function to prettify JavaScript code
  function prettifyJS(code) {
    let indent = 0;
    let result = '';
    let inString = false;
    let lastChar = '';

    // Helper to add newline and indent
    const addNewline = () => {
        result += '\n' + '    '.repeat(indent);
    };

    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        
        // Handle strings
        if ((char === '"' || char === "'") && lastChar !== '\\') {
            inString = !inString;
        }
        
        if (!inString) {
            // Handle braces and parentheses
            if (char === '{') {
                result += ' {';
                indent++;
                addNewline();
                continue;
            }
            if (char === '}') {
                indent--;
                addNewline();
                result += '}';
                if (i < code.length - 1 && code[i + 1] !== ';' && code[i + 1] !== ')') {
                    addNewline();
                }
                continue;
            }
            
            // Add spaces around operators
            if ('+-*/%=&|<>!'.includes(char)) {
                if (lastChar !== ' ' && !'+-*/%=&|<>!'.includes(lastChar)) {
                    result += ' ';
                }
                result += char;
                if (i < code.length - 1 && !'+-*/%=&|<>!'.includes(code[i + 1])) {
                    result += ' ';
                }
                continue;
            }

            // Add newline after semicolons
            if (char === ';') {
                result += char;
                addNewline();
                continue;
            }

            // Add space after keywords
            if (i > 0 && /[a-z]/i.test(lastChar) && char === '(') {
                result += ' ';
            }
        }

        // Add character to result
        result += char;
        lastChar = char;
    }

    return result;
  }
  
  module.exports = { transpileEmojiToJS };
  