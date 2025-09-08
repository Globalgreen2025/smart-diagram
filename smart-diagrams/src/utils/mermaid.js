import mermaid from "mermaid";
import {ChartContext} from "@/app/layout";
import {useContext} from "react";

// Render function
export const render = async (config, code, id,data) => {
  mermaid.initialize(data);
  return await mermaid.render(id, code);
};

// Parse function
export const parse = async (code) => {
  return await mermaid.parse(code);
};
