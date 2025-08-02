const createSVG = (width, height, radius) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const rectangle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );

    svg.setAttributeNS(
        "http://www.w3.org/2000/svg",
        "viewBox",
        `0 0 ${width} ${height}`
    );

    rectangle.setAttribute("x", "0");
    rectangle.setAttribute("y", "0");
    rectangle.setAttribute("width", "100%");
    rectangle.setAttribute("height", "100%");
    rectangle.setAttribute("rx", `${radius}`);
    rectangle.setAttribute("ry", `${radius}`);
    rectangle.setAttribute("pathLength", "10");

    svg.appendChild(rectangle);

    return svg;
};

document.querySelectorAll(".card").forEach((card) => {
    const style = getComputedStyle(card);

    const lines = document.createElement("div");

    lines.classList.add("lines");

    const groupTop = document.createElement("div");
    const groupBottom = document.createElement("div");

    const svg = createSVG(
        card.offsetWidth,
        card.offsetHeight,
        parseInt(style.borderRadius, 10)
    );

    groupTop.appendChild(svg);
    groupTop.appendChild(svg.cloneNode(true));
    groupTop.appendChild(svg.cloneNode(true));
    groupTop.appendChild(svg.cloneNode(true));

    groupBottom.appendChild(svg.cloneNode(true));
    groupBottom.appendChild(svg.cloneNode(true));
    groupBottom.appendChild(svg.cloneNode(true));
    groupBottom.appendChild(svg.cloneNode(true));

    lines.appendChild(groupTop);
    lines.appendChild(groupBottom);

    card.appendChild(lines);

    card.addEventListener("pointerenter", () => {
        card.classList.add("start");
    });

    svg.addEventListener("animationend", () => {
        card.classList.remove("start");
    });
});
