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
