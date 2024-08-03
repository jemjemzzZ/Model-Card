import { FC, useEffect, useState } from "react";
import { NodeData } from "../types";
import { BsInfoCircle } from "react-icons/bs";
import Panel from "./Panel";


interface NodeDetailsPanelProps {
  node: NodeData | null;
  onClose: () => void;
  onToggleSelect: (node: NodeData) => void;
  isSelected: boolean;
}

const allowedKeys = ["tag", "cluster", "related principle", "amount", "x", "y"];

const recommendLevels = {
  'Core': 2,
  'Suggested': 1,
  'Normal': 0,
  'Not Suggested': -1,
  'Ignored': -100
};

const NodeDetailsPanel: FC<NodeDetailsPanelProps> = ({ node,  onToggleSelect, isSelected }) => {
  if (!node) return null;

  const [localNode, setLocalNode] = useState<NodeData>(node);
  useEffect(() => {
    setLocalNode(node);
  }, [node]);

  let baseScore = 0;
  switch (node.tag) {
    case "Model Detail":
      baseScore = 4;
      break;
    case "Model Use":
      baseScore = 4
      break;
    case "Data":
      baseScore = 3
      break;
    case "Training":
      baseScore = 2
      break;
    case "Performance and Limitations":
      baseScore = 2
      break;
    case "Community Engagement and Further Insights":
      baseScore = 4
      break;
    default:
      break;
  }

  const handleRecommendStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    node["recommend status"] = newStatus;
    node.score = Math.max(baseScore + recommendLevels[newStatus], 0);

    setLocalNode({
      ...localNode,
      score: node.score,
      ["recommend status"]: newStatus
    })
  };

  return (
    <Panel
      initiallyDeployed
      title={
        <>
          <BsInfoCircle className="text-muted" /> Parameter Info 
        </>
      }
    >
      <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
      >
      <h2
        style={{
          wordWrap: "break-word", // Word wrapping
          fontSize: "1.2em", // Adjust as needed
        }}
      >
        {node.label}
      </h2>
      <ul>
        {Object.entries(node)
          .filter(([key]) => allowedKeys.includes(key))
          .map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
      </ul>
      {node.cluster !== "Module" && (
        <div>
          <div>
            <strong>score:</strong> {localNode.score}
          </div>
          <div>
            <strong>recommend status:</strong>
            <select value={localNode['recommend status']} onChange={handleRecommendStatusChange}>
              {Object.keys(recommendLevels).map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <br></br>
          <button onClick={() => onToggleSelect(node)}>
            {isSelected ? "Deselect" : "Select"} Node
          </button>
        </div>
      )}
    </div>
    </Panel>
  );
};

export default NodeDetailsPanel;