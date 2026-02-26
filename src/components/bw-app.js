import {FASTElement, html, css, repeat, when} from "@microsoft/fast-element"
import "./bw-navbar.js";

const NAV = [
    {label: "Our services", targetId: "services-intro"},
    {label: "Who we support", targetId: "support-intro"},
    {label: "Contact", targetId: "contact"}
];

// TODO check and modify the template below
const template = html`
    <bw-navbar>
        <div slot="brand" class="brand">
            <span>BuildWare Solutions</span>
        </div>

        ${repeat(
                () => NAV,
                html`
                    <button slot="links" class="bw-btn" @click="${(link, c) => c.parent._scrollTo(link.targetId)}">
                        ${link => link.label}
                    </button>
                `
        )}
    </bw-navbar>`;

const styles = css``;

export class BwApp extends FASTElement {
    constructor() {
        super();

        this._onNavigate = (e) => {
            const targetId = e?.detail?.targetId;
            if (typeof targetId === "string" && targetId.length) {
                this._scrollTo(targetId);
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();

        // Handle navigation events bubbled from bw-card components.
        this.addEventListener("navigate", this._onNavigate);

        // Respect hash on load (e.g., /#domain-config)
        queueMicrotask(() => {
            const id = (location.hash || "").replace("#", "");
            if (id) this._scrollTo(id);
        });
    }

    disconnectedCallback() {
        this.removeEventListener("navigate", this._onNavigate);
        super.disconnectedCallback();
    }

    _scrollTo(targetId) {
        const root = this.shadowRoot || this; // content lives in the shadow root
        const el = root.getElementById(targetId);
        if (!el) return true;

        el.scrollIntoView({behavior: "smooth", block: "start"});
        history.replaceState(null, "", `#${targetId}`);
        return true; // opt-out of FAST default preventDefault
    }
}

BwApp.define({
    name: "bw-app",
    template,
    styles,
    shadowOptions: null
});