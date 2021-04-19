import React from "react";

export const Footer = () => {
  return (
    <div>
      <footer className="footer" style={{ textAlign: "right" }}>
        <p className="copyright">
          {new Date().getFullYear()} &copy; TBF Finance UAB
          {/* <a href="URL" >TBF Finance UAB</a> */}
        </p>
      </footer>
    </div>
  );
};
