import { FC } from "react";
import { NodeData } from "../types";

interface NodeDetailsPanelProps {
  node: NodeData | null;
  onClose: () => void;
  onToggleSelect: (node: NodeData) => void;
  isSelected: boolean;
}

const NodeDetailsPanel: FC<NodeDetailsPanelProps> = ({ node,  onToggleSelect, isSelected }) => {
  if (!node) return null;

  return (
    <div className="node-details-panel">
      <h2>{node.label}</h2>
      <ul>
        {Object.entries(node).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <button onClick={() => onToggleSelect(node)}>
        {isSelected ? "Deselect" : "Select"} Node
      </button>
    </div>
  );
};

export default NodeDetailsPanel;