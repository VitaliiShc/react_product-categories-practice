/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from 'react';
import './App.scss';

import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const categoriesWithOwners = categoriesFromServer.map(categoryFromServer => {
  const owner = usersFromServer.find(userFromServer => {
    return userFromServer.id === categoryFromServer.ownerId;
  });

  return { ...categoryFromServer, owner: { ...owner } };
});

const products = productsFromServer.map(productFromServer => {
  const category = categoriesWithOwners.find(categoryWithOwners => {
    return categoryWithOwners.id === productFromServer.categoryId;
  });

  return { ...productFromServer, category: { ...category } };
});

function filterProductsByUserId(productsList, userId, query = '') {
  const filteredProducts = productsList
    .filter(product => {
      if (userId === null) {
        return productsList;
      }

      return userId === product.category.owner.id;
    })
    .filter(product => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    });

  return filteredProducts;
}

export const App = () => {
  const [activeUser, setActiveUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const visibleProducts = filterProductsByUserId(
    products,
    activeUser,
    searchQuery,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => {
                  setActiveUser(null);
                }}
                className={cn({ 'is-active': activeUser === null })}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href={`#/${user.id}`}
                  key={user.id}
                  onClick={() => {
                    setActiveUser(user.id);
                  }}
                  className={cn({ 'is-active': activeUser === user.id })}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
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
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setSearchQuery('');
                  setActiveUser(null);
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length ? (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map(product => {
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
                })}
              </tbody>
            </table>
          ) : (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
