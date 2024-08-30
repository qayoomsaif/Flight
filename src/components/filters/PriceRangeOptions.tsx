// src/components/filters/PriceRangeOptions.tsx
import React from 'react';
import RangeSlider from '../RangeSlider';

interface PriceRangeOptionsProps {
  min: number;
  max: number;
  currency: string;
  values: number[];
  onChange: (values: number[]) => void;
}

const PriceRangeOptions: React.FC<PriceRangeOptionsProps> = ({
  min,
  max,
  values,
  currency,
  onChange,
}) => {
  return (
    <RangeSlider
      min={min}
      labelIntail={currency ? currency : '$'}
      max={max}
      values={values.length ? values : [min, max]}
      onValuesChange={onChange}
    />
  );
};

export default PriceRangeOptions;
