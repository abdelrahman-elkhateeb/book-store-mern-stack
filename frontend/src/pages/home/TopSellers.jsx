import { useEffect, useState } from "react";
import BookCard from "../books/BookCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const category = [
  "choose a genre",
  "business",
  "fiction",
  "horror",
  "adventure",
];

function TopSellers() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("choose a genre");

  useEffect(() => {
    fetch("books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks =
    selectedCategory === "choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase(),
        );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      {/* category filtering */}
      <div className="mb-8 flex item-center">
        <select
          name="category"
          id="category"
          className="border bg-[#eaeaea] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {category.map((cat, i) => {
            return (
              <option key={i} value={cat}>
                {cat}
              </option>
            );
          })}
        </select>
      </div>
      {/* display filtered books */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        {filteredBooks.length > 0 &&
          filteredBooks.map((book, i) => (
            <SwiperSlide key={i}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default TopSellers;
