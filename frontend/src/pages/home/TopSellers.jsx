import { useEffect, useState } from "react";
const category = [
  "choose a genre",
  "business",
  "fiction",
  "horror",
  "adventure",
];

function TopSellers() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      {/* category filtering */}
      <div className="mb-8 flex item-center">
        <select
          name="category"
          id="category"
          className="border bg-[#eaeaea] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {category.map((category, i) => {
            return (
              <option key={i} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default TopSellers;
