import { CARD_STEPS } from "@/lib/nnx/constants";

export function Marketplace() {
  return (
    <section className="sblock" data-s="market" aria-labelledby="market-title">
      <h2 className="sec-lbl" id="market-title">
        // marketplace
      </h2>

      <article className="card ace-card" aria-labelledby="ace-title">
        <p className="ace-plan-label">1) Plan — ACE</p>
        <div className="ace-grid">
          <div className="ace-big" aria-hidden="true">
            A
          </div>
          <h3 className="ace-title" id="ace-title">
            ACE
          </h3>
          <dl className="ace-rows">
            <div className="ace-row">
              <dt className="ace-row-key">A</dt>
              <dd className="ace-row-val">
                <strong>Advanced</strong> Web — solusi teknis tingkat lanjut
              </dd>
            </div>
            <div className="ace-row">
              <dt className="ace-row-key">C</dt>
              <dd className="ace-row-val">
                <strong>Custom</strong> Web — dibangun khusus untukmu
              </dd>
            </div>
            <div className="ace-row">
              <dt className="ace-row-key">E</dt>
              <dd className="ace-row-val">
                <strong>Experience</strong> Web — desain yang dirasakan
              </dd>
            </div>
          </dl>
        </div>
      </article>

      <article className="card card-flow" aria-labelledby="card-title">
        <p className="cf-label">2) Workflow — CARD</p>
        <div className="cf-grid">
          <div className="cf-big" aria-hidden="true">
            C
          </div>
          <h3 className="cf-title" id="card-title">
            CARD
          </h3>
        </div>
        <ol className="cf-steps">
          {CARD_STEPS.map((s) => (
            <li className="cf-step" key={s.l}>
              <span className="cf-step-letter" aria-hidden="true">
                {s.l}
              </span>
              <div className="cf-step-body">
                <p className="cf-step-name">{s.n}</p>
                <p className="cf-step-desc">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </article>
    </section>
  );
}
