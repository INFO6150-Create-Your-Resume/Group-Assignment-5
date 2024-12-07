const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  content: { type: String }, // HTML or JSON content for the template
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  category: { type: String, required: true }, // e.g., "Professional", "Creative"
  thumbnailUrl: { type: String }, // URL to preview image of the template
  isActive: { type: Boolean, default: true }, // To enable/disable the template
});

const Template = mongoose.model("Template", TemplateSchema);
