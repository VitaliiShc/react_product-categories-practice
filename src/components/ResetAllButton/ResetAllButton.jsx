export const ResetAllButton = props => {
  const { setSearchQuery, setActiveUser, setSelectedCategories } = props;

  return (
    <a
      data-cy="ResetAllButton"
      href="#/"
      className="button is-link is-outlined is-fullwidth"
      onClick={() => {
        setSearchQuery('');
        setActiveUser(null);
        setSelectedCategories([]);
      }}
    >
      Reset all filters
    </a>
  );
};
