export interface IPageItem {
  value: number | string;
  isActive: boolean;
}

export const getPageRange = (
  totalSize: number,
  pageSize: number
): Array<number> => {
  const pageCount = Math.floor(totalSize / pageSize);
  return new Array(pageCount).fill(null).map((_, idx) => idx + 1);
};

export const generatePaginationItems = (
  pageRange: Array<number>,
  currentPage: number
): Array<IPageItem> =>
  pageRange.map((page) => {
    const numPages = pageRange.length;
    const activePageItem: IPageItem = {
      value: page,
      isActive: true,
    };

    if (page === currentPage) {
      return activePageItem;
    }
    if (
      (page <= 4 && currentPage <= 4) ||
      (page >= numPages - 4 && currentPage >= numPages - 4)
    ) {
      return activePageItem;
    }
    if (page === 1 || page === numPages) {
      return activePageItem;
    }
    if (
      [1, 2].includes(currentPage - page) ||
      [1, 2].includes(page - currentPage)
    ) {
      return activePageItem;
    }

    return {
      value: "...",
      isActive: false,
    };
  });
