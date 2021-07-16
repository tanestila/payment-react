export const Params = ({ params }) => {
  return (
    <>
      {params.map((param, index) => (
        <>
          {param.name}
          <div className="param-container">
            <span style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
              {JSON.stringify(param.value, null, "\t")}
            </span>
          </div>
        </>
      ))}
    </>
  );
};
