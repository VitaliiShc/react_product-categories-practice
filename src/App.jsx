/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { NoMatchingMessage } from './components/NoMatchingMessage';
import { ProductTable } from './components/ProductTable';
import { SearchField } from './components/SearchField';
import { CategorySelector } from './components/CategorySelector';
import { UserFilter } from './components/UserFilter';
import { ResetAllButton } from './components/ResetAllButton';

const SORT_BY_FIELDS = {
  id: 'ID',
  product: 'Product',
  category: 'Category',
  user: 'User',
};

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

function filterProducts(
  productsList,
  userId,
  query = '',
  categories = [],
  sortBy = 'id',
  isReversed = false,
) {
  const filteredProducts = productsList
    .filter(product => {
      if (!userId) {
        return productsList;
      }

      return userId === product.category.owner.id;
    })
    .filter(product => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    })
    .filter(product => {
      if (!categories.length) {
        return product;
      }

      return categories.includes(product.categoryId);
    })
    .toSorted((product1, product2) => {
      if (sortBy === 'id') {
        return product1.id - product2.id;
      }

      if (sortBy === 'product') {
        return product1.name.localeCompare(product2.name);
      }

      if (sortBy === 'category') {
        return product1.category.title.localeCompare(product2.category.title);
      }

      if (sortBy === 'user') {
        return product1.category.owner.name.localeCompare(
          product2.category.owner.name,
        );
      }

      return product1.id - product2.id;
    });

  if (isReversed) {
    return filteredProducts.toReversed();
  }

  return filteredProducts;
}

export const App = () => {
  const [activeUser, setActiveUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const visibleProducts = filterProducts(
    products,
    activeUser,
    searchQuery,
    selectedCategories,
    sortBy,
    isReversed,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <UserFilter
                usersFromServer={usersFromServer}
                setActiveUser={setActiveUser}
                activeUser={activeUser}
              />
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <SearchField
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <CategorySelector
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                categoriesFromServer={categoriesFromServer}
              />
            </div>

            <div className="panel-block">
              <ResetAllButton
                setSearchQuery={setSearchQuery}
                setActiveUser={setActiveUser}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length ? (
            <ProductTable
              setSortBy={setSortBy}
              setIsReversed={setIsReversed}
              visibleProducts={visibleProducts}
              sortByFields={SORT_BY_FIELDS}
              isReversed={isReversed}
              sortBy={sortBy}
            />
          ) : (
            <NoMatchingMessage />
          )}
        </div>
      </div>
    </div>
  );
};
