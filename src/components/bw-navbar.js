import {FASTElement, html, css} from "@microsoft/fast-element";

// the "part" part, allows external CSS to style internal elements in here.
// otherwise, the shadow DOM would prevent that
// like:
// bw-navbar::part(nav) {
//     background: red;
// }


// Slots allow external content injection into Shadow DOM.
// Without slots, the component would render fixed content only.
// Slots creates projection points of external components into the shadow DOM.
const template = html`
    <header class="nav" part="nav">
        <div class="container">
            <div class="brand" part="brand">
                <slot name="brand"></slot>
            </div>
            <nav class="links" part="links" aria-label="Primary">
                <slot name="links"></slot>
            </nav>
        </div>
    </header>
`;

const styles = css`
    :host {
        position: sticky;
        top: 0;
        z-index: 50;
        display: block; /* behaves like a div */
    }

    .nav {
        height: var(--bw-nav-h);
        background: var(--bw-white);
        border-bottom: var(--bw-border);
    }

    .container {
        height: 100%;
        max-width: var(--bw-max-internal-containers-width);
        margin: 0 auto;
        padding: 0 20px; /* horizontal padding */
        display: flex;
        align-items: center; /* vertically centers them */
        justify-content: space-between; /* pushes components left and right */
        gap: 16px;
    }

    .brand {
        display: flex;
        align-items: center;
        height: 100%;
    }
    /* Select the slot inside the brand classed div and then the children img from that slotted in */
    .brand > slot::slotted(img) { /* as outside components are projected into the slot, addressing those external components with ::slotted */
        height: calc(var(--bw-nav-h) * 0.8);
        width: auto;
        max-width: 100%;
        display: block;
    }

    .links {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    @media (max-width: 720px) {
        /* mobile breakpoint */
        .container {
            padding: 10px 14px; /* no more height of var(--bw-nav-h), so add some vertical padding */
            height: auto; /* no more height of var(--bw-nav-h), use as much height as needed */
            align-items: center;
            flex-direction: column;
            justify-content: center;
        }

        .nav {
            height: auto; /* no more height of var(--bw-nav-h), use as much height as needed */
        }
    }
`;

export class BwNavbar extends FASTElement {
}

BwNavbar.define({
    name: "bw-navbar",
    template,
    styles,
});
