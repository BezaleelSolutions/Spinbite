# 🎡 JavaScript Spinning Wheel

A fun and colorful spinning wheel built with **HTML5 Canvas** and **Vanilla JavaScript**. Great for games, giveaways, random decisions, or prize wheels. Easily customizable values and fully client-side!

---


---

## ✨ Features

- ✅ Smooth animated spin using `requestAnimationFrame`
- ✅ Labels remain upright during rotation (no upside-down text)
- ✅ Arrow pointer to highlight the selected option
- ✅ Static center "SPIN" button — does not rotate with the wheel
- ✅ Fully customizable: values, colors, duration, and callback
- ✅ No dependencies — pure HTML, CSS, and JavaScript

---

## 📁 Folder Structure

```
/spanwheel/
├── index.html        # Demo HTML to test the spinner
├── spanwheel.js      # Main JS class (SpanWheel)
├── screenshot.png    # Optional preview image for README
└── README.md         # Project documentation
```

---

## 🚀 Getting Started

### 1. Include HTML

```html
<canvas id="wheel" width="400" height="400"></canvas>
<button onclick="wheel.spin()">Spin!</button>
```

### 2. Include the Script

```html
<script src="spanwheel.js"></script>
<script>
  const wheel = new SpanWheel("wheel", {
    values: ["Pizza", "Burger", "Tacos", "Sushi", "Pasta", "Fries"],
    onSpinEnd: function (result) {
      alert("You got: " + result);
    }
  });
</script>
```

---

## ⚙️ Configuration Options

| Option      | Type     | Description                                  |
|-------------|----------|----------------------------------------------|
| `values`    | `array`  | Array of items to show on the wheel          |
| `onSpinEnd` | `func`   | Callback function with selected result       |

Example:

```js
values: ["Win", "Try Again", "Free Drink", "Discount"],
onSpinEnd: function(result) {
  console.log("You landed on:", result);
}
```

---

## 🎨 Customization

### 🎯 Colors
To customize slice colors, update the `colors` array inside `spanwheel.js`:

```js
this.colors = ['#f44336', '#2196f3', '#4caf50', '#ff9800'];
```

### 🕓 Spin Duration
To adjust spin speed, modify `spinDuration` in the `spin()` method:

```js
const spinDuration = 5000; // in milliseconds
```

---

## 🧪 Browser Support

✅ Chrome  
✅ Firefox  
✅ Edge  
✅ Safari  
✅ Mobile Browsers (responsive canvas)

---

## 📄 License

**MIT License**  
Free to use, share, and modify. No attribution required (but appreciated!).

---

## 🙌 Author

Made with ❤️ by Bezaleel Solutions Team  
Feel free to fork and customize it for your own creative ideas!
