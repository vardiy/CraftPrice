import jsPDF from "jspdf";

export function exportPdf({ materials, laborHours, hourlyWage, overheadPercent, profitMargin, totalMaterialCost, laborCost, overheadCost, totalCost, retailPrice, wholesalePrice }) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  doc.setFontSize(20);
  doc.text("CraftPrice — Cost Summary", pageWidth / 2, y, { align: "center" });
  y += 14;

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: "center" });
  y += 14;

  // Materials table
  doc.setFontSize(14);
  doc.setTextColor(30);
  doc.text("Materials", 20, y);
  y += 8;

  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text("Name", 20, y);
  doc.text("Qty", 100, y);
  doc.text("Unit Cost", 130, y);
  doc.text("Subtotal", 165, y);
  y += 2;
  doc.setDrawColor(200);
  doc.line(20, y, 190, y);
  y += 6;

  doc.setTextColor(40);
  for (const m of materials) {
    const qty = parseFloat(m.quantity) || 0;
    const cost = parseFloat(m.unitCost) || 0;
    doc.text(m.name || "Unnamed", 20, y);
    doc.text(String(qty), 100, y);
    doc.text(`$${cost.toFixed(2)}`, 130, y);
    doc.text(`$${(qty * cost).toFixed(2)}`, 165, y);
    y += 7;
  }

  y += 4;
  doc.line(20, y, 190, y);
  y += 8;

  // Cost breakdown
  doc.setFontSize(14);
  doc.setTextColor(30);
  doc.text("Cost Breakdown", 20, y);
  y += 10;

  doc.setFontSize(11);
  doc.setTextColor(40);
  const rows = [
    ["Total Materials", `$${totalMaterialCost.toFixed(2)}`],
    [`Labor (${laborHours}h × $${hourlyWage}/h)`, `$${laborCost.toFixed(2)}`],
    [`Overhead (${overheadPercent}%)`, `$${overheadCost.toFixed(2)}`],
    ["Total Cost", `$${totalCost.toFixed(2)}`],
  ];

  for (const [label, value] of rows) {
    doc.text(label, 20, y);
    doc.text(value, 165, y);
    y += 8;
  }

  y += 4;
  doc.line(20, y, 190, y);
  y += 10;

  // Pricing
  doc.setFontSize(14);
  doc.setTextColor(30);
  doc.text("Pricing", 20, y);
  y += 10;

  doc.setFontSize(12);
  doc.setTextColor(40);
  doc.text(`Profit Margin: ${profitMargin}%`, 20, y);
  y += 9;
  doc.setFontSize(16);
  doc.setTextColor(20);
  doc.text(`Retail Price:  $${retailPrice.toFixed(2)}`, 20, y);
  y += 10;
  doc.text(`Wholesale Price:  $${wholesalePrice.toFixed(2)}`, 20, y);

  doc.save("craftprice-summary.pdf");
}
