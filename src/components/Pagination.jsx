const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      
      const allMoviesSection = document.querySelector('.all-movies');
      if (allMoviesSection) {
        allMoviesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-2 py-1 sm:px-3 sm:py-2 mx-0.5 sm:mx-1 bg-gradient-to-r from-purple-800 to-blue-800 text-white rounded transition-colors cursor-pointer text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>
      );
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-2 py-1 sm:px-3 sm:py-2 mx-0.5 sm:mx-1 bg-gradient-to-r from-purple-800 to-blue-800 text-white rounded transition-colors cursor-pointer text-xs sm:text-sm min-w-[32px] sm:min-w-[40px]"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-1 py-1 sm:px-3 sm:py-2 mx-0.5 sm:mx-1 text-gray-400 text-xs sm:text-sm">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1 sm:px-3 sm:py-2 mx-0.5 sm:mx-1 rounded transition-colors cursor-pointer text-xs sm:text-sm min-w-[32px] sm:min-w-[40px] ${
            i === currentPage
              ? "bg-gradient-to-r from-purple-800 to-blue-800 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-1 py-1 sm:px-3 sm:py-2 mx-0.5 sm:mx-1 text-gray-400 text-xs sm:text-sm">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-2 py-1 sm:px-3 sm:py-2 mx-0.5 sm:mx-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors cursor-pointer text-xs sm:text-sm min-w-[32px] sm:min-w-[40px]"
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-2 py-1 sm:px-3 sm:py-2 mx-0.5 sm:mx-1 bg-gradient-to-r from-purple-800 to-blue-800 text-white rounded transition-colors cursor-pointer text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">Next</span>
        </button>
      );
    }

    return buttons;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center mt-6 sm:mt-8 mb-4 px-2">
      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-0 max-w-full overflow-x-auto">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default Pagination;
