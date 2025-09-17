import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [job, setJob] = useState({
    title: "",
    type: "Full-Time",
    location: "",
    description: "",
    salary: 4500,
    company: {
      name: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["name", "contactEmail", "contactPhone"].includes(name)) {
      setJob((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          [name]: value,
        },
      }));
    } else {
      setJob((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (
      !job.title ||
      !job.description ||
      !job.company.name ||
      !job.company.contactEmail ||
      !job.salary
    ) {
      console.log("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      if (res.ok) {
        console.log("Job added successfully!");
        navigate("/");
      } else {
        console.error("Failed to add job");
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Job title:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={job.title}
          onChange={handleChange}
        />

        <label htmlFor="type">Job type:</label>
        <select id="type" name="type" value={job.type} onChange={handleChange}>
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>

        <label htmlFor="description">Job Description:</label>
        <textarea
          id="description"
          name="description"
          value={job.description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="companyName">Company Name:</label>
        <input
          id="companyName"
          name="name"
          type="text"
          value={job.company.name}
          onChange={handleChange}
        />

        <label htmlFor="contactEmail">Contact Email:</label>
        <input
          id="contactEmail"
          name="contactEmail"
          type="email"
          value={job.company.contactEmail}
          onChange={handleChange}
        />

        <label htmlFor="contactPhone">Contact Phone:</label>
        <input
          id="contactPhone"
          name="contactPhone"
          type="tel"
          value={job.company.contactPhone}
          onChange={handleChange}
        />

        <label htmlFor="location">Location:</label>
        <input
          id="location"
          name="location"
          type="text"
          value={job.location}
          onChange={handleChange}
        />

        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          name="salary"
          type="text"
          value={job.salary}
          onChange={handleChange}
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
