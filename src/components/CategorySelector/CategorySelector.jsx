import cn from 'classnames';

export const CategorySelector = props => {
  const { selectedCategories, setSelectedCategories, categoriesFromServer } =
    props;

  function handleSelectCategory(id) {
    let selectedCategoriesArr = [...selectedCategories];

    if (selectedCategoriesArr.includes(id)) {
      selectedCategoriesArr = selectedCategoriesArr.filter(selectedCategory => {
        return selectedCategory !== id;
      });
    } else {
      selectedCategoriesArr.push(id);
    }

    setSelectedCategories(selectedCategoriesArr);
  }

  return (
    <>
      <a
        href="#/"
        data-cy="AllCategories"
        className={cn('button', 'is-success', 'mr-6', {
          'is-outlined': selectedCategories.length !== 0,
        })}
        onClick={() => {
          setSelectedCategories([]);
        }}
      >
        All
      </a>

      {categoriesFromServer.map(categoryFromServer => {
        return (
          <a
            data-cy="Category"
            className={cn('button', 'mr-2', 'my-1', {
              'is-info': selectedCategories.includes(categoryFromServer.id),
            })}
            href={`#/${categoryFromServer.id}`}
            key={categoryFromServer.id}
            onClick={() => {
              handleSelectCategory(categoryFromServer.id);
            }}
          >
            {categoryFromServer.title}
          </a>
        );
      })}
    </>
  );
};
