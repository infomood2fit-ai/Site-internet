type LegalTableProps = {
  headers: string[];
  rows: string[][];
};

/**
 * Tableau utilisé dans les pages légales (CGV, confidentialité app...).
 * Le wrapper `overflow-x-auto` garantit que les tableaux restent
 * consultables sur mobile (défilement horizontal) plutôt que de casser
 * la mise en page.
 */
export default function LegalTable({ headers, rows }: LegalTableProps) {
  return (
    <div className="mt-3 overflow-x-auto rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
      <table className="w-full text-left" style={{ minWidth: "480px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(247,37,133,0.08)" }}>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-white font-700 whitespace-nowrap"
                style={{ fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : undefined }}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top" style={{ fontSize: "14px" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
