import cn from 'classnames';

export const Product = ({ visibleProducts }) => {
  return visibleProducts.map(product => {
    return (
      <tr data-cy="Product" key={product.id}>
        <td className="has-text-weight-bold" data-cy="ProductId">
          {product.id}
        </td>

        <td data-cy="ProductName">{product.name}</td>
        <td data-cy="ProductCategory">
          {product.category.icon} - {product.category.title}
        </td>

        <td
          data-cy="ProductUser"
          className={cn({
            'has-text-link': product.category.owner.sex === 'm',
            'has-text-danger': product.category.owner.sex === 'f',
          })}
        >
          {product.category.owner.name}
        </td>
      </tr>
    );
  });
};
