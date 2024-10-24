export default function FilterForm({ type, searchTerm, handleTypeChange, handleSearchChange, handleClearFilter, typeCollection }) {
  return (
    <form className="flex flex-col space-y-4 w-full sticky top-0 bg-[rgb(247,247,247)] px-8 pt-8 pb-2">
      <select
        onChange={handleTypeChange}
        value={type}
        className="p-2 border rounded-md w-full sm:w-5/12 text-sm"
      >
        <option value="">All Types</option>
        {typeCollection?.map((item, index) => (
          <option className="text-md" key={index} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      <div>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full sm:w-7/12 text-sm"
        />
        <span
          onClick={handleClearFilter}
          className="cursor-pointer bg-[rgb(0,67,104)] text-[#fff] p-2 rounded-md md:mx-2 mt-4 mx-0 md:mt-0 inline-block"
        >
          Clear Search
        </span>
      </div>
    </form>
  );
}