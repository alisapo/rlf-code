import React from 'react';

const Filters = ({ filters, handleFilters }) => {
  return (
    <div className="filters-group">
      {!filters.length
        ? <div className="no-filters">no filters</div>
        : filters.map(item =>
          <div key={item.filter} className="filter">
            <select
              className="select-filters"
              key={item.filter}
              name={item.filter}
              onChange={(e) => handleFilters({
                name: item.filter, value: e.target.value
              })}
            >
              {item.types.map(type =>
                <option
                  key={type.id}
                  value={type.name}
                >
                  {type.name}
                </option>
              )}
            </select>
          </div>
      )}
    </div>
  )
}

export default Filters;
