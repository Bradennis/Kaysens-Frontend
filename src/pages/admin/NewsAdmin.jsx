import CollectionManager from "../../components/admin/CollectionManager";
import { newsApi } from "../../api/resources";
import { resolveImageUrl } from "../../api/client";

const fields = [
  { name: "title", label: "Title", required: true },
  { name: "slug", label: "Slug (leave blank to auto-generate)" },
  { name: "date", label: "Publish date", type: "date", required: true },
  { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
  { name: "body", label: "Full article body", type: "textarea", required: true },
  { name: "image", label: "Cover image", type: "image", required: true },
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
  { key: "date", label: "Date", render: (item) => new Date(item.date).toLocaleDateString("en-GB") },
  { key: "published", label: "Published", render: (item) => (item.published ? "Yes" : "No") },
];

export default function NewsAdmin() {
  return (
    <CollectionManager
      title="News & Awards"
      description="Manage announcements, milestones and awards shown across the site."
      resource={newsApi}
      fields={fields}
      columns={columns}
    />
  );
}
