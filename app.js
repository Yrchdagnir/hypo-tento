const flowNodes = [...document.querySelectorAll(".flow-node")];
const flowDetails = [...document.querySelectorAll(".flow-detail")];

flowNodes[0]?.classList.add("active");

flowNodes.forEach((node) => {
  node.addEventListener("click", () => {
    const detailId = node.dataset.detail;
    flowNodes.forEach((item) => item.classList.toggle("active", item === node));
    flowDetails.forEach((detail) => {
      detail.classList.toggle("open", detail.id === detailId);
    });
  });
});

const filters = [...document.querySelectorAll(".filter")];
const workItems = [...document.querySelectorAll(".work-item")];

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.toggle("active", item === filter));
    const selected = filter.dataset.filter;

    workItems.forEach((item) => {
      item.hidden = selected !== "all" && item.dataset.scope !== selected;
    });
  });
});

let allExpanded = false;
document.getElementById("expandAll").addEventListener("click", (event) => {
  allExpanded = !allExpanded;
  workItems.forEach((item) => {
    if (!item.hidden) item.open = allExpanded;
  });
  event.currentTarget.textContent = allExpanded ? "Sbalit vše" : "Rozbalit vše";
});

document.getElementById("printButton").addEventListener("click", () => {
  window.print();
});

const capacityData = {
  small: {
    corpus: "8 mil. tokenů",
    delta: "0,4 mil. tokenů",
    storage: "25–75 GB",
    initial: "2–8 h",
    db: "4 vCPU · 16 GB RAM",
    workers: "4–8 vCPU · 16–32 GB RAM",
    search: "volitelně 2 × 4 vCPU / 16 GB",
    gpu: "0 GPU v MVP",
    gpuHours: "později 2–10 GPU h / měsíc",
  },
  medium: {
    corpus: "40 mil. tokenů",
    delta: "2 mil. tokenů",
    storage: "100–300 GB",
    initial: "8–24 h",
    db: "4–8 vCPU · 16–32 GB RAM",
    workers: "8–16 vCPU · 32–64 GB RAM",
    search: "2 × 8 vCPU / 32 GB",
    gpu: "1 sdílená GPU 24–48 GB",
    gpuHours: "10–50 GPU h / měsíc",
  },
  large: {
    corpus: "160 mil. tokenů",
    delta: "8 mil. tokenů",
    storage: "0,4–1,2 TB",
    initial: "1–3 dny",
    db: "8–16 vCPU · 32–64 GB RAM",
    workers: "16–32 vCPU · 64–128 GB RAM",
    search: "3 × 8 vCPU / 32 GB",
    gpu: "1–2 GPU 48–80 GB",
    gpuHours: "40–200 GPU h / měsíc",
  },
};

document.querySelectorAll(".scale-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".scale-button").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    const values = capacityData[button.dataset.scale];
    document.querySelectorAll("[data-capacity]").forEach((element) => {
      const value = values[element.dataset.capacity];
      if (value) element.textContent = value;
    });
  });
});

const sidebarLinks = [...document.querySelectorAll("[data-section]")];
const observedSections = sidebarLinks
  .map((link) => document.getElementById(link.dataset.section))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!current) return;
    sidebarLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === current.target.id);
    });
  },
  { rootMargin: "-20% 0px -65% 0px", threshold: [0.01, 0.2] },
);

observedSections.forEach((section) => sectionObserver.observe(section));
