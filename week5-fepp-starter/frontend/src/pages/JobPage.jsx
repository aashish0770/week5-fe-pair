import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState({
    title: "",
      description: "",
      company: {
        name: "",
        contactEmail: "",
        contactPhone: "",
      },
      salary: 0,
      location: "",
      type: "",
      postedDate: "",
  });

  const navigate = useNavigate();
    useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const deleteJob = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete job:", res.status);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Contact Email: {job.company.contactEmail}</p>
      <p>Contact Phone: {job.company.contactPhone}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Posted Date: {job.postedDate}</p>
      <Link to={`/edit-job/${id}`}>
        <button>Edit Job</button>
      </Link>
      <button onClick={deleteJob}>Delete Job</button>
    </div>
  );
};

export default JobPage;
