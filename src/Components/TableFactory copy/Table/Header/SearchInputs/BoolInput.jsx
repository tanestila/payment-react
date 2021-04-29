export default function BoolInput({ searchData = {}, isSearch, handleClick }) {
  return (
    <div
      className={
        isSearch
          ? "searchOpen search align-center"
          : "searchClosed search align-center"
      }
    >
      <i
        id="Success"
        className="icon-success status-icon-success"
        style={
          searchData.status === "Success" || searchData.enabled === 1
            ? {
                color: "#5BB795",
                WebkitTransform: "scale(1.5)",
                msTransform: "scale(1.5)",
                transform: "scale(1.5)",
              }
            : null
        }
        onClick={handleClick}
      />
      <i
        id="Failed"
        className="icon-failed status-icon-failed"
        style={
          searchData.status === "Failed" || searchData.enabled === 0
            ? {
                color: "#EC5E6F",
                WebkitTransform: "scale(1.5)",
                msTransform: "scale(1.5)",
                transform: "scale(1.5)",
              }
            : null
        }
        onClick={handleClick}
      />
    </div>
  );
}
