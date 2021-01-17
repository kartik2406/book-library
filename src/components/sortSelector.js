export default function SortSelector({
  sortOptions,
  sortColumn,
  sortOrder,
  onChangeSortColumn,
  onChangeSortOrder,
}) {
  return (
    <div className="sort-selector">
      <p>Sort by</p>
      <select
        className="select-css"
        onChange={(event) => onChangeSortColumn(event)}
        value={sortColumn}
      >
        {sortOptions.map((sortOption, index) => (
          <option key={index} value={sortOption.key}>
            {sortOption.display}
          </option>
        ))}
      </select>
      in
      <select
        className="select-css"
        onChange={(event) => onChangeSortOrder(event)}
        value={sortOrder}
      >
        <option value="ASC"> Ascending </option>
        <option value="DESC"> Descending </option>
      </select>
      order
    </div>
  );
}
