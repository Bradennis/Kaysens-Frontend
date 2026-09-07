import CollectionManager from "../../components/admin/CollectionManager";
import { businessesApi } from "../../api/resources";
import { resolveImageUrl } from "../../api/client";
import { iconNames } from "../../components/IconRegistry";

const iconOptions = iconNames.map((n) => ({ value: n, label: n }));

const fields = [
  { name: "name", label: "Name", required: true },
  { name: "slug", label: "Slug (leave blank to auto-generate)" },
  { name: "short", label: "Short label (e.g. Distribution)", required: true },
  { name: "tagline", label: "Tagline", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "image", label: "Cover image", type: "image", required: true },
  {
    name: "category",
    label: "Template category",
    type: "select",
    options: [
      { value: "enterprise", label: "Enterprise (generic)" },
      { value: "distribution", label: "Distribution" },
      { value: "hotel", label: "Hotel" },
      { value: "energy", label: "Energy" },
      { value: "ventures", label: "Ventures / Properties" },
    ],
  },
  { name: "order", label: "Display order", type: "number" },
  { name: "published", label: "Published", type: "checkbox" },
  { name: "brands", label: "Brands distributed (Distribution template)", type: "tags" },
  {
    name: "features",
    label: "Feature highlights (Distribution template)",
    type: "repeater",
    subfields: [
      { name: "icon", label: "Icon name (e.g. Truck, MapPin, ShieldCheck)" },
      { name: "title", label: "Title" },
      { name: "text", label: "Description", type: "textarea" },
    ],
  },
  {
    name: "rooms",
    label: "Rooms & suites (Hotel template)",
    type: "repeater",
    subfields: [
      { name: "name", label: "Room name" },
      { name: "desc", label: "Description" },
      { name: "image", label: "Photo", type: "image" },
    ],
  },
  {
    name: "amenities",
    label: "Amenities (Hotel template)",
    type: "repeater",
    subfields: [
      { name: "icon", label: "Icon name (e.g. Wifi, Waves)" },
      { name: "label", label: "Label" },
    ],
  },
  {
    name: "products",
    label: "Products (Energy template)",
    type: "repeater",
    subfields: [
      { name: "title", label: "Title" },
      { name: "desc", label: "Description" },
    ],
  },
  { name: "safetyPoints", label: "Safety points (Energy template)", type: "tags" },
  {
    name: "ventures",
    label: "Portfolio items (Ventures template)",
    type: "repeater",
    subfields: [
      { name: "title", label: "Title" },
      { name: "desc", label: "Description" },
    ],
  },
];

const columns = [
  {
    key: "image",
    label: "",
    render: (item) => (
      <img src={resolveImageUrl(item.image)} alt="" className="size-12 rounded-lg object-cover ring-1 ring-forest/10" />
    ),
  },
  { key: "name", label: "Name" },
  { key: "short", label: "Category" },
  { key: "order", label: "Order" },
  { key: "published", label: "Published", render: (item) => (item.published ? "Yes" : "No") },
];

export default function BusinessesAdmin() {
  return (
    <CollectionManager
      title="Businesses"
      description="Manage the Group's operating subsidiaries and the sections shown on each business page."
      resource={businessesApi}
      fields={fields}
      columns={columns}
    />
  );
}
