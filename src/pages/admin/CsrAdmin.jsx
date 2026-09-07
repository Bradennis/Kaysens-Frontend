import CollectionManager from "../../components/admin/CollectionManager";
import { csrApi } from "../../api/resources";
import { resolveImageUrl } from "../../api/client";

const fields = [
  { name: "title", label: "Title", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "image", label: "Image", type: "image", required: true },
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
  { key: "title", label: "Title" },
  { key: "order", label: "Order" },
  { key: "published", label: "Published", render: (item) => (item.published ? "Yes" : "No") },
];

export default function CsrAdmin() {
  return (
    <CollectionManager
      title="CSR Programmes"
      description="Manage the community programmes shown on the Home and CSR pages."
      resource={csrApi}
      fields={fields}
      columns={columns}
    />
  );
}
