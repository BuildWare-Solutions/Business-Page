import {FASTElement, html, css, when} from "@microsoft/fast-element";
import {adoptBwBtnStyles} from "./bw-btn-styles.js";

const template = html`
    <article class="card" part="card">
        <div class="media" part="media">
            <div class="mediaFrame" part="media-frame">
                <img class="img" src="${x => x.imgSrc}" alt="${x => x.imgAlt || ""}" loading="lazy"/>
            </div>
        </div>
        <div class="content" part="content">
            ${when(x => !!x.subtitle, html`
                <div class="subtitle" part="subtitle">${x => x.subtitle}</div>`)}
            ${when(x => !!x.title, html`<h3 class="title" part="title">${x => x.title}</h3>`)}
            ${when(x => !!x.description, html`<p class="desc" part="description">${x => x.description}</p>`)}
            ${when(
                    x => !!x.buttonLabel && !!x.targetId,
                    html`
                        <button class="bw-btn" part="button" @click="${(x, c) => x._onNavigate(c.event)}">
                            ${x => x.buttonLabel}
                        </button>
                    `
            )}
        </div>
    </article>
`;

const styles = css`
    :host {
        display: block;
    }

    .card {
        background: var(--bw-white);
        border-radius: var(--bw-radius);
        box-shadow: var(--bw-shadow-soft);
        border: var(--bw-border);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .media {
        background: var(--bw-white);
        padding: 14px 14px 0 14px;
    }

    .mediaFrame {
        width: 100%;
        aspect-ratio: 1/1; /* square by default */
        background: var(--bw-white);
        border: var(--bw-border);
        border-radius: calc(var(--bw-radius) - 10px);
        overflow: hidden;

        position: relative;
    }

    .img {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;

        /* optional but fine to keep */
        object-fit: contain;
        object-position: center;
    }

    .content {
        padding: 12px 14px 14px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1 1 auto;
    }

    .content > .bw-btn {
        margin-top: auto;
        align-self: center;
    }

    .subtitle {
        font-size: 12px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: rgba(20, 20, 20, 0.55);
        font-weight: 650;
    }

    .title {
        text-align: center;
        margin: 0;
        font-size: 16px;
        line-height: 1.25;
        font-weight: 700;
        color: var(--bw-text);
    }

    .desc {
        margin: 0;
        color: var(--bw-subtext);
        line-height: 1.5;
        font-size: 14px;
        flex: 0 0 auto;
        text-indent: 1.6rem;
    }

    @media (max-width: 720px) {
        .content {
            padding: 12px 12px 14px 12px;
        }

        .media {
            padding: 12px 12px 0 12px;
        }
    }
`;

export class BwCard extends FASTElement {
    constructor() {
        super();
        this.imgSrc = "";
        this.imgAlt = "";
        this.title = "";
        this.subtitle = "";
        this.description = "";
        this.buttonLabel = "";
        this.targetId = "";
    }

    connectedCallback() {
        super.connectedCallback();
        adoptBwBtnStyles(this.shadowRoot); // now .bw-btn inside shadow gets styled
    }

    _onNavigate(evt) {
        // FAST calls preventDefault() on event handlers by default.
        // We want normal behavior, so opt out.
        evt?.stopPropagation?.();

        if (!this.targetId) return true;

        this.dispatchEvent(new CustomEvent("navigate", {
            detail: {targetId: this.targetId},
            bubbles: true,
            composed: true
        }));
        return true; // opt-out of FAST's default preventDefault
    }
}

BwCard.define({
    name: "bw-card",
    template,
    styles,
    attributes: [
        {attribute: "img-src", property: "imgSrc"},
        {attribute: "img-alt", property: "imgAlt"},
        {attribute: "title", property: "title"},
        {attribute: "subtitle", property: "subtitle"},
        {attribute: "description", property: "description"},
        {attribute: "button-label", property: "buttonLabel"},
        {attribute: "target-id", property: "targetId"}
    ],
});
