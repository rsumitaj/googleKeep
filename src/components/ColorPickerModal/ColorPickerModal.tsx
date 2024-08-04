// components/ColorPickerModal.tsx
import React, { useState } from 'react';
import ColorPicker from '../ColorPicker/Colorpicker';
import '../../styles/ColorPickerModal.css';

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (color: string) => void;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({ isOpen, onClose, onApply }) => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleApply = () => {
    onApply(selectedColor);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Choose a Color</h2>
        <ColorPicker onChange={handleColorChange} />
        <div className="modal-buttons">
          <button onClick={handleApply}>Apply</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerModal;
