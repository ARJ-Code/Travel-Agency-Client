import {
  Button,
  Col,
  DatePicker,
  Divider,
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

export interface MobileFilterSearchProps {
  filters: FilterItem[];
  loading: boolean;
  packageOrOffer?: boolean;
  formProps: FilterSearchFormProps;
}

const MobileFilterSearch: FC<MobileFilterSearchProps> = ({
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
    <Form form={form} className="m-5">
      <Row gutter={5} style={{ height: 40, marginBottom: 20 }}>
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
      {filters.map((f, idx) => (
        <Row gutter={5} style={{ height: 40 }} key={idx} justify="center">
          <Col>
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
        </Row>
      ))}

      <Divider />
      {packageOrOffer && (
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
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
            </Row>
            <Row style={{ height: 40 }}>
              <Col span={24}>
                <Slider
                  range
                  min={0}
                  max={1000}
                  value={priceRange}
                  onChange={handleSliderChange}
                />
              </Col>
            </Row>
            <Row style={{ height: 40 }} gutter={2} justify="center">
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
      )}
    </Form>
  );
};

export default MobileFilterSearch;
