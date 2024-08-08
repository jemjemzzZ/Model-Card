import { useSigma } from "@react-sigma/core";
import { FC, useEffect, useState } from "react";
import { NodeData } from "../types";
import { BsFillUsbFill } from "react-icons/bs";
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

  const sigma = useSigma();
  const graph = sigma.getGraph();

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

  const handleToggleSelect = () => {
    onToggleSelect(node);

    if (node["color"] === "#00FF00") {
      switch (node.cluster) {
        case "Module":
          graph.setNodeAttribute(node.key, "color", "#003049");
          break;
        case "Level 1":
          graph.setNodeAttribute(node.key, "color", "#6b2c39");
          break;
        case "Level 2":
          graph.setNodeAttribute(node.key, "color", "#d62828");
          break;
        case "Level 3":
          graph.setNodeAttribute(node.key, "color", "#f77f00");
          break;
        case "Leve 4":
          graph.setNodeAttribute(node.key, "color", "#fcbf49");
          break;
        case "Level 5":
          graph.setNodeAttribute(node.key, "color", "#eae2b7");
          break;
        default:
          break;
      }
    } else {
      graph.setNodeAttribute(node.key, "color", "#00FF00");
    }

  };

  return (
    <Panel
      initiallyDeployed
      title={
        <>
          <BsFillUsbFill className="text-muted" /> Parameter Info 
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
          <button onClick={handleToggleSelect}>
            {isSelected ? "Deselect" : "Select"} Node
          </button>
        </div>
      )}
    </div>
    </Panel>
  );
};

export default NodeDetailsPanel;