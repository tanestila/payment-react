export const Params = ({ params }: { params: Array<any> }) => {
  return (
    <>
      {params.map((param: any, index: number) => (
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
