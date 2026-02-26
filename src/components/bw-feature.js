import {FASTElement, html, css, when} from "@microsoft/fast-element";

const template = html`
    <div class="color-container ${x => x.mutedBg ? "muted-background" : ""}">
        <div class="container ${x => x.imgSrc ? "has-media" : "no-media"} ${x => x.compact ? "compact" : ""} ${x => x.imageRight ? "right" : "left"}">
            ${when(
                    x => !!x.imgSrc,
                    html`
                        <figure class="media" part="media">
                            <img class="img"
                                 src="${x => x.imgSrc}"
                                 alt="${x => x.imgAlt || ""}"
                                 loading="lazy"/>
                        </figure>
                    `
            )}
            <div class="content" part="content">
                ${when(x => !!x.largeTitle, html`<h1 class="h1" part="large-title">${x => x.largeTitle}</h1>`)}
                ${when(x => !!x.mediumTitle, html`<h2 class="h2" part="medium-title">${x => x.mediumTitle}</h2>`)}
                ${when(x => !!x.subTitle, html`<h3 class="h3" part="subtitle">${x => x.subTitle}</h3>`)}
                <div class="body" part="body">
                    <slot name="body"></slot>
                </div>
            </div>
        </div>
    </div>
`;

const styles = css`
    :host {
        display: block;
    }

    .color-container.muted-background {
        background: var(--bw-gray);
    }

    .container {
        max-width: var(--bw-max-internal-containers-width);
        margin: 0 auto;
        padding: 20px 20px;

        display: grid;
        gap: 22px;
        align-items: center;
    }

    /* Default: media + content */

    .container.has-media {
        grid-template-columns: var(--bw-feature-img-ratio-no) var(--bw-feature-content-ratio-no);
    }

    .container.has-media.right {
        grid-template-columns: var(--bw-feature-content-ratio-no) var(--bw-feature-img-ratio-no);
    }

    .container.has-media.right .media {
        order: 2;
    }

    .container.has-media.right .content {
        order: 1;
    }

    /* No image: full-width content */

    .container.no-media {
        grid-template-columns: 1fr;
    }

    /* Image card */

    .media {
        margin: 0;
        background: var(--bw-white);
        border-radius: var(--bw-radius);
        box-shadow: var(--bw-shadow-soft);
        border: var(--bw-border);
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: var(--bw-radius);
        object-fit: contain;
        max-height: var(--bw-feature-img-std-height);
    }

    /* Compact variant (used for "Who we support" intro) */

    .container.compact .img {
        max-height: calc(var(--bw-feature-img-std-height) * 0.5);
    }

    .content {
        min-width: 0;
    }

    .h1 {
        font-size: clamp(
                calc(28px * var(--bw-feature-type-scale) * var(--bw-feature-h1-scale)),
                calc(3.1vw * var(--bw-feature-type-scale) * var(--bw-feature-h1-scale)),
                calc(40px * var(--bw-feature-type-scale) * var(--bw-feature-h1-scale)));
        line-height: 1.08;
        letter-spacing: -0.01em;
        margin: 0 0 10px 0;
        font-weight: 720;
        color: var(--bw-text);
    }

    .h2 {
        font-size: clamp(
                calc(18px * var(--bw-feature-type-scale) * var(--bw-feature-h2-scale)),
                calc(2vw * var(--bw-feature-type-scale) * var(--bw-feature-h2-scale)),
                calc(22px * var(--bw-feature-type-scale) * var(--bw-feature-h2-scale))
        );
        line-height: 1.25;
        margin: 0 0 14px 0;
        color: var(--bw-subtext);
        font-weight: 650;
    }

    .h3 {
        font-size: clamp(
                calc(14px * var(--bw-feature-type-scale) * var(--bw-feature-h2-scale)),
                calc(1.5vw * var(--bw-feature-type-scale) * var(--bw-feature-h2-scale)),
                calc(18px * var(--bw-feature-type-scale) * var(--bw-feature-h2-scale))
        );
        line-height: 1.25;
        margin: 0 0 14px 0;
        color: var(--bw-subtext);
        font-weight: 650;
    }

    .body {
        color: var(--bw-subtext);
        font-size: clamp(
                calc(14px * var(--bw-feature-type-scale) * var(--bw-feature-body-scale)),
                calc(1.1vw * var(--bw-feature-type-scale) * var(--bw-feature-body-scale)),
                calc(16px * var(--bw-feature-type-scale) * var(--bw-feature-body-scale))
        );
        line-height: 1.6;

        text-align: justify;
        text-align-last: left;
        hyphens: auto;
    }

    .body ::slotted(*) {
        text-align: inherit;
    }

    .body ::slotted(p) {
        margin: 0 0 12px 0;
        text-indent: 1.6rem;
    }

    .body ::slotted(ul) {
        margin: 0;
        padding-left: 18px;
    }

    .body ::slotted(li) {
        margin: 6px 0;
    }

    @media (max-width: 720px) {
        .container.has-media,
        .container.has-media.right {
            grid-template-columns: 1fr;
        }

        .container.has-media.right .media {
            order: 0;
        }

        .media {
            padding: 12px;
        }

        .img {
            max-height: calc(var(--bw-feature-img-std-height) * 0.7);
        }
    }
`;

export class BwFeature extends FASTElement {
    constructor() {
        super();
        this.imgSrc = "";
        this.imgAlt = "";
        this.largeTitle = "";
        this.mediumTitle = "";
        this.subTitle = "";
        this.imageRight = false;
        this.compact = false;
        this.mutedBg = false;
    }
}

BwFeature.define({
    name: "bw-feature",
    template,
    styles,
    attributes: [
        {attribute: "img-src", property: "imgSrc"},
        {attribute: "img-alt", property: "imgAlt"},
        {attribute: "large-title", property: "largeTitle"},
        {attribute: "medium-title", property: "mediumTitle"},
        {attribute: "subtitle", property: "subTitle"},
        {attribute: "image-right", property: "imageRight", mode: "boolean"},
        {attribute: "compact", property: "compact", mode: "boolean"},
        {attribute: "muted-bg", property: "mutedBg", mode: "boolean"},
    ],
});
