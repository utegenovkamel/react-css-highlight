import React, { useState, useEffect } from 'react';

const data = [
  { id: 1, name: 'Иван Иванов', city: 'Москва', country: 'Россия' },
  { id: 2, name: 'John Doe', city: 'New York', country: 'USA' },
]

const fetchData = (searchQuery) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if(!searchQuery) {
        resolve(data)
      } else {
        const filteredData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        resolve(data);
      }
    }, 500);
  });
};

const TableSearchHighlight = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  console.log('data',data);

  useEffect(() => {
    fetchData(searchQuery).then((newData) => {
      setData(newData);
      highlightSearch(newData, searchQuery);
    });
  }, [searchQuery]);

  const highlightSearch = (data, query) => {
    if (!CSS.highlights) {
      console.error("CSS Custom Highlight API не поддерживается.");
      return;
    }

    CSS.highlights.clear();
    if (!query) return;

    const highlight = new Highlight();
    data.forEach((item) => {
      document.querySelectorAll('.searchable').forEach((node) => {
        if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
          const range = new Range();
          const index = node.textContent.toLowerCase().indexOf(query.toLowerCase());
          range.setStart(node.firstChild, index);
          range.setEnd(node.firstChild, index + query.length);
          highlight.add(range);
        }
      });
    });

    CSS.highlights.set('search-highlight', highlight);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск..."
      />
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Город</th>
            <th>Страна</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="searchable">{row.name}</td>
              <td className="searchable">{row.city}</td>
              <td className="searchable">{row.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSearchHighlight;
