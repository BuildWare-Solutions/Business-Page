import {FASTElement, html, css, repeat, when} from "@microsoft/fast-element";
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

// Each domain contains multiple reusable BwFeature blocks (alternating image placement)
const DOMAINS = [
    {
        id: "domain-systems",
        sectionTitle: "Systems Bridging & Control",
        muted: true,
        blocks: [
            {
                title: "Custom Adapter Layer",
                subtitle: "API/SDK extensions",
                img: "./assets/domain-adapter.svg",
                body: {
                    paragraphs: [
                        "Extend or wrap existing interfaces with a supportable adapter layer.",
                        "We isolate vendor quirks, normalize data, and provide a clean integration surface."
                    ]
                },
                operating_layer: {},
                typical_outcomes: {},
                deliverables: {bullets: ["Version-safe integration", "Clear ownership boundaries", "Controlled failure modes"]}
            },
            {
                title: "Legacy Modernisation Bridge",
                subtitle: "near → target",
                img: "./assets/domain-legacy.svg",
                paragraphs: [
                    "Upgrade ageing workflows without ripping out the whole stack.",
                    "We bridge legacy protocols and data structures into a modern control plane."
                ],
                bullets: ["Incremental migration", "Auditability & logging", "Minimise downtime risk"]
            },
            {
                title: "Cross‑Platform Integration",
                subtitle: "system ↔ integration platform",
                img: "./assets/domain-platform.svg",
                paragraphs: [
                    "Connect building ecosystems to integration platforms using well-defined contracts.",
                    "We design safe coupling points for data and control across environments."
                ],
                bullets: ["Contract-driven interfaces", "Back-pressure & retries", "Operational monitoring"]
            }
        ]
    },
    {
        id: "domain-peripheral",
        sectionTitle: "Peripheral Interconnection",
        muted: false,
        blocks: [
            {
                title: "Protocol Gateway",
                subtitle: "same physical layer, different protocol",
                img: "./assets/domain-gateway.svg",
                paragraphs: [
                    "Translate between protocols while keeping the physical interface stable.",
                    "Ideal for integrating specialist devices that don’t speak your main stack’s language."
                ],
                bullets: ["Deterministic translation", "Health checks & diagnostics", "Field-friendly deployment"]
            },
            {
                title: "Device Adapter",
                subtitle: "peripheral → normalized interface",
                img: "./assets/domain-device.svg",
                paragraphs: [
                    "Standardise peripheral behaviours into a consistent API or message contract.",
                    "We handle timing, retries, and edge cases so your core system stays clean."
                ],
                bullets: ["Testable boundaries", "Operational telemetry", "Graceful degradation"]
            }
        ]
    },
    {
        id: "domain-config",
        sectionTitle: "Configuration, Estimation & Aided Design Tools",
        muted: true,
        blocks: [
            {
                title: "Configurator & Estimation Tools",
                subtitle: "solution engineering enablement",
                img: "./assets/domain-estimator.svg",
                paragraphs: [
                    "Enable high-confidence solution engineering by making complex systems clear.",
                    "Guide configuration, validate constraints, and generate BOQ/topology outputs."
                ],
                bullets: ["Improve design accuracy", "Prevent expensive rework", "Faster commissioning"]
            }
        ]
    }
];

const DOMAINS_VIEW = DOMAINS.map(d => ({
    ...d,
    blocks: d.blocks.map((b, i) => ({
        ...b,
        muted: d.muted,              // carry parent muted down
        imageRight: i % 2 === 1      // compute alternation here (no c.index needed)
    }))
}));

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

        <!-- SERVICE DOMAINS -->
        ${repeat(
                () => DOMAINS_VIEW,
                html`
                    <section id="${d => d.id}">
                        <bw-feature medium-title=${d => d.sectionTitle} muted-bg=${d => d.muted}>
                        </bw-feature>
                        ${repeat(
                                d => d.blocks,
                                html`
                                    <bw-feature
                                            img-src="${b => b.img}"
                                            img-alt="${b => b.title}"
                                            medium-title="${b => b.title}"
                                            subtitle="${b => b.subtitle}"
                                            ?image-right=${b => b.imageRight}
                                            muted-bg=${b => b.muted}
                                    >
                                        <div slot="body">
                                            ${repeat(b => b.body?.paragraphs || [], html`<p>${p => p}</p>`)}
                                            ${when(
                                                    b => Array.isArray(b.body?.bullets) && b.body?.bullets.length > 0,
                                                    html`
                                                        <ul>
                                                            ${repeat(b => b.body.bullets, html`
                                                                <li>${x => x}</li>`)}
                                                        </ul>
                                                    `
                                            )}
                                        </div>
                                        <div slot="operating-layer">
                                            ${repeat(b => b.operating_layer?.paragraphs || [], html`<p>${p => p}</p>`)}
                                            ${when(
                                                    b => Array.isArray(b.operating_layer?.bullets) && b.operating_layer?.bullets.length > 0,
                                                    html`
                                                        <ul>
                                                            ${repeat(b => b.operating_layer.bullets, html`
                                                                <li>${x => x}</li>`)}
                                                        </ul>
                                                    `
                                            )}
                                        </div>
                                        <div slot="typical-outcomes">
                                            ${repeat(b => b.typical_outcomes?.paragraphs || [], html`<p>${p => p}</p>`)}
                                            ${when(
                                                    b => Array.isArray(b.typical_outcomes?.bullets) && b.typical_outcomes?.bullets.length > 0,
                                                    html`
                                                        <ul>
                                                            ${repeat(b => b.typical_outcomes.bullets, html`
                                                                <li>${x => x}</li>`)}
                                                        </ul>
                                                    `
                                            )}
                                        </div>
                                        <div slot="deliverables">
                                            ${repeat(b => b.deliverables?.paragraphs || [], html`<p>${p => p}</p>`)}
                                            ${when(
                                                    b => Array.isArray(b.deliverables?.bullets) && b.deliverables?.bullets.length > 0,
                                                    html`
                                                        <ul>
                                                            ${repeat(b => b.deliverables.bullets, html`
                                                                <li>${x => x}</li>`)}
                                                        </ul>
                                                    `
                                            )}
                                        </div>

                                    </bw-feature>
                                `
                        )}
                    </section>
                `
        )}
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