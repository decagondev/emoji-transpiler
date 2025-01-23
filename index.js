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
            if (tokens[2] === "👉") {
                return `function ${tokens[1]}() {`;
            }
            return `function ${tokens[1]}() {`;
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

        // Handle variable updates with operators
        if (tokens.includes("=")) {
            const varName = tokens[0];
            const rightSide = tokens.slice(2)
                .map(token => {
                    const replacement = emojiToJS[token];
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

        // Replace emoji tokens first
        const processedTokens = tokens.map(token => emojiToJS[token] || token);
        return processedTokens.join(" ");
    });

    // Join lines and clean up
    return processedLines
        .join(";\n")
        .replace(/;+/g, ";")
        .replace(/;(\s*})/g, "$1")
        .replace(/;(\s*)$/g, "")
        .replace(/\{\s*;/g, "{"); // Remove semicolon after opening brace
  }
  
  module.exports = { transpileEmojiToJS };
  