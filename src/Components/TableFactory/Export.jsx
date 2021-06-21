import React, { Component, useState } from "react";
import { Modal } from "react-bootstrap";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import XLSX from "xlsx";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const excludedHeaders = ["delete", "edit"];

export const Export = ({ columns, data, name }) => {
  const [message, setMessage] = useState(["Fetching data, please wait..."]);
  const [isExporting, setIsExporting] = useState(false);

  function handleMenuClick(e) {
    setIsExporting(true);
    console.log("click", e);
    exportData(e.key);
  }

  const finishExport = () => {
    setIsExporting(false);
  };

  const savePdf = (name, header, data) => {
    const pdf = new jsPDF("landscape");
    pdf.text(150, 10, name.toLowerCase(), "center");
    pdf.autoTable({
      head: [header],
      body: data,
      theme: "grid",
      marginLeft: 20,
      marginRight: 20,
      styles: {
        halign: "center",
      },
      headStyles: {
        fontSize: 9,
      },
      bodyStyles: {
        fontSize: 9,
      },
    });
    pdf.save(`${name.toLowerCase()}.pdf`);
  };

  const saveCsv = (name, header, data) => {
    const blob = new Blob([header.join(","), "\n", data.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, `${name.toLowerCase()}.csv`);
  };

  const saveXls = (name, header, data) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([header]);
    XLSX.utils.sheet_add_aoa(ws, data, { origin: "A2" });
    XLSX.utils.book_append_sheet(wb, ws, name.toLowerCase());
    XLSX.writeFile(wb, `${name.toLowerCase()}.xls`);
  };

  const exportData = (format) => {
    try {
      const filteredColumns = columns.filter(
        (column) => !excludedHeaders.includes(column.key)
      );
      const header = filteredColumns.map((column) => column.title);
      const dataSet = data.map((row) =>
        filteredColumns.map(
          (column) =>
            (column.textContent && column.textContent(row)) ||
            // (column.content && column.content(row)) ||
            row[column.dataIndex] ||
            row[column.key]
        )
      );

      switch (format) {
        case "pdf":
          savePdf(name, header, dataSet);
          break;
        case "csv":
          saveCsv(name, header, dataSet);
          break;
        case "xls":
          saveXls(name, header, dataSet);
          break;
        default:
          savePdf(name, header, dataSet);
          break;
      }
      setIsExporting(false);
    } catch (error) {
      setMessage("Error: " + error);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="pdf">To PDF</Menu.Item>
      <Menu.Item key="xls">To XLS</Menu.Item>
      <Menu.Item key="csv">To CSV</Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <Dropdown overlay={menu}>
        <Button>
          Export <DownOutlined />
        </Button>
      </Dropdown>

      {/* <Button
        onClick={this.exportCsv}
      >
        CSV
      </Button>
*/}

      <Modal show={isExporting} onHide={finishExport}>
        <Modal.Header>
          <Modal.Title>Export in progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button className={"btn btn-fill"} onClick={finishExport}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

// class Export extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isExporting: false,
//       message: "Fetching data, please wait...",
//       button: "Cancel",
//     };
//     this.excludedHeaders = [
//       "Edit",
//       "Delete",
//       "History",
//       "Detail",
//       "Headers",
//       "Parameters",
//       "Request",
//       "Response",
//       "Options",
//       "Deactivate",
//       "Rates",
//     ];
//   }

//   exportCsv = async () => {
//     this.setState({
//       isExporting: true,
//       message: "Fetching data, please wait...",
//       button: "Cancel",
//       format: "CSV",
//     });
//     await this.exportData();
//   };

//   exportPdf = async () => {
//     this.setState({
//       isExporting: true,
//       message: "Fetching data, please wait...",
//       button: "Cancel",
//       format: "PDF",
//     });
//     await this.exportData();
//   };

//   exportXls = async () => {
//     this.setState({
//       isExporting: true,
//       message: "Fetching data, please wait...",
//       button: "Cancel",
//       format: "XLS",
//     });
//     await this.exportData();
//   };

//   finishExport = async () => {
//     this.setState({ isExporting: false });
//   };

//   savePdf = (name, header, data) => {
//     const pdf = new jsPDF("landscape");
//     pdf.text(150, 10, name.toLowerCase(), "center");
//     pdf.autoTable({
//       head: [header],
//       body: data,
//       theme: "grid",
//       marginLeft: 20,
//       marginRight: 20,
//       styles: {
//         halign: "center",
//       },
//       headStyles: {
//         fontSize: 9,
//         fillColor: [70, 179, 80],
//       },
//       bodyStyles: {
//         fontSize: 9,
//       },
//     });
//     pdf.save(`${name.toLowerCase()}.pdf`);
//   };

//   saveCsv = (name, header, data) => {
//     const blob = new Blob([header.join(","), "\n", data.join("\n")], {
//       type: "text/csv;charset=utf-8",
//     });
//     saveAs(blob, `${name.toLowerCase()}.csv`);
//   };

//   saveXls = (name, header, data) => {
//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.aoa_to_sheet([header]);
//     XLSX.utils.sheet_add_aoa(ws, data, { origin: "A2" });
//     XLSX.utils.book_append_sheet(wb, ws, name.toLowerCase());
//     XLSX.writeFile(wb, `${name.toLowerCase()}.xls`);
//   };

//   exportData = async () => {
//     try {
//       const a = await this.props.exportFunction(this.props.searchData);
//       if (a.data && a.data.data && this.state.isExporting) {
//         const columns = this.props.columns.filter(
//           (column) => !this.excludedHeaders.includes(column.label)
//         );
//         const header = columns.map((column) => column.label);
//         const dataSet = a.data.data.map((row) =>
//           columns.map(
//             (column) =>
//               (column.textContent && column.textContent(row)) ||
//               (column.content && column.content(row)) ||
//               row[column.path] ||
//               row[column.key]
//           )
//         );
//         switch (this.state.format) {
//           case "PDF":
//             this.savePdf(this.props.name, header, dataSet);
//             break;
//           case "CSV":
//             this.saveCsv(this.props.name, header, dataSet);
//             break;
//           case "XLS":
//             this.saveXls(this.props.name, header, dataSet);
//             break;
//           default:
//             this.savePdf(this.props.name, header, dataSet);
//             break;
//         }
//         await this.finishExport();
//       }
//     } catch (e) {
//       if (
//         e.response &&
//         e.response.data &&
//         e.response.data.description &&
//         e.response.data.description.message &&
//         e.response.data.description.message.startsWith("Try to SELECT ALL")
//       ) {
//         this.setState({
//           message:
//             "You can not select all from this table. Please appoint some search parameters.",
//           button: "Close",
//         });
//       } else {
//         this.setState({ message: "Export error", button: "Close" });
//         throw e;
//       }
//     }
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <Button
//           id={this.props.id}
//           // className={"btn btn-fill btn-primary"}
//           onClick={this.exportCsv}
//           style={{ margin: "5px", ...this.props.style }}
//         >
//           CSV
//         </Button>
//         <Button
//           id={this.props.id}
//           // className={"btn btn-fill btn-primary"}
//           onClick={this.exportPdf}
//           style={{ margin: "5px", ...this.props.style }}
//         >
//           PDF
//         </Button>
//         <Button
//           id={this.props.id}
//           // className={"btn btn-fill btn-primary"}
//           onClick={this.exportXls}
//           style={{ margin: "5px", ...this.props.style }}
//         >
//           XLS
//         </Button>
//         <Modal show={this.state.isExporting} onHide={this.finishExport}>
//           <Modal.Header>
//             <Modal.Title>Export in progress</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>{this.state.message}</Modal.Body>
//           <Modal.Footer>
//             <Button className={"btn btn-fill"} onClick={this.finishExport}>
//               {this.state.button}
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </React.Fragment>
//     );
//   }
// }

// export { Export };
