import jsPDF from "jspdf";

function ReportGenerator({
  dashboard,
  advice = [],
}) {

  const generatePDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("FinanceAI Report", 20, 20);

    doc.setFontSize(14);

    doc.text(
      `Total Income: ₹${dashboard.totalIncome}`,
      20,
      40
    );

    doc.text(
      `Total Expense: ₹${dashboard.totalExpense}`,
      20,
      50
    );

    doc.text(
      `Current Balance: ₹${dashboard.balance}`,
      20,
      60
    );

    doc.text(
      `Generated On: ${new Date().toLocaleDateString()}`,
      20,
      75
    );

    doc.text(
      "AI Suggestions",
      20,
      95
    );

    advice.forEach((item, index) => {
      doc.text(
        `• ${item}`,
        25,
        110 + index * 10
      );
    });

    doc.save("FinanceAI_Report.pdf");
  };

  return (
    <button
      className="pdf-btn"
      onClick={generatePDF}
    >
      📄 Download Report
    </button>
  );
}

export default ReportGenerator;