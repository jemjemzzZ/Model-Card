import { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";
import Panel from "./Panel";

interface DescriptionPanelProps {
  summaryScores: Record<string, number>;
}

const DescriptionPanel: FC<DescriptionPanelProps> = ({ summaryScores }) => {
  return (
    <Panel
      initiallyDeployed
      title={
        <>
          <BsInfoCircle className="text-muted" /> Summary Scores
        </>
      }
    >
      {Object.entries(summaryScores).map(([tag, score]) => (
        <p key={tag}>
          {tag}: {score}
        </p>
      ))}
    </Panel>
  );
};

export default DescriptionPanel;