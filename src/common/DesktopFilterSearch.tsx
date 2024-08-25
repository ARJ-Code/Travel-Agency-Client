import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
} from "antd";

import { FC } from "react";
import { UndoOutlined, FilterFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { FilterItem, FilterSearchFormProps } from "./FilterSearch";

export interface DesktopFilterSearchProps {
  filters: FilterItem[];
  loading: boolean;
  packageOrOffer?: boolean;
  formProps: FilterSearchFormProps;
}

const DesktopFilterSearch: FC<DesktopFilterSearchProps> = ({
  filters,
  loading,
  packageOrOffer = false,
  formProps,
}) => {
  const {
    form,
    searchParams,
    setSearchParams,
    handleSliderChange,
    priceRange,
    filterActive,
    handleInputNumberChange,
    setFilterActive,
    reset,
  } = formProps;

  return (
    <Form form={form}>
      <Row justify="space-between">
        <Col>
          <Row gutter={5} style={{ height: 40 }}>
            {filters.map((f, idx) => (
              <Col key={idx}>
                <Form.Item name={idx}>
                  <Select
                    onChange={(e) => {
                      const params = Object.fromEntries(searchParams);

                      const key = f.key ?? f.name.toLowerCase();
                      if (e) params[key] = e;
                      else delete params[key];

                      setSearchParams(params);
                    }}
                    style={f.styles}
                    showSearch={f.search}
                    filterOption={(input, option) =>
                      (option?.label
                        ?.toString()
                        ?.toLowerCase()
                        ?.indexOf(input.toLowerCase()) ?? -1) >= 0
                    }
                    allowClear
                    options={f.options}
                    placeholder={f.name}
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Col>
        <Col>
          <Row gutter={5} style={{ width: 300, height: 40 }}>
            <Col span={20}>
              <Form.Item name="search">
                <Input.Search
                  allowClear
                  onSearch={(s) => {
                    const params = Object.fromEntries(searchParams);

                    const key = "search";
                    if (s) params[key] = s;
                    else delete params[key];

                    setSearchParams(params);
                  }}
                  placeholder="Search"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button disabled={loading} onClick={reset}>
                <UndoOutlined />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {packageOrOffer && (
        <Row justify="space-between">
          <Col>
            <Form.Item name="date" style={{ height: 40 }}>
              <DatePicker.RangePicker
                format="DD/MM/YYYY HH:mm"
                showTime
                onChange={(v) => {
                  const params = Object.fromEntries(searchParams);

                  if (v) {
                    params["start"] = dayjs(v[0]).valueOf().toString();
                    params["end"] = dayjs(v[1]).valueOf().toString();
                  } else {
                    delete params["start"];
                    delete params["end"];
                  }

                  setSearchParams(params);
                }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Row gutter={5} justify="space-between">
              <Col style={{ width: 200, height: 40 }}>
                <Slider
                  range
                  min={0}
                  max={1000}
                  value={priceRange}
                  onChange={handleSliderChange}
                />
              </Col>
              <Col>
                <Row style={{ height: 40 }} gutter={2}>
                  <Col>
                    <InputNumber
                      value={priceRange[0]}
                      onChange={(value) => handleInputNumberChange(0, value!)}
                    />
                  </Col>
                  <Col>
                    <InputNumber
                      value={priceRange[1]}
                      onChange={(value) => handleInputNumberChange(1, value!)}
                    />
                  </Col>
                  <Col>
                    <Button onClick={() => setFilterActive(!filterActive)}>
                      <FilterFilled
                        style={filterActive ? { color: "green" } : {}}
                      />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default DesktopFilterSearch;
