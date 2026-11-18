import { Download, FileSpreadsheet, TrendingUp } from "lucide-react";
import ReportSummary from "../components/ReportSummary";
import { getReportSummary } from "../data/categoryData";
import { useContacts } from "../context/ContactContext";
import { exportCategoriesCSV, exportContactsCSV, exportReportSummaryCSV } from "../utils/exportCSV";

const styles = `
.ch-page{--ch-ink:#17243b;--ch-muted:#718096;--ch-line:#e7ecf3;max-width:1240px;margin:0 auto;padding:38px 28px 56px;color:var(--ch-ink);font-family:Inter,ui-sans-serif,system-ui,sans-serif}.ch-page *{box-sizing:border-box}.ch-page button:focus-visible{outline:3px solid #9bb9ff;outline-offset:2px}
.ch-page-header{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:26px}.ch-eyebrow{margin:0 0 8px;color:#5574ad;font-size:11px;font-weight:800;letter-spacing:.13em;text-transform:uppercase}.ch-page h1{margin:0;color:#17243b;font-size:30px;letter-spacing:-.04em}.ch-lede{margin:8px 0 0;color:var(--ch-muted);font-size:14px}.ch-period{padding:9px 12px;border:1px solid var(--ch-line);border-radius:10px;background:#fff;color:#53627a;font-size:12px;font-weight:650}.ch-summary-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:13px;margin-bottom:20px}.ch-summary-card{position:relative;display:grid;grid-template-columns:38px 1fr;grid-template-rows:auto auto;align-items:center;column-gap:11px;min-height:106px;padding:17px;border:1px solid var(--ch-line);border-radius:15px;background:#fff}.ch-summary-icon{grid-row:1/3;display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:#edf2ff;color:#416bd0}.ch-summary-icon-1{background:#eaf1ff;color:#3767d5}.ch-summary-icon-2{background:#f1edff;color:#7359c7}.ch-summary-icon-3{background:#fff4df;color:#b87918}.ch-summary-icon-4{background:#e7f7ef;color:#25865b}.ch-summary-label{color:#718096;font-size:11px;font-weight:650}.ch-summary-value{align-self:start;color:#1b2c47;font-size:25px;line-height:1.15}.ch-report-grid{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(280px,.85fr);gap:16px}.ch-report-panel{border:1px solid var(--ch-line);border-radius:16px;background:#fff}.ch-report-head{display:flex;justify-content:space-between;align-items:flex-start;gap:15px;padding:19px 21px;border-bottom:1px solid #edf0f5}.ch-report-head h2{margin:0;font-size:15px}.ch-report-head p{margin:5px 0 0;color:var(--ch-muted);font-size:11px}.ch-report-body{padding:21px}.ch-bar-row{display:grid;grid-template-columns:130px minmax(40px,1fr) 32px;align-items:center;gap:12px;margin:0 0 19px}.ch-bar-row:last-child{margin-bottom:0}.ch-bar-label{overflow:hidden;color:#45536a;font-size:12px;text-overflow:ellipsis;white-space:nowrap}.ch-bar-track{height:9px;overflow:hidden;border-radius:99px;background:#f0f2f7}.ch-bar{height:100%;min-width:0;border-radius:inherit;background:linear-gradient(90deg,#4a73d9,#7897ec);transition:width .25s}.ch-bar-row:nth-child(2) .ch-bar{background:linear-gradient(90deg,#876dd2,#b19de8)}.ch-bar-row:nth-child(3) .ch-bar{background:linear-gradient(90deg,#d69635,#efbd6b)}.ch-bar-row:nth-child(4) .ch-bar{background:linear-gradient(90deg,#3d9a70,#74c69d)}.ch-bar-count{color:#263750;font-size:12px;font-weight:750;text-align:right}.ch-export-list{display:grid;gap:10px;padding:17px}.ch-export-button{display:flex;align-items:center;gap:12px;width:100%;padding:13px;border:1px solid #e9edf4;border-radius:12px;background:#fff;color:#34445f;text-align:left;cursor:pointer;transition:border-color .15s,background .15s}.ch-export-button:hover{border-color:#bdcafa;background:#f9faff}.ch-export-icon{display:grid;place-items:center;width:35px;height:35px;border-radius:10px;background:#edf2ff;color:#416bd0}.ch-export-copy{display:flex;flex:1;flex-direction:column;gap:3px}.ch-export-copy strong{font-size:12px}.ch-export-copy span{color:#8590a2;font-size:10px}.ch-export-button>svg:last-child{color:#8793a5}.ch-note{display:flex;align-items:flex-start;gap:9px;margin-top:15px;padding:12px 14px;border:1px solid #e9edf4;border-radius:11px;background:#fafbfe;color:#6c7a90;font-size:11px;line-height:1.55}.ch-note svg{flex:0 0 auto;margin-top:1px;color:#6180c7}
@media(max-width:1000px){.ch-summary-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.ch-report-grid{grid-template-columns:1fr}}@media(max-width:620px){.ch-page{padding:26px 15px 40px}.ch-page-header{align-items:flex-start;flex-direction:column}.ch-page h1{font-size:26px}.ch-summary-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.ch-summary-card{min-height:91px;padding:12px;column-gap:9px}.ch-summary-value{font-size:22px}.ch-summary-label{font-size:10px}.ch-report-head{padding:17px}.ch-report-body{padding:18px 14px}.ch-bar-row{grid-template-columns:95px minmax(25px,1fr) 23px;gap:8px}.ch-bar-label,.ch-bar-count{font-size:10px}}
`;

export default function Reports() {
  const { contacts } = useContacts();
  const summary = getReportSummary(contacts);
  const maxCount = Math.max(1, ...summary.categories.map(({ count }) => count));

  return (
    <main className="ch-page">
      <style>{styles}</style>
      <header className="ch-page-header">
        <div>
          <p className="ch-eyebrow">Insights</p>
          <h1>Contact reports</h1>
          <p className="ch-lede">A clear snapshot of your contact directory.</p>
        </div>
        <span className="ch-period">Live directory summary</span>
      </header>

      <ReportSummary summary={summary} />

      <div className="ch-report-grid">
        <section className="ch-report-panel" aria-labelledby="category-breakdown-heading">
          <header className="ch-report-head">
            <div>
              <h2 id="category-breakdown-heading">Contacts by category</h2>
              <p>Distribution across the four relationship groups</p>
            </div>
            <TrendingUp size={18} color="#6682c4" aria-hidden="true" />
          </header>
          <div className="ch-report-body">
            {summary.categories.map(({ name, count }) => (
              <div className="ch-bar-row" key={name}>
                <span className="ch-bar-label">{name}</span>
                <div className="ch-bar-track" role="img" aria-label={`${name}: ${count} contacts`}>
                  <div className="ch-bar" style={{ width: `${(count / maxCount) * 100}%` }} />
                </div>
                <span className="ch-bar-count">{count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ch-report-panel" aria-labelledby="export-heading">
          <header className="ch-report-head">
            <div>
              <h2 id="export-heading">Export reports</h2>
              <p>Download a CSV file for your records</p>
            </div>
          </header>
          <div className="ch-export-list">
            <button className="ch-export-button" type="button" onClick={() => exportReportSummaryCSV(summary)}>
              <span className="ch-export-icon"><FileSpreadsheet size={18} /></span>
              <span className="ch-export-copy"><strong>Summary report</strong><span>Total and category counts</span></span>
              <Download size={16} aria-hidden="true" />
            </button>
            <button className="ch-export-button" type="button" onClick={() => exportCategoriesCSV(contacts)}>
              <span className="ch-export-icon"><FileSpreadsheet size={18} /></span>
              <span className="ch-export-copy"><strong>Category details</strong><span>Descriptions and contact totals</span></span>
              <Download size={16} aria-hidden="true" />
            </button>
            <button className="ch-export-button" type="button" onClick={() => exportContactsCSV(contacts)}>
              <span className="ch-export-icon"><FileSpreadsheet size={18} /></span>
              <span className="ch-export-copy"><strong>Contact list</strong><span>Contact details and categories</span></span>
              <Download size={16} aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
      <div className="ch-note"><TrendingUp size={15} aria-hidden="true" />These totals are calculated from the shared contact list.</div>
    </main>
  );
}
