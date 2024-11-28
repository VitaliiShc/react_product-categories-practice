import cn from 'classnames';

export const ProductTableHead = props => {
  const { setSortBy, setIsReversed, sortByFields, sortBy, isReversed } = props;

  function handleSort(key) {
    if (key !== sortBy) {
      setSortBy(key);
      setIsReversed(false);
    }

    if (key === sortBy && isReversed === false) {
      setIsReversed(true);
    }

    if (key === sortBy && isReversed === true) {
      setSortBy(null);
      setIsReversed(false);
    }
  }

  return (
    <tr>
      {Object.keys(sortByFields).map(key => (
        <th key={key}>
          <span className="is-flex is-flex-wrap-nowrap">
            {sortByFields[key]}
            <a
              href="#/"
              onClick={() => {
                handleSort(key);
              }}
            >
              <span className="icon">
                <i
                  data-cy="SortIcon"
                  className={cn('fas', {
                    'fa-sort': sortBy !== key,
                    'fa-sort-up': sortBy === key && !isReversed,
                    'fa-sort-down': sortBy === key && isReversed,
                  })}
                />
              </span>
            </a>
          </span>
        </th>
      ))}
    </tr>
  );
};
