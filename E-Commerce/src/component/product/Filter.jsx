import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortByPrice , clearFilters } from '../../Redux/Feature/productsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product || {});

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-md w-full max-w-sm mx-auto top-3">
      <h2 className="font-bold text-xl text-gray-800">Filter Component</h2>

      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Price:</span>
      </div>

      <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
        <input
          type="radio"
          name="filtering"
          value="LowToHigh"
          checked={productState.sort === 'LowToHigh'}
          onChange={() => dispatch(sortByPrice('LowToHigh'))}
          className="form-radio text-blue-600"
        />
        Low to High
      </label>

      <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
        <input
          type="radio"
          name="filtering"
          value="HighToLow"
          checked={productState.sort === 'HighToLow'}
          onChange={() => dispatch(sortByPrice('HighToLow'))}
          className="form-radio text-blue-600 ml-4"
        />
        High to Low
      </label>

      <button
        onClick={() => dispatch(clearFilters())}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
