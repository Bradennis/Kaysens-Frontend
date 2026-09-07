import CollectionManager from "../../components/admin/CollectionManager";
import { leadersApi } from "../../api/resources";
import { resolveImageUrl } from "../../api/client";

const fields = [
  { name: "name", label: "Full name", required: true },
  { name: "slug", label: "Slug (leave blank to auto-generate)" },
  { name: "role", label: "Role / title", required: true },
  { name: "bio", label: "Bio", type: "textarea", required: true },
  { name: "image", label: "Photo", type: "image", required: true },
  { name: "linkedin", label: "LinkedIn URL" },
  { name: "order", label: "Display order", type: "number" },
  { name: "published", label: "Published", type: "checkbox" },
];

const columns = [
  {
    key: "image",
    label: "",
    render: (item) => (
      <img src={resolveImageUrl(item.image)} alt="" className="size-12 rounded-full object-cover ring-1 ring-forest/10" />
    ),
  },
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "order", label: "Order" },
  { key: "published", label: "Published", render: (item) => (item.published ? "Yes" : "No") },
];

export default function LeadersAdmin() {
  return (
    <CollectionManager
      title="Leadership Team"
      description="Manage the executives and directors shown on the Home and About pages."
      resource={leadersApi}
      fields={fields}
      columns={columns}
    />
  );
}
