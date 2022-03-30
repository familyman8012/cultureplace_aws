import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Chart, ChartData } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import Title from "../Title";
import SectionWrap from "../SectionWrap";
import { Btn, BtnBox, InfoMemberChartBox } from "./style";
import { sortBy } from "lodash";

interface Istatics {
  byAgegroup: { _id: string; count: number }[];
  byGender: { _id: string; count: number }[];
}

const InfoMemberChart = () => {
  const [chartData, setChartData] = useState<
    ChartData<"doughnut", number[], string>
  >({
    labels: [""],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: [""]
      }
    ]
  });
  const [chartData2, setChartData2] = useState<
    ChartData<"doughnut", number[], string>
  >({
    labels: [""],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: [""]
      }
    ]
  });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchUsers = () => {
      axios.get("/api/user/user").then((res: AxiosResponse<Istatics>) => {
        const { byGender, byAgegroup } = res.data;
        setChartData({
          labels: sortBy(byGender, ["_id"])
            .filter(el => el._id !== null)
            .map(el => el._id),
          datasets: [
            {
              label: "# of Votes",
              data: sortBy(byGender, ["_id"])
                .filter(el => el._id !== null)
                .map(el => el.count),
              backgroundColor: ["#ff8400", "#ffb700", "#dddddd"]
            }
          ]
        });
        setChartData2({
          labels: sortBy(byAgegroup, ["_id"])
            .filter(el => el._id !== null)
            .map(el => el._id),
          datasets: [
            {
              label: "# of Votes",
              data: sortBy(byAgegroup, ["_id"])
                .filter(el => el._id !== null)
                .map(el => el.count),
              backgroundColor: [
                "#ff8400",
                "#ffb700",
                "#ffd900",
                "#a3ce50",
                "#26b995",
                "#dddddd"
              ]
            }
          ]
        });
        setLoad(true);
      });
    };
    fetchUsers();
  }, []);

  Chart.register(ChartDataLabels);

  const options = {
    responsive: false,
    //tooltips 사용시
    rotation: 270,
    circumference: 180,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
        display: true,
        color: "#fff",
        backgroundColor: "#666666",
        formatter(value: number, context: any) {
          const total = context.dataset.data.reduce(
            (acc: number, cur: number) => {
              return acc + cur;
            }
          );
          return `${context.chart.data.labels[context.dataIndex]} ${Math.round(
            (value / total) * 100
          )}%`;
        }
      }
    }
  };

  const BtnList = [
    { id: "btn1", title: "성별", selData: "data1" },
    { id: "btn2", title: "연령", selData: "data2" }
  ];

  const [chart, setChart] = useState({
    data: "data1",
    onBtn: "btn1"
  });

  const handleViewChart = (data: string, onBtn: string) => {
    setChart({ data: data, onBtn: onBtn });
  };

  return (
    <>
      {load && (
        <SectionWrap>
          <Title>이번 시즌 이 클럽을 신청한 멤버는</Title>
          <InfoMemberChartBox>
            <Doughnut
              data={chart.data === "data1" ? chartData : chartData2}
              options={options}
            />
          </InfoMemberChartBox>
          <BtnBox>
            {BtnList.map(btn => (
              <Btn
                key={btn.id}
                id={btn.id}
                className={chart.onBtn === btn.id ? "on" : ""}
                onClick={() => handleViewChart(btn.selData, btn.id)}
              >
                {btn.title}
              </Btn>
            ))}
          </BtnBox>
        </SectionWrap>
      )}
    </>
  );
};

export default InfoMemberChart;
