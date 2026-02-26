import {FASTElement, html, css, repeat} from "@microsoft/fast-element";
import "./bw-navbar.js";
import "./bw-feature.js";
import "./bw-card-grid.js";
import "./bw-card.js"
import {adoptBwBtnStyles} from "./bw-btn-styles.js";

adoptBwBtnStyles(document);

const NAV = [
    {label: "Our services", targetId: "services-intro"},
    {label: "Who we support", targetId: "support-intro"},
    {label: "Contact", targetId: "contact"}
];

const SERVICE_CARDS = [
    {
        title: "Systems Bridging & Control",
        subtitle: "Domain A",
        description: "Bridge incompatible systems safely—API/SDK, middleware, DB, protocol, or physical layer.",
        img: "../assets/_A_systems_bridging_and_control-mini.png",
        targetId: "domain-systems"
    },
    {
        title: "Peripheral Interconnection",
        subtitle: "Domain B",
        description: "Integrate specialized peripherals via protocol gateways, adapters, and controlled interfaces.",
        img: "../assets/_B_peripheral_interconnection-mini.png",
        targetId: "domain-peripheral"
    },
    {
        title: "Configuration, Estimation & Aided Design Tools",
        subtitle: "Domain C",
        description: "Make complex systems clear—estimators, configurators, validation and BOQ outputs.",
        img: "../assets/_C_estimators_service-mini.png",
        targetId: "domain-config"
    }
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
                    muted-bg
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

        <!-- OUR SERVICES: INTRO -->
        <section id="services-intro">
            <bw-feature large-title="Our services">
                <div slot="body">
                    <p>
                        We integrate across the full stack: from device protocols and control networks,
                        through middleware and data, up to clean APIs and operational tooling.
                    </p>
                </div>
            </bw-feature>

            <bw-card-grid cols="3">
                ${repeat(
                        () => SERVICE_CARDS,
                        html`
                            <bw-card
                                    img-src="${s => s.img}"
                                    img-alt="${s => s.title}"
                                    title="${s => s.title}"
                                    description="${s => s.description}"
                                    button-label="Learn more"
                                    target-id="${s => s.targetId}"
                            ></bw-card>
                        `
                )}
            </bw-card-grid>
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
        const el = root.querySelector(`#${CSS.escape(targetId)}`);
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