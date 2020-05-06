import React from 'react';
import Downshift from 'downshift';
import { useDebouncedCallback } from 'use-debounce';
import { useLazyQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { DropDown, SearchStyles, DropDownItem } from './styles/Dropdown';
import SEARCH_ITEM_QUERY from '../graphql/item/searchItem.graphql';

function AutoComplete() {
  const router = useRouter();
  const [search, { data: searchResults, loading }] = useLazyQuery(
    SEARCH_ITEM_QUERY,
  );
  const [debouncedSearch] = useDebouncedCallback((term) => {
    return search({
      variables: {
        searchTerm: term,
      },
    });
  }, 350);

  const results = searchResults?.searchItems ?? [];
  return (
    <SearchStyles>
      <Downshift
        id="search-input"
        onChange={(item) => {
          router.push('/item/[id]', `/item/${item.id}`);
        }}
        itemToString={(item) => (item == null ? '' : item.title)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => {
          return (
            <div>
              <input
                {...getInputProps({
                  type: 'search',
                  placeholder: 'Search for an item',
                  id: 'search',
                  className: loading ? 'loading' : '',
                  onChange(e) {
                    debouncedSearch(e.target.value);
                  },
                })}
              />
              {isOpen && (
                <DropDown>
                  {results.map((item, index) => {
                    return (
                      <DropDownItem
                        key={item.id}
                        {...getItemProps({ item })}
                        highlighted={index === highlightedIndex}
                      >
                        <img src={item.image} alt={item.title} width="50" />
                        {item.title}
                      </DropDownItem>
                    );
                  })}
                  {!loading && !results.length && (
                    <DropDownItem>Nothing found for {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          );
        }}
      </Downshift>
    </SearchStyles>
  );
}

export default AutoComplete;
