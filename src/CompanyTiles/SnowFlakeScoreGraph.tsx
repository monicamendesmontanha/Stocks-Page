import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
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
    <ResponsiveContainer>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="label" tick={false} />
        <PolarRadiusAxis tick={false} />
        <Radar
          dataKey="value"
          stroke="yellow"
          fill="yellow"
          fillOpacity={0.5}
          isAnimationActive={false}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SnowFlakeScoreGraph;
