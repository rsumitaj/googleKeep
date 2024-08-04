// components/ColorPicker.tsx
import React, { useRef, useState, useEffect } from "react";
import "../../styles/ColorPicker.css";

const ColorPicker = ({ onChange }: { onChange: (color: string) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#ffffff");
  const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const radius = canvas.width / 2;
        const image = ctx.createImageData(canvas.width, canvas.height);
        for (let x = 0; x < image.width; x++) {
          for (let y = 0; y < image.height; y++) {
            const dx = x - radius;
            const dy = y - radius;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= radius) {
              const angle = Math.atan2(dy, dx) + Math.PI;
              const hue = (angle * 180) / Math.PI;
              const saturation = distance / radius;
              const [r, g, b] = hslToRgb(hue, saturation, 0.5);
              const index = (y * image.width + x) * 4;
              image.data[index] = r;
              image.data[index + 1] = g;
              image.data[index + 2] = b;
              image.data[index + 3] = 255;
            }
          }
        }
        ctx.putImageData(image, 0, 0);
      }
    }
  }, []);

  const hslToRgb = (h: number, s: number, l: number) => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setCursorPos({ x, y });
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const pickedColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        setColor(pickedColor);
        onChange(pickedColor);
      }
    }
  };

  return (
    <div className="color-picker">
      <div className="color-wheel-container">
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          onClick={handleCanvasClick}
          className="color-wheel"
        />
        <div
          className="color-indicator"
          style={{
            left: cursorPos.x - 5 + "px",
            top: cursorPos.y - 5 + "px",
            backgroundColor: color,
          }}
        ></div>
      </div>
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="color-text"
      />
    </div>
  );
};

export default ColorPicker;
