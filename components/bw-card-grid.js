import { FASTElement, html, css } from "@microsoft/fast-element";

const template = html`
  <div class="grid" part="grid">
    <slot></slot>
  </div>
`;

const styles = css`
  :host {
    display: block;
    --cols: 3;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
    gap: 18px;
    align-items: stretch;

    max-width: var(--bw-max-internal-containers-width);
    margin: 0 auto;
    padding: 0 20px;
    padding-bottom: 20px;
  }

  @media (max-width: 980px) {
    .grid {
      gap: 14px;
    }
  }
  @media (max-width: 880px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 560px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

const numberConverter = {
  toView(value){ return String(value); },
  fromView(value){ return Number(value); }
};

export class BwCardGrid extends FASTElement{
  constructor(){
    super();
    this.cols = 3;
  }

  connectedCallback(){
    super.connectedCallback();
    this._applyCols();
  }

  colsChanged(){
    this._applyCols();
  }

  _applyCols(){
    const n = Number(this.cols);
    if (Number.isFinite(n) && n >= 1 && n <= 6){
      this.style.setProperty("--cols", String(n));
    }
  }
}

BwCardGrid.define({
  name: "bw-card-grid",
  template,
  styles,
  attributes: [
    { attribute: "cols", property: "cols", converter: numberConverter }
  ]
});
