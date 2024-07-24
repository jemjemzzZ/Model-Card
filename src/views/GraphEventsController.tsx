import { useRegisterEvents, useSigma } from "@react-sigma/core";
import { FC, PropsWithChildren, useEffect } from "react";
import { NodeData } from "../types";

function getMouseLayer() {
  return document.querySelector(".sigma-mouse");
}

const GraphEventsController: FC<PropsWithChildren<{ setHoveredNode: (node: string | null) => void,
  setSelectedNode: (node: NodeData | null) => void }>> = ({
  setHoveredNode,
  setSelectedNode,
  children,
}) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();
  const registerEvents = useRegisterEvents();

  /**
   * Initialize here settings that require to know the graph and/or the sigma
   * instance:
   */
  useEffect(() => {
    registerEvents({
      clickNode({ node }) {
        if (!graph.getNodeAttribute(node, "hidden")) {
          // window.open(graph.getNodeAttribute(node, "URL"), "_blank");
          const nodeData = graph.getNodeAttributes(node) as NodeData;
          console.log("Clicked node:", nodeData); // Log node data
          setSelectedNode(nodeData);
        }
      },
      enterNode({ node }) {
        setHoveredNode(node);
        // TODO: Find a better way to get the DOM mouse layer:
        const mouseLayer = getMouseLayer();
        if (mouseLayer) mouseLayer.classList.add("mouse-pointer");
      },
      leaveNode() {
        setHoveredNode(null);
        // TODO: Find a better way to get the DOM mouse layer:
        const mouseLayer = getMouseLayer();
        if (mouseLayer) mouseLayer.classList.remove("mouse-pointer");
      },
    });
  }, []);

  return <>{children}</>;
};

export default GraphEventsController;
