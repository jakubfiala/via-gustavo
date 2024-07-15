const inventory = document.getElementById('inventory');
const cellTemplate = document.getElementById('inventory-cell-template');

export default {
  items: new Set(),
  addItem(item) {
    this.items.add(item);

    const cell = cellTemplate.content.cloneNode(true);

    const img = cell.querySelector('img');
    img.src = item.thumbnailURL;

    const figcaption = cell.querySelector('figcaption');
    figcaption.innerText = item.name;

    inventory.appendChild(cell);
  },
}
