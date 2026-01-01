// admin/src/collections/blog.ts
import { buildCollection } from "@firecms/core";

export const blogCollection = buildCollection({
  name: "Blog Posts",
  path: "blog",
  icon: "article",
  description: "Manage blog posts for Quilla Electric",
  permissions: ({ user }) => ({
    read: true,
    edit: user.roles?.includes("editor") || user.roles?.includes("admin"),
    create: user.roles?.includes("editor") || user.roles?.includes("admin"),
    delete: user.roles?.includes("admin")
  }),
  properties: {
    title: {
      dataType: "string",
      name: "Title",
      validation: { required: true },
      markdown: false
    },
    slug: {
      dataType: "string",
      name: "URL Slug",
      validation: { required: true },
      unique: true
    },
    description: {
      dataType: "string",
      name: "Meta Description",
      validation: { required: true, max: 160 },
      multiline: true
    },
    content: {
      dataType: "string",
      name: "Content",
      validation: { required: true },
      markdown: true
    },
    pubDate: {
      dataType: "date",
      name: "Publish Date",
      validation: { required: true }
    },
    author: {
      dataType: "string",
      name: "Author",
      defaultValue: "Quilla Electric"
    },
    tags: {
      dataType: "array",
      name: "Tags",
      of: {
        dataType: "string"
      },
      validation: { required: true }
    },
    image: {
      dataType: "string",
      name: "Featured Image",
      storage: {
        storagePath: "blog/images",
        acceptedFileTypes: ["image/*"],
        metadata: {
          cacheControl: "max-age=31536000"
        }
      }
    },
    seo: {
      dataType: "map",
      name: "SEO Settings",
      properties: {
        metaTitle: {
          dataType: "string",
          name: "Meta Title"
        },
        metaDescription: {
          dataType: "string",
          name: "Meta Description"
        },
        keywords: {
          dataType: "array",
          name: "Keywords",
          of: { dataType: "string" }
        }
      }
    },
    status: {
      dataType: "string",
      name: "Status",
      enumValues: {
        draft: "Draft",
        published: "Published",
        archived: "Archived"
      },
      defaultValue: "draft"
    }
  },
  initialSort: ["pubDate", "desc"]
});