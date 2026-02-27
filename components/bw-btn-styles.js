const BW_BTN_CSS = `
.bw-btn {
    /* prevent "full-width" stretching inside a flex column */
    display: inline-flex;
    width: fit-content; /* breaks flex "stretch" without align-self */
    max-width: 100%;
    min-width: 140px;
    justify-content: center;
    align-items: center;

    appearance: none;

    background: var(--bw-muted-black);
    color: var(--bw-white);

    /* keep border always present so hover doesn't "jump" layout */
    border: 1px solid var(--bw-muted-black);
    border-radius: 20px;

    padding: 4px 12px;
    font: inherit;
    font-weight: 650;
    cursor: pointer;

    /* subtle button shadow */
    box-shadow: 0 2px 8px rgba(var(--bw-muted-black-components), 0.14);

    transition: transform 120ms ease,
    background-color 120ms ease,
    color 120ms ease,
    box-shadow 120ms ease;
}

/* hover: white background, black border, black text */
.bw-btn:hover {
    background: var(--bw-white);
    color: var(--bw-muted-black);
}

/* pressed: light gray background, keep black border + text, subtle "press" */
.bw-btn:active {
    background: var(--bw-gray);
    color: var(--bw-muted-black);
    transform: translateY(1px);
    box-shadow: 0 1px 4px rgba(var(--bw-muted-black-components), 0.12);
}

/* keyboard accessibility (optional but recommended) */
.bw-btn:focus-visible {
    outline: 2px solid var(--bw-muted-black);
    outline-offset: 2px;
}
`
let _sheet = null;

function getSheet(){
    if (_sheet) return _sheet;
    _sheet = new CSSStyleSheet();
    _sheet.replaceSync(BW_BTN_CSS);
    return _sheet;
}

export function adoptBwBtnStyles(target /* Document | ShadowRoot */){
    // Preferred: constructable stylesheets
    if ("adoptedStyleSheets" in target) {
        const sheet = getSheet();
        const list = target.adoptedStyleSheets;
        if (!list.includes(sheet)) target.adoptedStyleSheets = [...list, sheet];
        return;
    }

    // Fallback: <style> injection
    const style = document.createElement("style");
    style.textContent = BW_BTN_CSS;
    (target.head ?? target).appendChild(style);
}