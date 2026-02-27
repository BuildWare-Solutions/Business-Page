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
        description: "API/SDK-driven middleware that connects modern and legacy platforms, turning events into governed workflows and safe command/control.",
        img: "../assets/domain-systems-bridging-and-control-mini.png",
        targetId: "domain-systems"
    },
    {
        title: "Peripheral Interconnection",
        subtitle: "Domain B",
        description: "Edge gateways that onboard specialised devices by translating protocols—and when needed, physical signalling—so non-native peripherals appear as native  controlled endpoints.",
        img: "../assets/domain-peripheral-interconnection-mini.png",
        targetId: "domain-peripheral"
    },
    {
        title: "Configuration, Estimation & Aided Design Tools",
        subtitle: "Domain C",
        description: "Lifecycle engineering tools that guide configuration and enforce constraints from pre-quote to commissioning.",
        img: "../assets/domain-estimators-service-mini.png",
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
                title: "Custom Behavior Layer",
                subtitle: "API/SDK Extensions",
                img: "../assets/A.1.2-mini.png",
                body: {paragraphs: ["Add an API/SDK control layer that turns platform events into governed workflows, capturing critical data and enforcing compliant actions beyond default logic."]},
                operating_layer: {paragraphs: ["API/SDK interface tier-integrating directly with vendor-supported endpoints, events, and control surfaces."]},
                typical_outcomes: {bullets: ["Workflow automation", "Rule enforcement", "Data extraction", "Operator tooling aligned to regulated processes"]},
                deliverables: {bullets: ["Integration modules", "Business-logic layer", "Optional lightweight GUI", "Audit logs", "Documentation"]}
            },
            {
                title: "Legacy Modernization Bridge",
                subtitle: "New - Legacy",
                img: "../assets/A2.2-mini.png",
                body: {paragraphs: ["Extend the life of legacy assets while enabling modern platform rollouts, avoiding rip-and-replace cost and disruption."]},
                operating_layer: {paragraphs: ["Middleware bridge between the modern platform and legacy estate, API-API where available or DB-API where legacy integration is schema-led (including analysis / reverse engineering when required)."]},
                typical_outcomes: {bullets: ["Unified operational control", "Staged migration", "Continuity without downtime"]},
                deliverables: {bullets: ["Middleware service", "Adapters/connectors", "Mapping & translation layer", "Validation suite", "Deployment and handover package"]}
            },
            {
                title: "Cross-Platform Integration",
                subtitle: "System-System | System-Enterprise Platform",
                img: "../assets/A3.2-mini.png",
                body: {paragraphs: ["Enable controlled interoperability between platforms-across disciplines or into enterprise workflow systems."]},
                operating_layer: {paragraphs: ["API-API integration layer with explicit contracts for data exchange, command/control, safety constraints, and failure handling."]},
                typical_outcomes: {bullets: ["Cross-system optimisation (e.g., occupancy-driven HVAC)", "Compliance-enabling automation", "Operational visibility"]},
                deliverables: {bullets: ["Integration service", "Canonical data model", "Policy/constraint layer (fail-safe behaviour)", "Observability and audit logs."]}
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
                subtitle: "Same physical layer, different protocol",
                img: "../assets/B.1.2-mini.png",
                body: {paragraphs: ["Integrate specialized peripherals through protocol-to-protocol translation over a shared physical interface (network/BUS)."]},
                operating_layer: {paragraphs: ["Inline gateway presenting the peripheral as a native device via packet translation, payloads normalization and command/event mapping over interfaces like RS-485/IP/CAN/SPI/RS-232."]},
                typical_outcomes: {bullets: ["Enable mission-critical peripherals (e.g., advanced biometrics) without core platform replacement", "Onboard industry-specific automation (robots, conveyors, specialised sensors) as native inputs to support optimisation and compliance workflows"]},
                deliverables: {bullets: ["Protocol analysis report", "Gateway firmware", "Test vectors", "Point/command mapping", "Integration and commissioning guide"]}
            },
            {
                title: "Signal & Protocol Gateway ",
                subtitle: "Different physical & protocol layer",
                img: "../assets/B.2.2-mini.png",
                body: {paragraphs: ["Integrate specialised peripherals by translating both physical signalling and protocols (using reverse engineering where required) to bridge otherwise incompatible interfaces."]},
                operating_layer: {paragraphs: ["Edge gateway performing signal conversion and protocol translation to present the device as a native endpoint."]},
                typical_outcomes: {paragraphs: ["Integration of non-standard or high-value devices within a controlled, supportable architecture."]},
                deliverables: {bullets: ["Physical layer characterisation", "Hardware design (if required)", "Gateway firmware", "Validation test cases", "Point/command mapping", "Integration & commissioning guide"]}
            }
        ]
    },
    {
        id: "domain-config",
        sectionTitle: "Configuration, Estimation & Aided Design Tools",
        muted: true,
        blocks: [
            {
                title: "Configurators & Estimation Tools",
                subtitle: "Solution engineering enablement",
                img: "../assets/C.1-mini.png",
                body: {paragraphs: ["Enable high-confidence solution engineering by making complex systems clear. Guiding configuration and validating constraints from pre-quote through commissioning and change."]},
                operating_layer: {paragraphs: ["Lifecycle engineering toolset used from early estimation and quote development through commissioning and ongoing modifications, maintaining a validated model of the solution and generating configuration/BOQ outputs as the project evolves."]},
                typical_outcomes: {
                    bullets: ["Improve design accuracy and cost control through guided configuration and clear solution visibility",
                        "Prevent expensive rework by exposing constraints and design errors early—before procurement and commissioning",
                        "Accelerate commissioning and reduce variation risk with validated configurations and predictable system behavior",
                        "Simplify later changes by re-validating impact against the maintained solution model"]
                },
                deliverables: {bullets: ["Configurator GUI", "Rules/constraints engine", "BOQ/topology outputs", "Validation reports", "Training & handover"]}
            }
        ]
    }
];

const INDUSTRIES = [
    {
        title: "Pharmaceutical & life sciences (clean rooms, validated processes)",
        img: "../assets/industries/pharma.png"
    },
    {title: "Data centers & critical commercial facilities", img: "../assets/industries/datacenter.png"},
    {title: "Healthcare & hospital campuses", img: "../assets/industries/hospital.png"},
    {title: "Airports & transport infrastructure", img: "../assets/industries/airport.png"},
    {
        title: "Financial services & regulated enterprises (auditability, controlled workflows)",
        img: "../assets/industries/financial.png"
    },
    {title: "Security-sensitive enterprise environments", img: "../assets/industries/security.png"},
    {title: "Industrial sites with strict compliance workflows", img: "../assets/industries/industrial.png"},
    {title: "Large commercial real estate & multi-site campuses", img: "../assets/industries/commercial.png"},
    {title: "Manufacturing & logistics facilities", img: "../assets/industries/logistic.png"},
    {title: "Retail and distribution complexes", img: "../assets/industries/retail.png"},
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
                    <p>Our vision is building technology that feels effortless by turning siloed systems into an
                        interoperable ecosystem.</p>
                    <p>We partner with systems integrators and vendors to deliver API/SDK extensions, integration
                        middleware, and protocol gateways for enterprise and mission-critical environments.</p>
                    <ul>
                        <li>Unify control across new & legacy systems</li>
                        <li>Integrate required peripherals when vendor support falls short</li>
                        <li>Automate building operations to align with enterprise governance and compliance workflows
                        </li>
                    </ul>
                </div>
            </bw-feature>
        </section>

        <!-- OUR SERVICES: INTRO -->
        <section id="services-intro">
            <bw-feature
                    large-title="Our services"
                    medium-title="Turning “effortless” into reality starts with bridging the right layer.">
                <div slot="body">
                    <p>Depending on where the constraint sits (API/SDK, middleware, database, or protocol) we deliver
                        API/SDK extensions, integration middleware, and protocol gateways for enterprise and
                        mission-critical environments.</p>
                    <p> Our capabilities are grouped into three domains covering integration from platform logic to edge
                        devices and specialized design tooling.</p>
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
                                        ${repeat(b => b.body?.paragraphs || [], html`<p slot="body">${p => p}</p>`)}
                                        ${when(
                                                b => Array.isArray(b.body?.bullets) && b.body?.bullets.length > 0,
                                                html`
                                                    <ul slot="body">
                                                        ${repeat(b => b.body.bullets, html`
                                                            <li>${x => x}</li>`)}
                                                    </ul>
                                                `
                                        )}

                                        ${repeat(b => b.operating_layer?.paragraphs || [], html`<p
                                                slot="operating-layer">${p => p}</p>`)}
                                        ${when(
                                                b => Array.isArray(b.operating_layer?.bullets) && b.operating_layer?.bullets.length > 0,
                                                html`
                                                    <ul slot="operating-layer">
                                                        ${repeat(b => b.operating_layer.bullets, html`
                                                            <li>${x => x}</li>`)}
                                                    </ul>
                                                `
                                        )}

                                        ${repeat(b => b.typical_outcomes?.paragraphs || [], html`<p
                                                slot="typical-outcomes">${p => p}</p>`)}
                                        ${when(
                                                b => Array.isArray(b.typical_outcomes?.bullets) && b.typical_outcomes?.bullets.length > 0,
                                                html`
                                                    <ul slot="typical-outcomes">
                                                        ${repeat(b => b.typical_outcomes.bullets, html`
                                                            <li>${x => x}</li>`)}
                                                    </ul>
                                                `
                                        )}

                                        ${repeat(b => b.deliverables?.paragraphs || [], html`<p slot="deliverables">
                                            ${p => p}</p>`)}
                                        ${when(
                                                b => Array.isArray(b.deliverables?.bullets) && b.deliverables?.bullets.length > 0,
                                                html`
                                                    <ul slot="deliverables">
                                                        ${repeat(b => b.deliverables.bullets, html`
                                                            <li>${x => x}</li>`)}
                                                    </ul>
                                                `
                                        )}

                                    </bw-feature>
                                `
                        )}
                    </section>
                `
        )}

        <!-- WHO WE SUPPORT -->
        <section class="section" id="support-intro">
            <bw-feature
                    img-src="../assets/industries/selection.png"
                    img-alt="Industries overview"
                    large-title="Who we support"
                    medium-title="Built for operations where compliance is demanding and downtime is costly"
                    compact
                    image-right
            >
            </bw-feature>

            <bw-card-grid cols="4">
                ${repeat(
                        () => INDUSTRIES,
                        html`
                            <bw-card
                                    img-src="${i => i.img}"
                                    img-alt="${i => i.title}"
                                    title="${i => i.title}"
                            ></bw-card>
                        `
                )}
            </bw-card-grid>
        </section>

        <!-- TECHNICAL SCOPING & DISCOVERY / CONTACT -->
        <section id="contact">
            <bw-feature
                    img-src="../assets/Technical_Scoping.png"
                    img-alt="Technical scoping illustration"
                    large-title="Technical Scoping & Discovery"
                    medium-title="Bring us the workflow. We’ll scope the integration."
                    image-right
                    muted-bg
            >
                <p slot="body"> Enterprise building ecosystems require careful scoping before integration begins.</p>
                <p slot="body">In a technical scoping session we:</p>
                <ul slot="body">
                    <li>review the operational workflow</li>
                    <li>assess interfaces and constraints across the stack</li>
                    <li>identify likely failure modes before anything is built</li>
                    <li>select the right layer (API/SDK, middleware, database, protocol, or physical)</li>
                    <li>define a safe, supportable path to delivery</li>
                </ul>

                <div class="contact-box">
                    <div class="contact-title">Contact</div>
                    <p class="contact-line">Email: <span class="mono">hello@buildwaresolutions.example</span></p>
                    <p class="contact-line">Location: Australia (remote-first)</p>
                </div>

                <a
                        class="bw-btn"
                        slot="body"
                        href="https://forms.gle/axJaKkUYp9Mv3DpM8"
                        target="_blank"
                        rel="noopener noreferrer"
                >Book a Technical Scoping Meeting
                </a>
            </bw-feature>
        </section>

        <footer class="footer">
            <div>
                <span>© ${() => new Date().getFullYear()} BuildWare Solutions</span>
            </div>
        </footer>
    </main>`;

const styles = css`
    .page {
        display: block;
    }

    .bw-btn {
        text-decoration: none;
    }
`;

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

        // Measure the current rendered navbar height (works even when it grows on mobile)
        const nav = root.querySelector("bw-navbar");
        const navH = nav ? nav.getBoundingClientRect().height : 0;

        // Scroll so the section top lands right under the navbar
        const y = el.getBoundingClientRect().top + window.scrollY - navH ;

        window.scrollTo({top: Math.max(0, y), behavior: "smooth"});
        history.replaceState(null, "", `#${targetId}`);
        return true;
    }
}

BwApp.define({
    name: "bw-app",
    template,
    styles,
    shadowOptions: null
});