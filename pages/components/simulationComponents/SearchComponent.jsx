import React, { useState } from 'react';

const SearchComponent = () =>  {
  const [query, setQuery] = useState('')

  const handleChange = (event) => {
    setQuery(event.target.value)
  };

  const handleSearch = () => {
    console.log('検索実行:', query);
    // ここでAPI呼び出し等の検索処理を行う
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="flex justify-between items-center bg-gray-200 rounded-full pl-4 pr-2 py-2 w-1/2 mx-auto">
      <span className="text-gray-500">🔍</span>
      <input
        className="flex-grow bg-transparent outline-none pl-2" // 幅をflex-growに設定
        type="text"
        placeholder="企業コードもしくは企業名を入力"
        value={query}
        onChange={handleChange}
      />
      
      {query && (
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleClear}
        >
          ✕
        </button>
      )}
      <button
        className="ml-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-full px-4 py-1"
        onClick={handleSearch}
      >
        検索
      </button>
    </div>
  );
}

export default SearchComponent;