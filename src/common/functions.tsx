import { Col, Row } from "antd";
import { ApiResponse } from "../types/api";
import { HotelCategory } from "../types/services";
import { StarFilled } from "@ant-design/icons";
import { CSSProperties } from "react";

export const buildMessage = (responses: ApiResponse<any>[]) => {
  let msg = "";

  const aux = (response: ApiResponse<any>) => {
    if (!response.ok) {
      if (msg.length === 0) msg = response.message;
      else msg = `${msg}, ${response.message}`;
    }
  };

  responses.map((r) => aux(r));

  return msg;
};

export const getCategory = (x: HotelCategory, styles?: CSSProperties) => {
  const renderStars = (n: number) => {
    let stars = [];
    for (let i = 0; i < n; i++) {
      stars.push(i);
    }
    return (
      <Row gutter={1}>
        {stars.map((i) => (
          <Col key={i}>
            <StarFilled style={{ ...styles, color: "gold" }} />
          </Col>
        ))}
      </Row>
    );
  };

  switch (x) {
    case HotelCategory.OneStar:
      return renderStars(1);
    case HotelCategory.TwoStars:
      return renderStars(2);
    case HotelCategory.ThreeStars:
      return renderStars(3);
    case HotelCategory.FourStars:
      return renderStars(4);
    case HotelCategory.FiveStars:
      return renderStars(5);
  }
};