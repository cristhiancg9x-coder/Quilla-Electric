// admin/src/collections/servicios.ts
import { buildCollection } from "@firecms/core";

export const serviciosCollection = buildCollection({
  name: "Services",
  path: "servicios",
  icon: "engineering",
  description: "Manage electrical services",
  permissions: ({ user }) => ({
    read: true,
    edit: user.roles?.includes("editor") || user.roles?.includes("admin"),
    create: user.roles?.includes("admin"),
    delete: user.roles?.includes("admin")
  }),
  properties: {
    title: {
      dataType: "string",
      name: "Service Name",
      validation: { required: true }
    },
    slug: {
      dataType: "string",
      name: "URL Slug",
      validation: { required: true },
      unique: true
    },
    description: {
      dataType: "string",
      name: "Description",
      validation: { required: true },
      multiline: true
    },
    content: {
      dataType: "string",
      name: "Detailed Content",
      validation: { required: true },
      markdown: true
    },
    price: {
      dataType: "string",
      name: "Price",
      description: "e.g., 'Cotizar', '$500', 'Desde $300'"
    },
    category: {
      dataType: "string",
      name: "Category",
      enumValues: {
        residential: "Residential",
        commercial: "Commercial", 
        industrial: "Industrial",
        maintenance: "Maintenance"
      },
      validation: { required: true }
    },
    image: {
      dataType: "string",
      name: "Service Image",
      storage: {
        storagePath: "servicios/images",
        acceptedFileTypes: ["image/*"],
        metadata: {
          cacheControl: "max-age=31536000"
        }
      }
    },
    featured: {
      dataType: "boolean",
      name: "Featured Service",
      defaultValue: false
    },
    locations: {
      dataType: "array",
      name: "Available Locations",
      of: {
        dataType: "string",
        enumValues: {
          "arequipa-cercado": "Arequipa Cercado",
          "cayma": "Cayma",
          "cerro-colorado": "Cerro Colorado",
          "jlbyr": "JLBYR",
          "sachaca": "Sachaca",
          "yanahuara": "Yanahuara"
        }
      }
    },
    seo: {
      dataType: "map",
      name: "SEO Settings",
      properties: {
        metaTitle: { dataType: "string", name: "Meta Title" },
        metaDescription: { dataType: "string", name: "Meta Description" },
        keywords: {
          dataType: "array",
          name: "Keywords",
          of: { dataType: "string" }
        }
      }
    }
  },
  initialSort: ["title", "asc"]
});