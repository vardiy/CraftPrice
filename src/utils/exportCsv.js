export function exportCsv(materials, currencyCode = "USD") {
  const header = ["Item Name", "Quantity", `Cost Per Unit (${currencyCode})`, `Total Cost (${currencyCode})`];
  const rows = materials.map((m) => {
    const qty = parseFloat(m.quantity) || 0;
    const cost = parseFloat(m.unitCost) || 0;
    return [
      `"${(m.name || "Unnamed").replace(/"/g, '""')}"`,
      qty,
      cost.toFixed(2),
      (qty * cost).toFixed(2),
    ];
  });

  const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bill-of-materials.csv";
  a.click();
  URL.revokeObjectURL(url);
}
