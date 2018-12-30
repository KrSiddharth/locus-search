import React from 'react';

function getFilteredData(searchData, query){
  return (searchData.filter((search) => (search.id.split(new RegExp(`(${query})`)).length > 1 ||
    search.name.split(new RegExp(`(${query})`)).length > 1 ||
    search.pincode.split(new RegExp(`(${query})`)).length > 1 ||
    search.address.split(new RegExp(`(${query})`)).length > 1
  )));
}

function SearchResults(props) {
  return (getFilteredData(props.searchData, props.query).length > 0 ?
    getFilteredData(props.searchData, props.query).map((search, i) => (
      <div key={i} className={props.inView === i ? 'searchCard highlight' : 'searchCard'} ref={props.setRef.bind(this,i)} onMouseOver={props.onHover.bind(this,i)}>
        {
        ['id', 'name', 'address', 'pincode'].map((key, k) => (<div key={k} className={key}>
            {
              search[key].split(new RegExp(`(${props.query})`)).map((query, index) =>
              ( query === props.query ?
                  (<span key={index} className='highlight'>{props.query}</span>)
                : (<span key={index}>{query}</span>)
              )
            )}
          </div>))
        }
          </div>
      ))
      : <div className="noResultCard"><span>No User Found</span></div>
    );
}

export default SearchResults;
