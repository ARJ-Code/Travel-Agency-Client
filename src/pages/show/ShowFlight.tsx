import { Card, Col, Divider, Modal, Row, Typography } from "antd";
import { FC } from "react";
import { Flight } from "../../types/services";
import Title from "antd/es/typography/Title";
import moment from "moment";
import { ShowMiniPlace } from "./ShowPlace";

export interface ShowFlightProps {
  open: boolean;
  onOk: () => void;
  flight: Flight;
}

const ShowFlight: FC<ShowFlightProps> = ({ open, onOk, flight }) => {
  const duration = moment.duration(flight.duration);

  const build = () => {
    let r = `${duration.hours()} hours`;

    if (duration.minutes() > 0) r = `${r} and ${duration.minutes()} minutes`;
    return r;
  };

  return (
    <Modal
      width={800}
      title={
        <Typography>
          <Title level={2}>{flight.company}</Title>
        </Typography>
      }
      open={open}
      onOk={onOk}
      onCancel={onOk}
      cancelButtonProps={{ style: { display: "none" } }}
      okText="Cerrar"
    >
      <Row className="m-5">
        <Col span={24}>
          <Card>
            <Card.Meta title="Duration" description={build()} />
          </Card>
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Origin</Title>
          <Divider />

          <ShowMiniPlace place={flight.origin} />
        </Col>
      </Row>
      <Row className="m-5">
        <Col span={24}>
          <Title level={4}>Destination</Title>
          <Divider />

          <ShowMiniPlace place={flight.destination} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ShowFlight;