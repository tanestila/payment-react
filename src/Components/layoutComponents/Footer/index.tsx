export const Footer = () => {
  return (
    <div>
      <footer className="footer" style={{ textAlign: "right" }}>
        <p className="copyright">
          {new Date().getFullYear()} &copy; TBF Finance UAB
        </p>
      </footer>
    </div>
  );
};
