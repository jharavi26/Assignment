import React from 'react';

const Filter = () => {

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
          // checked={productState.sort === 'LowToHigh'}
          // onChange={() =>
          //   productDispatch({
          //     type: 'SORT_BY_PRICE',
          //     payload: 'LowToHigh',
          //   })
          // }
          className="form-radio text-blue-600"
        />
        Low to High
      </label>

      <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
        <input
          type="radio"
          name="filtering"
          // value="HighToLow"
          // checked={productState.sort === 'HighToLow'}
          // onChange={() =>
          //   productDispatch({
          //     type: 'SORT_BY_PRICE',
          //     payload: 'HighToLow',
          //   })
          // }
          className="form-radio text-blue-600"
        />
        High to Low
      </label>

      <button
        // onClick={() => productDispatch({ type: 'CLEAR_FILTERS' })}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
