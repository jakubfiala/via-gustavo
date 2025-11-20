import { checkpoints } from "./checkpoints";
import { START_POSITION } from "./constants";

const view = document.getElementById('demo-view');
const partDisplay = document.getElementById('demo-part');
const previous = document.getElementById('demo-previous');
const next = document.getElementById('demo-next');

let current = 0;

export const parts = [
    {
        name: "Intro",
        position: START_POSITION,
    },
    {
        name: "Localised Sounds & Psychedelics",
        position: {
            lat: -20.43569, lng: -69.54528,
        },
    },
    {
        name: "Wayfinding",
        position: {
            lat: -20.34115, lng: -69.65655,
        },
    },
    {
        name: "Interactive Items",
        position: {
            lat: -20.32535, lng: -69.73902,
        },
    },
    {
        name: "The Drone",
        position: {
            lat: -20.30709, lng: -69.76857,
        },
    },
    {
        name: "In-world Links",
        position: {
            lat: -20.26119, lng: -69.78575,
        },
    },
    {
        name: "Interactive Tasks",
        position: {
            lat: -20.22341, lng: -69.78831,
        },
    },
    {
        name: "A Nice View",
        position: {
            lat: -20.20583, lng: -69.79633,
        },
    },
    {
        name: "Finale",
        position: {
            lat: -20.42815, lng: -69.70565,
        },
    },
];

const update = (G) => {
    const part = parts.at(current);
    if (!part) return;

    partDisplay.innerText = `${current + 1}/${parts.length}: ${part.name}`;
    checkpoints.forEach((checkpoint) => checkpoint.passed = false);
    G.map.setPosition(part.position);
}

export const previousPart = (G) => {
    current = (current - 1) % parts.length;
    update(G);
    return parts[current];
}

export const nextPart = (G) => {
    current = (current + 1) % parts.length;
    update(G);
    return parts[current];
}

export const initDemo = (G) => {
    console.info('[demo]', 'initialising demo');
    view.hidden = false;

    previous.addEventListener('click', () => previousPart(G));
    next.addEventListener('click', () => nextPart(G));
};