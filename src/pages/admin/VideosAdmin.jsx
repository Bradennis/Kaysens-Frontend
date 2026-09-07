import CollectionManager from "../../components/admin/CollectionManager";
import { videosApi } from "../../api/resources";
import { resolveImageUrl } from "../../api/client";

const fields = [
  { name: "title", label: "Title", required: true },
  { name: "duration", label: "Duration (e.g. 2:48)" },
  { name: "poster", label: "Poster image", type: "image", required: true },
  { name: "url", label: "Video URL (YouTube, Vimeo, or direct mp4 link)" },
  { name: "order", label: "Display order", type: "number" },
  { name: "published", label: "Published", type: "checkbox" },
];

const columns = [
  {
    key: "poster",
    label: "",
    render: (item) => (
      <img src={resolveImageUrl(item.poster)} alt="" className="size-12 rounded-lg object-cover ring-1 ring-forest/10" />
    ),
  },
  { key: "title", label: "Title" },
  { key: "duration", label: "Duration" },
  { key: "order", label: "Order" },
];

export default function VideosAdmin() {
  return (
    <CollectionManager
      title="Videos"
      description="Manage the video library shown on the Resources → Videos page."
      resource={videosApi}
      fields={fields}
      columns={columns}
    />
  );
}
