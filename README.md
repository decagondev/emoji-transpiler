# Emoji Transpiler 🔄 JavaScript

A fun and experimental transpiler that converts emoji-based source code into executable JavaScript. Write your code using emojis and run it as regular JavaScript!

## Installation

    npm install emoji-transpiler

## Usage

    const { transpileEmojiToJS } = require('emoji-transpiler');

    // Write your emoji code
    const emojiSource = `
    📦 message 😊
    ❤️ message
    `;

    // Transpile to JavaScript
    const jsCode = transpileEmojiToJS(emojiSource);
    console.log(jsCode);
    // Output: const message "Hello, World!" console.log message

## Emoji Syntax

Here's the mapping of emojis to JavaScript constructs:

### Variables and Constants
- 📦 → `const`
- 📝 → `let`

### Functions
- 🍕 → `function`
- 👉 → `=>`

### Control Flow
- 🤔 → `if`
- 🧢 → `else`
- 🔁 → `while`

### Canvas Operations
- 🖼️ → `document.createElement('canvas')`
- 🎨 → `getContext('2d')`
- 🏗️ → `document.body.appendChild`
- ⬜ → `fillRect`
- 🔲 → `clearRect`
- 🌈 → `fillStyle`

### DOM Operations
- 🔍 → `document.querySelector`
- 📡 → `addEventListener`

### Animation
- 🔄 → `requestAnimationFrame`

### Arithmetic
- ➕ → `+`
- ➖ → `-`
- ✖️ → `*`
- ➗ → `/`

### Logic
- 🙌 → `===`
- 👎 → `!==`
- 💡 → `&&`
- 🚪 → `||`

### Input/Output
- ❤️ → `console.log`
- 📩 → `prompt`

## Example

Here's a simple bouncing square animation written in emoji code:

    📦 canvas 🖼️
    📦 ctx = canvas 🎨 "2d"
    canvas 🏗️

    📦 x = 100
    📦 y = 100
    📦 dx = 2
    📦 dy = 2

    🍕 update 👉 {
      ctx 🔲 0, 0, canvas.width, canvas.height
      ctx 🌈 = "red"
      ctx ⬜ x, y, 50, 50

      x = x ➕ dx
      y = y ➕ dy
      🔄 update
    }

    update()

## More Examples

### Hello World

    📦 greeting 😊
    ❤️ greeting

### Simple Counter

    📦 count 🔢
    
    🍕 increment 👉 {
      count count ➕ 1
      ❤️ count
    }
    
    📡 "click" increment

### Drawing on Canvas

    📦 canvas 🖼️
    📦 ctx = canvas 🎨 "2d"
    canvas 🏗️
    
    ctx 🌈 = "blue"
    ctx ⬜ 10, 10, 100, 100

## Development

### Running Tests

    npm test

### Building from Source

    git clone https://github.com/yourusername/emoji-transpiler.git
    cd emoji-transpiler
    npm install

## Common Patterns

### Event Handling

    📦 button 🔍 "#myButton"
    button 📡 "click" 👉 {
      ❤️ "Button clicked!"
    }

### Animation Loop

    📦 x 🔢
    
    🍕 animate 👉 {
      x = x ➕ 1
      ❤️ x
      🔄 animate
    }
    
    animate()

## Testing

The test script (`npm test`) demonstrates the transpilation process but doesn't execute the generated code, as many examples require a browser environment for DOM manipulation and Canvas API access.

To test the generated code:
1. Run `npm test` to see the transpiled JavaScript
2. Copy the output into a browser console or HTML file
3. Run it in a browser environment

For example:

    <!DOCTYPE html>
    <html>
    <head>
        <title>Emoji Transpiler Test</title>
    </head>
    <body>
        <script>
            // Paste transpiled code here
        </script>
    </body>
    </html>

## License

MIT © Tom Tarpey

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/emoji-transpiler/issues).

## Notes

This is an experimental project meant for fun and learning. It's not recommended for production use.

## Features

- 🎯 Simple and intuitive emoji-based syntax
- 🔄 Direct transpilation to JavaScript
- 🎨 Built-in support for Canvas operations
- 🎮 Animation and game development friendly
- 🧪 Perfect for educational purposes
- 🚀 Zero dependencies

## More Examples

### Hello World
    📦 greeting 😊
    ❤️ greeting

### Simple Counter
    📦 count 🔢
    
    🍕 increment 👉 {
      count count ➕ 1
      ❤️ count
    }
    
    📡 "click" increment

### Drawing on Canvas
    📦 canvas 🖼️
    📦 ctx canvas 🎨 "2d"
    canvas 🏗️
    
    ctx 🌈 "blue"
    ctx ⬜ 10 10 100 100

## Development

### Running Tests
    npm test

### Building from Source
    git clone https://github.com/yourusername/emoji-transpiler.git
    cd emoji-transpiler
    npm install

## Debugging

If your emoji code isn't working as expected:

1. Check the transpiled JavaScript output using `console.log(jsCode)`
2. Verify that all emojis are properly spaced
3. Ensure you're using supported emoji tokens
4. Check browser console for any JavaScript errors

## Common Patterns

### Event Handling
    📦 button 🔍 "#myButton"
    button 📡 "click" 👉 {
      ❤️ "Button clicked!"
    }

### Animation Loop
    📦 x 🔢
    
    🍕 animate 👉 {
      x x ➕ 1
      ❤️ x
      🔄 animate
    }
    
    animate()

## Browser Support

This package works in all modern browsers that support:
- Canvas API
- requestAnimationFrame
- ES6 features

## Roadmap

- [ ] Add TypeScript support
- [ ] Implement more JavaScript features
- [ ] Add syntax highlighting for popular editors
- [ ] Create playground website
- [ ] Add unit tests
- [ ] Support for async/await operations

## Similar Projects

- [Emoji Code](https://github.com/example/emoji-code)
- [EmojiScript](https://github.com/example/emojiscript)

## FAQ

### Why use emojis for coding?
While not practical for production, emoji coding can be:
- A fun way to learn programming concepts
- An engaging teaching tool
- A creative coding experiment

### Can I use this in production?
This project is meant for educational and experimental purposes. We don't recommend using it in production environments.

### How do I contribute?
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

The test script (`npm test`) demonstrates the transpilation process but doesn't execute the generated code, as many examples require a browser environment for DOM manipulation and Canvas API access.

To test the generated code:
1. Run `npm test` to see the transpiled JavaScript
2. Copy the output into a browser console or HTML file
3. Run it in a browser environment

For example:

    <!DOCTYPE html>
    <html>
    <head>
        <title>Emoji Transpiler Test</title>
    </head>
    <body>
        <script>
            // Paste transpiled code here
        </script>
    </body>
    </html>
