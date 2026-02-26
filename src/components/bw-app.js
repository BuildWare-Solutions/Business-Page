import {FASTElement, html, css, repeat} from "@microsoft/fast-element"
import "./bw-navbar.js";
import "./bw-feature.js";

const NAV = [
    {label: "Our services", targetId: "services-intro"},
    {label: "Who we support", targetId: "support-intro"},
    {label: "Contact", targetId: "contact"}
];

const template = html`
    <bw-navbar>
        <img slot="brand" src="../assets/logo_v2_mini.png" alt="BuildWare Solutions Logo"/>

        ${repeat(
                () => NAV,
                html`
                    <button slot="links" class="bw-btn" @click="${(link, c) => c.parent._scrollTo(link.targetId)}">
                        ${link => link.label}
                    </button>
                `
        )}
    </bw-navbar>

    <main class="page">
        <!-- HERO -->
        <section id="hero">
            <bw-feature
                    img-src="../assets/selected_hero_mini.png"
                    img-alt="Isometric diagram of integrated systems"
                    large-title="Integration Engineering"
                    medium-title="Enterprise and Mission Critical Building Automation"
                    image-right
            >
                <div slot="body">
                    <p>Bring us the workflow. We’ll scope the integration.</p>
                    <p>
                        Enterprise building ecosystems require careful scoping before integration begins.
                        We review the operational workflow, assess interfaces and constraints across the stack,
                        and identify likely failure modes—then select the right layer (API/SDK, middleware,
                        database, protocol, or physical) and define a safe, supportable path to delivery.
                    </p>
                </div>
            </bw-feature>
        </section>
    </main>`;

const styles = css`
    .page {
        display: block;
    }`;

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