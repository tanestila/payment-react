export const HelpTip: React.FC<{ tip: string }> = ({ tip }) => {
  return (
    <i className="far fa-question-circle help-tip">
      <p>{tip}</p>
    </i>
  );
};
