import React, { useState, useEffect } from 'react';

const data = [
  { id: 1, name: 'Иван Иванов', city: 'Москва', country: 'Россия' },
  { id: 2, name: 'John Doe', city: 'New York', country: 'USA' },
];

const TableSearchHighlight = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [highlighted, setHighlighted] = useState(null);

  useEffect(() => {
    if (!CSS.highlights || !searchQuery) {
      setHighlighted(null);
      return;
    }

    const ranges = [];
    document.querySelectorAll('.searchable').forEach((node) => {
      const index = node.textContent
        .toLowerCase()
        .indexOf(searchQuery.toLowerCase());
      if (index >= 0) {
        const range = new Range();
        range.setStart(node.firstChild, index);
        range.setEnd(node.firstChild, index + searchQuery.length);
        ranges.push(range);
      }
    });

    const highlight = new Highlight();
    ranges.forEach((range) => highlight.add(range));
    CSS.highlights.set('search-highlight', highlight);
    setHighlighted(highlight);

    return () => {
      CSS.highlights.delete('search-highlight');
    };
  }, [searchQuery]);

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
