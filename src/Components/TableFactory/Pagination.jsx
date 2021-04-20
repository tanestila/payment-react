import _ from "lodash";

import React from "react";

const Pagination = ({
  pagesCount,
  currentPage,
  onPageChange,
  pageSize,
  count,
}) => {
  const from = currentPage * pageSize - pageSize + 1;
  const to = pageSize * currentPage < count ? pageSize * currentPage : count;
  if (pagesCount > 1) {
    let remainder, startLink, finishLink;
    const buttonsCount = 10;
    remainder =
      currentPage % buttonsCount === 0
        ? Math.floor(currentPage / buttonsCount) - 1
        : Math.floor(currentPage / buttonsCount);
    startLink = buttonsCount * remainder + 1;
    finishLink =
      startLink + buttonsCount > pagesCount
        ? pagesCount + 1
        : buttonsCount * remainder + buttonsCount + 1;
    let pages = _.range(startLink, finishLink);
    return (
      <div className="pagination-container">
        <nav>
          <ul className="pagination clickable">
            <li
              key={"Previous"}
              className={currentPage === 1 ? " disabled" : ""}
            >
              <span
                onClick={
                  currentPage === 1 ? null : () => onPageChange(currentPage - 1)
                }
              >
                {"<"}
              </span>
            </li>
            {currentPage > buttonsCount ? (
              <li key={1} className={""}>
                <span
                  onClick={currentPage === 1 ? null : () => onPageChange(1)}
                >
                  {1}
                </span>
              </li>
            ) : null}
            {currentPage > buttonsCount ? (
              <li key={".."} className={""}>
                <span
                  onClick={() =>
                    onPageChange(
                      currentPage % buttonsCount !== 0
                        ? (Math.floor(currentPage / buttonsCount) - 1) *
                            buttonsCount +
                            1
                        : currentPage - 2 * buttonsCount + 1
                    )
                  }
                >
                  ...
                </span>
              </li>
            ) : null}
            {pages.map((page) => (
              <li key={page} className={page === currentPage ? " active" : ""}>
                <span
                  onClick={
                    page === currentPage ? null : () => onPageChange(page)
                  }
                  style={
                    page.length === 3
                      ? { padding: "2px 12px" }
                      : { padding: "2px 12px" }
                  }
                >
                  {page}
                </span>
              </li>
            ))}

            {(Math.floor(pagesCount / buttonsCount) !==
              Math.floor(currentPage / buttonsCount) ||
              currentPage ===
                Math.floor(pagesCount / buttonsCount) * buttonsCount) &&
            finishLink - pagesCount !== 1 ? (
              <li key={"..."} className={""}>
                <span
                  onClick={
                    currentPage + buttonsCount > pagesCount
                      ? () =>
                          onPageChange(
                            Math.floor(pagesCount / buttonsCount) *
                              buttonsCount +
                              1
                          )
                      : () =>
                          onPageChange(
                            currentPage % 10 !== 0
                              ? (Math.floor(currentPage / buttonsCount) + 1) *
                                  buttonsCount +
                                  1
                              : currentPage + 1
                          )
                  }
                >
                  ...
                </span>
              </li>
            ) : null}
            {(Math.floor(pagesCount / buttonsCount) !==
              Math.floor(currentPage / buttonsCount) ||
              currentPage ===
                Math.floor(pagesCount / buttonsCount) * buttonsCount) &&
            finishLink - pagesCount !== 1 ? (
              <li key={pagesCount} className={""}>
                <span
                  onClick={
                    pagesCount === currentPage
                      ? null
                      : () => onPageChange(pagesCount)
                  }
                >
                  {pagesCount}
                </span>
              </li>
            ) : null}

            <li
              key={"Next"}
              className={currentPage === pagesCount ? " disabled" : ""}
            >
              <sapn
                onClick={
                  currentPage === pagesCount
                    ? null
                    : () => onPageChange(currentPage + 1)
                }
              >
                {">"}
              </sapn>
            </li>
          </ul>
        </nav>
        {from !== to ? (
          <label className="pagination-label">
            Shown {from} ... {to} from {count}
          </label>
        ) : (
          <label className="pagination-label">
            Shown {from} element from {count}
          </label>
        )}
      </div>
    );
  } else return <div></div>;
};

export default Pagination;
