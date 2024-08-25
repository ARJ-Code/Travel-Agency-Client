import { Button, Col, Row } from "antd";
import { ReactNode, FC, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

export interface SlideCardProps {
  size: "4" | "2" | "1";
  data: ReactNode[];
}

const SlideCard: FC<SlideCardProps> = ({ data, size }) => {
  const [current, setCurrent] = useState<number>(0);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  const getSizeV = () => {
    if (isSmallScreen) return 1;
    switch (size) {
      case "4":
        return 4;
      case "2":
        return 2;
      case "1":
        return 1;
    }
  };

  const sizeV = getSizeV();

  const getSpan = () => {
    if (data.length >= sizeV) {
      return 20 / sizeV;
    }

    if (data.length === 1) return 20;
    if (data.length === 2) return 10;
    if (data.length === 3) return 7;
  };
  return (
    <Row style={{  }} gutter={2} justify="space-between">
      <Col
        span={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {current !== 0 &&
          (isSmallScreen ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onClick={() => setCurrent((c) => c - 1)}
            >
              <LeftOutlined />
            </div>
          ) : (
            <Button
              style={{ height: "100%" }}
              onClick={() => setCurrent((c) => c - 1)}
            >
              <LeftOutlined />
            </Button>
          ))}
      </Col>
      {data.slice(current, current + sizeV).map((d, idx) => (
        <Col key={idx} span={getSpan()}>
          {d}
        </Col>
      ))}
      <Col
        span={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {current < data.length - sizeV &&
          (isSmallScreen ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              onClick={() => setCurrent((c) => c + 1)}
            >
              <RightOutlined />
            </div>
          ) : (
            <Button
              style={{ height: "100%" }}
              onClick={() => setCurrent((c) => c + 1)}
            >
              <RightOutlined />
            </Button>
          ))}
      </Col>
    </Row>
  );
};

export default SlideCard;
