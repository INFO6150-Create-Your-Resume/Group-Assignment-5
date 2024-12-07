import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const [templates, setTemplates] = useState([]);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    content: "",
    category: "",
    thumbnailUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch templates
  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/templates${
          categoryFilter ? `?category=${categoryFilter}` : ""
        }`
      );
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  // Add or Update Template
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:3000/api/templates/${currentTemplate._id}`
      : "http://localhost:3000/api/templates";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditing ? currentTemplate : newTemplate),
      });

      const data = await response.json();
      if (response.ok) {
        alert(
          isEditing
            ? "Template updated successfully!"
            : "Template added successfully!"
        );
        setNewTemplate({
          name: "",
          description: "",
          content: "",
          category: "",
          thumbnailUrl: "",
        });
        setCurrentTemplate(null);
        setIsEditing(false);
        fetchTemplates();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(
        isEditing ? "Error updating template:" : "Error adding template:",
        error
      );
    }
  };

  // Delete a template
  const deleteTemplate = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/templates/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Template deleted successfully!");
        fetchTemplates(); // Refresh templates list
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  // Handle Edit
  const handleEditTemplate = (template) => {
    setCurrentTemplate(template);
    setIsEditing(true);
  };

  // Handle Cancel Edit
  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentTemplate(null);
  };

  // Fetch templates on component mount or category change
  useEffect(() => {
    fetchTemplates();
  }, [categoryFilter]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Admin Page</h1>

      {/* Add or Edit Form */}
      <div className="mb-4">
        <h3>{isEditing ? "Edit Template" : "Add New Template"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Template Name"
              className="form-control"
              value={isEditing ? currentTemplate.name : newTemplate.name}
              onChange={(e) =>
                isEditing
                  ? setCurrentTemplate({
                      ...currentTemplate,
                      name: e.target.value,
                    })
                  : setNewTemplate({ ...newTemplate, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Template Description"
              className="form-control"
              value={
                isEditing
                  ? currentTemplate.description
                  : newTemplate.description
              }
              onChange={(e) =>
                isEditing
                  ? setCurrentTemplate({
                      ...currentTemplate,
                      description: e.target.value,
                    })
                  : setNewTemplate({
                      ...newTemplate,
                      description: e.target.value,
                    })
              }
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Template Content"
              className="form-control"
              value={isEditing ? currentTemplate.content : newTemplate.content}
              onChange={(e) =>
                isEditing
                  ? setCurrentTemplate({
                      ...currentTemplate,
                      content: e.target.value,
                    })
                  : setNewTemplate({ ...newTemplate, content: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Template Category"
              className="form-control"
              value={
                isEditing ? currentTemplate.category : newTemplate.category
              }
              onChange={(e) =>
                isEditing
                  ? setCurrentTemplate({
                      ...currentTemplate,
                      category: e.target.value,
                    })
                  : setNewTemplate({ ...newTemplate, category: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Thumbnail URL"
              className="form-control"
              value={
                isEditing
                  ? currentTemplate.thumbnailUrl
                  : newTemplate.thumbnailUrl
              }
              onChange={(e) =>
                isEditing
                  ? setCurrentTemplate({
                      ...currentTemplate,
                      thumbnailUrl: e.target.value,
                    })
                  : setNewTemplate({
                      ...newTemplate,
                      thumbnailUrl: e.target.value,
                    })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">
            {isEditing ? "Update Template" : "Add Template"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <h3>Filter Templates by Category</h3>
        <input
          type="text"
          placeholder="Enter category"
          className="form-control"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
      </div>

      {/* Templates List */}
      <div>
        <h3>Existing Templates</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Thumbnail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template._id}>
                <td>{template.name}</td>
                <td>{template.description}</td>
                <td>{template.category}</td>
                <td>
                  {template.thumbnailUrl && (
                    <img
                      src={template.thumbnailUrl}
                      alt={template.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEditTemplate(template)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTemplate(template._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
