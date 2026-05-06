import { useState } from "react";
import Button from "../ui/Button";

function Modal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("blue");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Create New Board</h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Board name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <Button onClick={() => onCreate({ name, color })}>Create</Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
