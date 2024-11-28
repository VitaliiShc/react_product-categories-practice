export const SearchField = props => {
  const { searchQuery, setSearchQuery } = props;

  return (
    <>
      <input
        data-cy="SearchField"
        type="text"
        className="input"
        placeholder="Search"
        value={searchQuery}
        onChange={evt => {
          setSearchQuery(evt.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>

      <span className="icon is-right">
        {searchQuery !== '' && (
          <button
            data-cy="ClearButton"
            type="button"
            className="delete"
            onClick={() => {
              setSearchQuery('');
            }}
          />
        )}
      </span>
    </>
  );
};
