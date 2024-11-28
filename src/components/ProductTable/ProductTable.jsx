import { Product } from '../Product';
import { ProductTableHead } from '../ProductTableHead';

export const ProductTable = props => {
  const {
    visibleProducts,
    sortByFields,
    setSortBy,
    setIsReversed,
    isReversed,
    sortBy,
  } = props;

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <ProductTableHead
          sortByFields={sortByFields}
          sortBy={sortBy}
          isReversed={isReversed}
          setSortBy={setSortBy}
          setIsReversed={setIsReversed}
        />
      </thead>

      <tbody>
        <Product visibleProducts={visibleProducts} />
      </tbody>
    </table>
  );
};
