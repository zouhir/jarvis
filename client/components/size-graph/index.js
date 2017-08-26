import { h, Component } from "preact";
import { Line } from "nivo";

const data = [
  {
    "id": "whisky",
    "color": "hsl(35, 70%, 50%)",
    "data": [
      {
        "color": "hsl(121, 70%, 50%)",
        "x": "WF",
        "y": 36
      },
      {
        "color": "hsl(328, 70%, 50%)",
        "x": "AW",
        "y": 34
      },
      {
        "color": "hsl(82, 70%, 50%)",
        "x": "AX",
        "y": 36
      },
      {
        "color": "hsl(107, 70%, 50%)",
        "x": "BQ",
        "y": 9
      },
      {
        "color": "hsl(147, 70%, 50%)",
        "x": "MZ",
        "y": 49
      },
      {
        "color": "hsl(192, 70%, 50%)",
        "x": "GM",
        "y": 9
      },
      {
        "color": "hsl(340, 70%, 50%)",
        "x": "SC",
        "y": 43
      },
      {
        "color": "hsl(343, 70%, 50%)",
        "x": "MF",
        "y": 19
      },
      {
        "color": "hsl(168, 70%, 50%)",
        "x": "MP",
        "y": 4
      },
      {
        "color": "hsl(160, 70%, 50%)",
        "x": "TD",
        "y": 34
      },
      {
        "color": "hsl(314, 70%, 50%)",
        "x": "MG",
        "y": 46
      },
      {
        "color": "hsl(134, 70%, 50%)",
        "x": "BS",
        "y": 34
      }
    ]
  },
  {
    "id": "rhum",
    "color": "hsl(278, 70%, 50%)",
    "data": [
      {
        "color": "hsl(38, 70%, 50%)",
        "x": "WF",
        "y": 31
      },
      {
        "color": "hsl(331, 70%, 50%)",
        "x": "AW",
        "y": 53
      },
      {
        "color": "hsl(285, 70%, 50%)",
        "x": "AX",
        "y": 40
      },
      {
        "color": "hsl(19, 70%, 50%)",
        "x": "BQ",
        "y": 44
      },
      {
        "color": "hsl(187, 70%, 50%)",
        "x": "MZ",
        "y": 31
      },
      {
        "color": "hsl(217, 70%, 50%)",
        "x": "GM",
        "y": 25
      },
      {
        "color": "hsl(352, 70%, 50%)",
        "x": "SC",
        "y": 25
      },
      {
        "color": "hsl(190, 70%, 50%)",
        "x": "MF",
        "y": 2
      },
      {
        "color": "hsl(128, 70%, 50%)",
        "x": "MP",
        "y": 38
      },
      {
        "color": "hsl(226, 70%, 50%)",
        "x": "TD",
        "y": 21
      },
      {
        "color": "hsl(248, 70%, 50%)",
        "x": "MG",
        "y": 4
      },
      {
        "color": "hsl(249, 70%, 50%)",
        "x": "BS",
        "y": 4
      }
    ]
  },
  {
    "id": "gin",
    "color": "hsl(229, 70%, 50%)",
    "data": [
      {
        "color": "hsl(175, 70%, 50%)",
        "x": "WF",
        "y": 3
      },
      {
        "color": "hsl(97, 70%, 50%)",
        "x": "AW",
        "y": 6
      },
      {
        "color": "hsl(149, 70%, 50%)",
        "x": "AX",
        "y": 58
      },
      {
        "color": "hsl(227, 70%, 50%)",
        "x": "BQ",
        "y": 28
      },
      {
        "color": "hsl(335, 70%, 50%)",
        "x": "MZ",
        "y": 21
      },
      {
        "color": "hsl(71, 70%, 50%)",
        "x": "GM",
        "y": 27
      },
      {
        "color": "hsl(118, 70%, 50%)",
        "x": "SC",
        "y": 31
      },
      {
        "color": "hsl(322, 70%, 50%)",
        "x": "MF",
        "y": 52
      },
      {
        "color": "hsl(340, 70%, 50%)",
        "x": "MP",
        "y": 59
      },
      {
        "color": "hsl(175, 70%, 50%)",
        "x": "TD",
        "y": 10
      },
      {
        "color": "hsl(355, 70%, 50%)",
        "x": "MG",
        "y": 47
      },
      {
        "color": "hsl(196, 70%, 50%)",
        "x": "BS",
        "y": 3
      }
    ]
  },
  {
    "id": "vodka",
    "color": "hsl(76, 70%, 50%)",
    "data": [
      {
        "color": "hsl(251, 70%, 50%)",
        "x": "WF",
        "y": 36
      },
      {
        "color": "hsl(118, 70%, 50%)",
        "x": "AW",
        "y": 48
      },
      {
        "color": "hsl(160, 70%, 50%)",
        "x": "AX",
        "y": 2
      },
      {
        "color": "hsl(83, 70%, 50%)",
        "x": "BQ",
        "y": 15
      },
      {
        "color": "hsl(234, 70%, 50%)",
        "x": "MZ",
        "y": 8
      },
      {
        "color": "hsl(351, 70%, 50%)",
        "x": "GM",
        "y": 32
      },
      {
        "color": "hsl(269, 70%, 50%)",
        "x": "SC",
        "y": 45
      },
      {
        "color": "hsl(163, 70%, 50%)",
        "x": "MF",
        "y": 1
      },
      {
        "color": "hsl(20, 70%, 50%)",
        "x": "MP",
        "y": 36
      },
      {
        "color": "hsl(24, 70%, 50%)",
        "x": "TD",
        "y": 14
      },
      {
        "color": "hsl(168, 70%, 50%)",
        "x": "MG",
        "y": 10
      },
      {
        "color": "hsl(11, 70%, 50%)",
        "x": "BS",
        "y": 21
      }
    ]
  },
  {
    "id": "cognac",
    "color": "hsl(216, 70%, 50%)",
    "data": [
      {
        "color": "hsl(257, 70%, 50%)",
        "x": "WF",
        "y": 36
      },
      {
        "color": "hsl(155, 70%, 50%)",
        "x": "AW",
        "y": 2
      },
      {
        "color": "hsl(282, 70%, 50%)",
        "x": "AX",
        "y": 41
      },
      {
        "color": "hsl(254, 70%, 50%)",
        "x": "BQ",
        "y": 50
      },
      {
        "color": "hsl(189, 70%, 50%)",
        "x": "MZ",
        "y": 39
      },
      {
        "color": "hsl(106, 70%, 50%)",
        "x": "GM",
        "y": 43
      },
      {
        "color": "hsl(94, 70%, 50%)",
        "x": "SC",
        "y": 33
      },
      {
        "color": "hsl(66, 70%, 50%)",
        "x": "MF",
        "y": 53
      },
      {
        "color": "hsl(91, 70%, 50%)",
        "x": "MP",
        "y": 28
      },
      {
        "color": "hsl(1, 70%, 50%)",
        "x": "TD",
        "y": 48
      },
      {
        "color": "hsl(318, 70%, 50%)",
        "x": "MG",
        "y": 1
      },
      {
        "color": "hsl(351, 70%, 50%)",
        "x": "BS",
        "y": 32
      }
    ]
  }
]

class SizeGraph extends Component {
  render() {
    return (
      <Line
        data={data}
        margin={{
          top: 50,
          right: 60,
          bottom: 50,
          left: 60
        }}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country code",
          legendOffset: 36,
          legendPosition: "center"
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "center"
        }}
        enableGridX={true}
        enableGridY={true}
        stacked={true}
        curve="linear"
        colors="d310"
        colorBy="id"
        enableDots={true}
        dotSize={10}
        dotColor="inherit:darker(.3)"
        dotBorderWidth={2}
        dotBorderColor="#fff"
        enableDotLabel={true}
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
        enableStackTooltip={true}
      />
    );
  }
}
