import { Handle, Position } from "reactflow";
import { Box } from "@mui/material";

const shapeComponents = {
  rounded: ({ width, height, color }) => (
    <rect
      x={10}
      y={10}
      width={width - 20}
      height={height - 20}
      rx={15}
      ry={15}
      fill={color}
      stroke="#333"
      strokeWidth={2}
    />
  ),
  diam: ({ width, height, color }) => {
    const points = [
      [width / 2, 10],
      [width - 10, height / 2],
      [width / 2, height - 10],
      [10, height / 2],
    ];
    return (
      <polygon
        points={points.map(p => p.join(",")).join(" ")}
        fill={color}
        stroke="#333"
        strokeWidth={2}
      />
    );
  },
  tri: ({ width, height, color }) => {
    const points = [
      [width / 2, 10],
      [width - 10, height - 10],
      [10, height - 10],
    ];
    return (
      <polygon
        points={points.map(p => p.join(",")).join(" ")}
        fill={color}
        stroke="#333"
        strokeWidth={2}
      />
    );
  },
  hex: ({ width, height, color }) => {
    const points = [
      [width / 4, 10],
      [(width * 3) / 4, 10],
      [width - 10, height / 2],
      [(width * 3) / 4, height - 10],
      [width / 4, height - 10],
      [10, height / 2],
    ];
    return (
      <polygon
        points={points.map(p => p.join(",")).join(" ")}
        fill={color}
        stroke="#333"
        strokeWidth={2}
      />
    );
  },
  cyl: ({ width, height, color }) => (
    <>
      <ellipse
        cx={width / 2}
        cy={15}
        rx={width / 2 - 10}
        ry={10}
        fill={color}
        stroke="#333"
        strokeWidth={2}
      />
      <rect
        x={10}
        y={15}
        width={width - 20}
        height={height - 30}
        fill={color}
        stroke="#333"
        strokeWidth={2}
      />
      <ellipse
        cx={width / 2}
        cy={height - 15}
        rx={width / 2 - 10}
        ry={10}
        fill={color}
        stroke="#333"
        strokeWidth={2}
      />
    </>
  ),
  // Add more shape definitions as needed
};

const CustomShapeNode = ({ data, selected }) => {
  const { label, shape } = data;
  const ShapeComponent = shapeComponents[shape] || shapeComponents.rounded;
  const theme = {
    primaryColor: "#71BBB2",
    primaryBorderColor: "#497D74",
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: 180,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle type="target" position={Position.Top} />
      
      <svg width={180} height={80}>
        <ShapeComponent 
          width={180} 
          height={80} 
          color={theme.primaryColor} 
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#333"
          fontSize="14px"
          fontWeight="500"
        >
          {label}
        </text>
      </svg>

      <Handle type="source" position={Position.Bottom} />
      
      {selected && (
        <Box
          sx={{
            position: "absolute",
            top: -5,
            left: -5,
            right: -5,
            bottom: -5,
            border: `2px dashed ${theme.primaryBorderColor}`,
            borderRadius: "8px",
            pointerEvents: "none",
          }}
        />
      )}
    </Box>
  );
};

export default CustomShapeNode;