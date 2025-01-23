const { transpileEmojiToJS } = require("../index");
const fs = require('fs');
const path = require('path');

const emojiSource = `
📦 canvas 🖼️
📦 ctx = canvas 🎨 "2d"
canvas.width = 400
canvas.height = 400
canvas 🏗️

📝 x = 100
📝 y = 100
📝 dx = 5
📝 dy = 5
📦 size = 50

🍕 update 👉 {
  ctx 🔲 0, 0, canvas.width, canvas.height
  ctx 🌈 = "red"
  ctx ⬜ x, y, size, size

  🤔 x ➕ dx > canvas.width ➖ size 🚪 x ➕ dx < 0 {
    dx = dx ✖️ ➖1
  }
  
  🤔 y ➕ dy > canvas.height ➖ size 🚪 y ➕ dy < 0 {
    dy = dy ✖️ ➖1
  }

  x = x ➕ dx
  y = y ➕ dy
  🔄 update
}

update()
`;

const jsCode = transpileEmojiToJS(emojiSource);
console.log("Generated JavaScript Code:\n", jsCode);

// Create HTML file with the transpiled code
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Emoji Transpiler Test</title>
    <style>
        canvas {
            border: 1px solid black;
            display: block;
            margin: 20px auto;
        }
        body {
            text-align: center;
            font-family: Arial, sans-serif;
            background: #f0f0f0;
        }
    </style>
</head>
<body>
    <h1>Emoji Transpiler Test</h1>
    <p>You should see a bouncing red square below:</p>
    <script>
        ${jsCode}
    </script>
</body>
</html>
`;

// Write the HTML file
const outputPath = path.join(__dirname, 'test.html');
fs.writeFileSync(outputPath, htmlContent);

console.log("\nTranspilation successful! ✨");
console.log(`HTML file created at: ${outputPath}`);
console.log("Open the HTML file in your browser to see the animation!");