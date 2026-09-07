import api from "./client";

// Builds the standard set of calls for a content resource that follows the
// backend's CRUD route conventions (see server/src/routes/routeFactory.js).
function createResource(basePath, { hasSlug = true } = {}) {
  return {
    list: (query = "") => api.get(`${basePath}${query ? `?${query}` : ""}`),
    listAdmin: (query = "") => api.get(`${basePath}/admin${query ? `?${query}` : ""}`),
    getBySlug: hasSlug ? (slug) => api.get(`${basePath}/${slug}`) : undefined,
    getById: (id) => api.get(`${basePath}/id/${id}`),
    create: (data) => api.post(basePath, data),
    update: (id, data) => api.put(`${basePath}/${id}`, data),
    remove: (id) => api.del(`${basePath}/${id}`),
    reorder: (order) => api.put(`${basePath}/reorder/all`, { order }),
  };
}

export const businessesApi = createResource("/businesses");
export const leadersApi = createResource("/leaders");
export const newsApi = createResource("/news");
export const csrApi = createResource("/csr", { hasSlug: false });
export const galleryApi = createResource("/gallery", { hasSlug: false });
export const videosApi = createResource("/videos", { hasSlug: false });
export const statsApi = {
  ...createResource("/stats", { hasSlug: false }),
  listByGroup: (group) => api.get(`/stats?group=${group}`),
};

export const contactApi = {
  submit: (data) => api.post("/contact", data),
  list: (query = "") => api.get(`/contact${query ? `?${query}` : ""}`),
  updateStatus: (id, status) => api.patch(`/contact/${id}`, { status }),
  remove: (id) => api.del(`/contact/${id}`),
};

export const settingsApi = {
  get: () => api.get("/settings"),
  update: (data) => api.put("/settings", data),
};

export const authApi = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  me: () => api.get("/auth/me"),
  updateMe: (data) => api.put("/auth/me", data),
  listUsers: () => api.get("/auth/users"),
  createUser: (data) => api.post("/auth/users", data),
  removeUser: (id) => api.del(`/auth/users/${id}`),
};

export const uploadApi = {
  image: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.upload("/upload", formData);
  },
};
