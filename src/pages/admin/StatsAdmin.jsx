import CollectionManager from "../../components/admin/CollectionManager";
import { statsApi } from "../../api/resources";

const fields = [
  { name: "value", label: "Value (e.g. 30+, ₵5M+)", required: true },
  { name: "label", label: "Label (e.g. Years of Excellence)", required: true },
  {
    name: "group",
    label: "Shown on",
    type: "select",
    options: [
      { value: "home", label: "Home page" },
      { value: "csr", label: "CSR page (impact numbers)" },
    ],
  },
  { name: "order", label: "Display order", type: "number" },
];

const columns = [
  { key: "value", label: "Value" },
  { key: "label", label: "Label" },
  { key: "group", label: "Shown on" },
  { key: "order", label: "Order" },
];

export default function StatsAdmin() {
  return (
    <CollectionManager
      title="Stats"
      description="Manage the headline numbers shown on the Home page and the CSR impact section."
      resource={statsApi}
      fields={fields}
      columns={columns}
    />
  );
}
