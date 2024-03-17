import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

export type SnowFakeScore = {
  value: number;
  income: number;
  health: number;
  past: number;
  future: number;
};

type Props = {
  snowFlakeScore: SnowFakeScore;
};

const SnowFlakeScoreGraph: React.FC<Props> = ({ snowFlakeScore }) => {
  const data = [
    { label: "VALUE", value: snowFlakeScore.value },
    { label: "FUTURE", value: snowFlakeScore.future },
    { label: "PAST", value: snowFlakeScore.past },
    { label: "HEALTH", value: snowFlakeScore.health },
    { label: "DIVIDEND", value: snowFlakeScore.income },
  ];

  return (
    <RadarChart outerRadius={90} width={730} height={250} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="label" />
      <PolarRadiusAxis tick={false} />
      <Radar dataKey="value" stroke="yellow" fill="yellow" fillOpacity={0.5} />
    </RadarChart>
  );
};

export default SnowFlakeScoreGraph;
