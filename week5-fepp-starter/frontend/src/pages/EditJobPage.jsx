import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    type: "",
    description: "",
    company: {
      name: "",
      contactEmail: "",
      contactPhone: "",
    },
    location: "",
    salary: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchJob();
  }, [id]);

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
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      if (res.ok) {
        console.log("Job updated successfully!");
        navigate("/");
      } else {
        console.error("Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const cancelEdit = () => {
    navigate(-1);
    console.log("cancelEdit");
  };

  return (
    <div className="create">
      <h2>Edit Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input name="title" value={job.title} onChange={handleChange} />

        <label>Job type:</label>
        <select name="type" value={job.type} onChange={handleChange}>
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
        ></textarea>

        <label>Company Name:</label>
        <input name="name" value={job.company.name} onChange={handleChange} />

        <label>Contact Email:</label>
        <input
          name="contactEmail"
          value={job.company.contactEmail}
          onChange={handleChange}
        />

        <label>Contact Phone:</label>
        <input
          name="contactPhone"
          value={job.company.contactPhone}
          onChange={handleChange}
        />

        <label>Location:</label>
        <input name="location" value={job.location} onChange={handleChange} />

        <label>Salary:</label>
        <input name="salary" value={job.salary} onChange={handleChange} />

        <button type="submit">Update Job</button>
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
