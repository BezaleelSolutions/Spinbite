class SpanWheel {
    constructor(canvasId, options) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.values = options.values || [];
    this.onSpinEnd = options.onSpinEnd || function () {};
    this.angle = 0;
    this.isSpinning = false;
    this.colors = [
        '#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0',
        '#3f51b5', '#e91e63', '#00bcd4', '#cddc39', '#009688'
    ];
    this.draw();
}

    draw() {
    this.drawWheelWithoutText();
    this.drawArrow();
    this.drawCenterText(); // draw static SPIN text
}

    drawWheelWithoutText() {
    const { ctx, canvas, values } = this;
    const radius = canvas.width / 2;
    const arc = (2 * Math.PI) / values.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    values.forEach((value, i) => {
        const angle = i * arc;
    ctx.fillStyle = this.colors[i % this.colors.length];
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, angle, angle + arc, false);
    ctx.lineTo(radius, radius);
    ctx.fill();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px Arial";
    ctx.fillText(value, radius - 10, 10);
    ctx.restore();
});

    // Draw center circle (white background)
    ctx.beginPath();
    ctx.arc(radius, radius, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
}

drawArrow() {
    const { ctx, canvas } = this;
    const radius = canvas.width / 2;

    ctx.save();
    ctx.translate(radius, radius);

    // Tail of the arrow (line)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, radius - 40);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    // Head of the arrow (triangle)
    ctx.beginPath();
    ctx.moveTo(0, radius - 10);           // tip of arrow (bottom)
    ctx.lineTo(-12, radius - 40);
    ctx.lineTo(12, radius - 40);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.restore();
}

drawCenterText() {
    const { ctx, canvas } = this;
    const radius = canvas.width / 2;

    ctx.fillStyle = "#000";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SPIN", radius, radius);
}

drawRotated(angle) {
    const { ctx, canvas } = this;
    const radius = canvas.width / 2;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(radius, radius);
    ctx.rotate(angle);
    ctx.translate(-radius, -radius);
    this.drawWheelWithoutText(); // draw rotating wheel (no text yet)
    ctx.restore();

    this.drawArrow();           // keep arrow on top
    this.drawCenterText();      // static SPIN text after rotation
}

spin() {
    if (this.isSpinning) return;

    this.isSpinning = true;

    const spinDuration = 5000; // 5 seconds
    const extraSpins = 5;
    const arc = (2 * Math.PI) / this.values.length;
    const randomIndex = Math.floor(Math.random() * this.values.length);
    const stopAngle = (2 * Math.PI * extraSpins) + (randomIndex * arc) + arc / 2;

    const start = performance.now();

    const animate = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / spinDuration, 1);
        const easing = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const currentAngle = this.angle + (stopAngle - this.angle) * easing;

        this.drawRotated(currentAngle);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            this.angle = currentAngle % (2 * Math.PI);
            const selectedIndex = this.getSelectedIndex(this.angle);
            const selectedValue = this.values[selectedIndex];
            this.onSpinEnd(selectedValue);
            this.isSpinning = false;
        }
    };

    requestAnimationFrame(animate);
}

getSelectedIndex(angle) {
    const arc = (2 * Math.PI) / this.values.length;

    // Adjust angle so 12 o'clock is treated as 0
    const adjustedAngle = (2 * Math.PI - angle + Math.PI / 2) % (2 * Math.PI);

    return Math.floor(adjustedAngle / arc);
}
}
