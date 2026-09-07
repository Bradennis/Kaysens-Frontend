import CollectionManager from "../../components/admin/CollectionManager";
import { galleryApi } from "../../api/resources";
import { resolveImageUrl } from "../../api/client";

const fields = [
  { name: "image", label: "Image", type: "image", required: true },
  { name: "alt", label: "Alt text (for accessibility)" },
  {
    name: "span",
    label: "Grid span (layout)",
    type: "select",
    options: [
      { value: "", label: "Normal" },
      { value: "col-span-2", label: "Wide (2 columns)" },
      { value: "row-span-2", label: "Tall (2 rows)" },
    ],
  },
  { name: "order", label: "Display order", type: "number" },
  { name: "published", label: "Published", type: "checkbox" },
];

const columns = [
  {
    key: "image",
    label: "",
    render: (item) => (
      <img src={resolveImageUrl(item.image)} alt="" className="size-12 rounded-lg object-cover ring-1 ring-forest/10" />
    ),
  },
  { key: "alt", label: "Alt text" },
  { key: "span", label: "Layout" },
  { key: "order", label: "Order" },
];

export default function GalleryAdmin() {
  return (
    <CollectionManager
      title="Image Gallery"
      description="Manage the photography shown on the Resources → Gallery page."
      resource={galleryApi}
      fields={fields}
      columns={columns}
    />
  );
}
