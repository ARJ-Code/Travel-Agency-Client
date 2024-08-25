import { Drawer, Form, FormInstance } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { CSSProperties, FC, useEffect, useState } from "react";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";

import { useMediaQuery } from "react-responsive";
import DesktopFilterSearch from "./DesktopFilterSearch";
import FloatingButton from "./FloatingButton";
import { FilterOutlined } from "@ant-design/icons";
import MobileFilterSearch from "./MobileFilterSearch";

export interface FilterItem {
  options: DefaultOptionType[];
  name: string;
  key?: string;
  styles?: CSSProperties;
  search?: boolean;
}

export interface FilterSearchFormProps {
  form: FormInstance;
  searchParams: URLSearchParams;
  priceRange: number[];
  filterActive: boolean;
  setSearchParams: SetURLSearchParams;
  handleSliderChange: (value: number[]) => void;
  handleInputNumberChange: (index: number, value: number) => void;
  reset: () => void;
  setFilterActive: (value: boolean) => void;
}

export interface FilterSearchProps {
  filters: FilterItem[];
  loading: boolean;
  packageOrOffer?: boolean;
}

const FilterSearch: FC<FilterSearchProps> = ({
  filters,
  loading,
  packageOrOffer = false,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const [showDrawer, setShowDrawer] = useState(false);

  const [form] = Form.useForm();

  const reset = () => {
    setSearchParams();
    form.resetFields();
    setFilterActive(false);
    setPriceRange([0, 100]);
  };

  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);

  // Handle the change in the slider
  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
  };

  // Handle the change in the input numbers
  const handleInputNumberChange = (index: number, value: number) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
  };

  const [filterActive, setFilterActive] = useState<boolean>(false);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    if (filterActive) {
      params["minPrice"] = priceRange[0].toString();
      params["maxPrice"] = priceRange[1].toString();
    } else {
      delete params["minPrice"];
      delete params["maxPrice"];
    }

    setSearchParams(params);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterActive]);

  useEffect(() => {
    if (filterActive) setFilterActive(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange]);

  if (isSmallScreen)
    return (
      <>
        <FloatingButton
          onClick={() => setShowDrawer(true)}
          icon={<FilterOutlined />}
        />
        <Drawer
          open={showDrawer}
          title="Filters"
          closable
          onClose={() => setShowDrawer(false)}
        >
          <MobileFilterSearch
            loading={loading}
            filters={filters}
            packageOrOffer={packageOrOffer}
            formProps={{
              handleInputNumberChange,
              handleSliderChange,
              searchParams,
              setFilterActive,
              setSearchParams,
              priceRange,
              form,
              filterActive,
              reset,
            }}
          />
        </Drawer>
      </>
    );

  return (
    <DesktopFilterSearch
      loading={loading}
      filters={filters}
      packageOrOffer={packageOrOffer}
      formProps={{
        handleInputNumberChange,
        handleSliderChange,
        searchParams,
        setFilterActive,
        setSearchParams,
        priceRange,
        form,
        filterActive,
        reset,
      }}
    />
  );
};

export default FilterSearch;
