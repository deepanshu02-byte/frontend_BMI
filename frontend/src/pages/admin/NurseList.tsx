import React, { useState } from "react";
import { Modal } from "../../components/reusable/Modal";
import { Pagination } from "../../components/reusable/Pagination";
import { Button } from "../../components/reusable/Button"; // Adjust path as needed


interface Nurse {
  name: string;
  specialties: string[];
  department: string;
  certifications: string[];
  availability: string;
  plannedLeaves: string;
}

const NursesList: React.FC = () => {
  const [nurses, setNurses] = useState<Nurse[]>([
  {
    name: "Aarav Mehta",
    specialties: ["ICU"],
    department: "Critical Care",
    certifications: ["BLS", "ACLS"],
    availability: "Mon-Fri",
    plannedLeaves: "2025-08-10 to 2025-08-15",
  },
  {
    name: "Sneha Reddy",
    specialties: ["Pediatrics"],
    department: "Children Ward",
    certifications: ["PALS"],
    availability: "Tue-Sat",
    plannedLeaves: "2025-07-20 to 2025-07-22",
  },
  {
    name: "Rohan Kapoor",
    specialties: ["General"],
    department: "General Medicine",
    certifications: ["BLS"],
    availability: "Mon-Wed",
    plannedLeaves: "2025-09-01 to 2025-09-03",
  },
  {
    name: "Meera Nair",
    specialties: ["ICU", "General"],
    department: "Emergency",
    certifications: ["ACLS", "BLS"],
    availability: "Thu-Sun",
    plannedLeaves: "2025-08-05 to 2025-08-07",
  },
  {
    name: "Karan Singh",
    specialties: ["Pediatrics"],
    department: "NICU",
    certifications: ["PALS"],
    availability: "Mon-Fri",
    plannedLeaves: "2025-07-25 to 2025-07-28",
  },
  {
    name: "Divya Joshi",
    specialties: ["General"],
    department: "Outpatient",
    certifications: ["BLS"],
    availability: "Wed-Sat",
    plannedLeaves: "2025-08-12 to 2025-08-14",
  },
  {
    name: "Ankit Sharma",
    specialties: ["ICU"],
    department: "Trauma",
    certifications: ["ACLS"],
    availability: "Mon-Tue",
    plannedLeaves: "2025-09-10 to 2025-09-12",
  },
  {
    name: "Priya Desai",
    specialties: ["Pediatrics", "General"],
    department: "Children Ward",
    certifications: ["PALS", "BLS"],
    availability: "Fri-Sun",
    plannedLeaves: "2025-08-20 to 2025-08-22",
  },
  {
    name: "Vikram Rao",
    specialties: ["General"],
    department: "General Surgery",
    certifications: ["BLS"],
    availability: "Mon-Fri",
    plannedLeaves: "2025-07-30 to 2025-08-01",
  },
  {
    name: "Neha Kulkarni",
    specialties: ["ICU"],
    department: "Cardiology",
    certifications: ["ACLS"],
    availability: "Tue-Thu",
    plannedLeaves: "2025-08-15 to 2025-08-18",
  },
  {
    name: "Rajiv Menon",
    specialties: ["General"],
    department: "Orthopedics",
    certifications: ["BLS"],
    availability: "Mon-Wed",
    plannedLeaves: "2025-09-05 to 2025-09-07",
  },
  {
    name: "Isha Verma",
    specialties: ["Pediatrics"],
    department: "Children Ward",
    certifications: ["PALS"],
    availability: "Thu-Sat",
    plannedLeaves: "2025-08-25 to 2025-08-27",
  },
  {
    name: "Aditya Chauhan",
    specialties: ["ICU"],
    department: "Neuro ICU",
    certifications: ["ACLS", "BLS"],
    availability: "Mon-Fri",
    plannedLeaves: "2025-07-18 to 2025-07-20",
  },
  {
    name: "Ritika Bansal",
    specialties: ["General"],
    department: "Outpatient",
    certifications: ["BLS"],
    availability: "Tue-Fri",
    plannedLeaves: "2025-08-01 to 2025-08-03",
  },
  {
    name: "Siddharth Jain",
    specialties: ["ICU", "General"],
    department: "Emergency",
    certifications: ["ACLS"],
    availability: "Sat-Sun",
    plannedLeaves: "2025-09-15 to 2025-09-17",
  },
  {
    name: "Tanya Bhatt",
    specialties: ["Pediatrics"],
    department: "NICU",
    certifications: ["PALS"],
    availability: "Mon-Wed",
    plannedLeaves: "2025-08-10 to 2025-08-12",
  },
  {
    name: "Manish Gupta",
    specialties: ["General"],
    department: "General Medicine",
    certifications: ["BLS"],
    availability: "Thu-Sat",
    plannedLeaves: "2025-07-22 to 2025-07-24",
  },
  {
    name: "Anjali Rao",
    specialties: ["ICU"],
    department: "Cardiology",
    certifications: ["ACLS"],
    availability: "Mon-Fri",
    plannedLeaves: "2025-08-28 to 2025-08-30",
  },
  {
    name: "Nikhil Patil",
    specialties: ["General"],
    department: "Orthopedics",
    certifications: ["BLS"],
    availability: "Tue-Thu",
    plannedLeaves: "2025-09-01 to 2025-09-03",
  },
  {
    name: "Shruti Shah",
    specialties: ["Pediatrics"],
    department: "Children Ward",
    certifications: ["PALS"],
    availability: "Wed-Fri",
    plannedLeaves: "2025-08-05 to 2025-08-07",
  },

  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newNurse, setNewNurse] = useState<Nurse>({
    name: "",
    specialties: [],
    department: "",
    certifications: [],
    availability: "",
    plannedLeaves: "",
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(nurses.filter(filterFn).length / itemsPerPage);

  function filterFn(nurse: Nurse) {
    return (
      nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurse.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      nurse.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const paginatedNurses = nurses.filter(filterFn).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNewNurseChange = (field: keyof Nurse, value: string) => {
    setNewNurse((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNurse = () => {
    if (!newNurse.name || !newNurse.department) {
      alert("Name and Department are required.");
      return;
    }

    setNurses((prev) => [...prev, newNurse]);
    setNewNurse({
      name: "",
      specialties: [],
      department: "",
      certifications: [],
      availability: "",
      plannedLeaves: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Nurse Management</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, specialty, or department"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded w-1/2"
        />

        <Button
          label="Add Nurse"
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          size="md"
        />
      </div>

      <table className="min-w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Specialties</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Certifications</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Availability</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Planned Leaves</th>
          </tr>
        </thead>
        <tbody>
          {paginatedNurses.map((nurse, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 text-sm text-gray-800">{nurse.name}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{nurse.specialties.join(", ")}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{nurse.department}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{nurse.certifications.join(", ")}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{nurse.availability}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{nurse.plannedLeaves}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Nurse" size="lg">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newNurse.name}
            onChange={(e) => handleNewNurseChange("name", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Specialties (comma separated)"
            value={newNurse.specialties.join(", ")}
            onChange={(e) =>
              setNewNurse((prev) => ({
                ...prev,
                specialties: e.target.value.split(",").map((s) => s.trim()),
              }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Department"
            value={newNurse.department}
            onChange={(e) => handleNewNurseChange("department", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Certifications (comma separated)"
            value={newNurse.certifications.join(", ")}
            onChange={(e) =>
              setNewNurse((prev) => ({
                ...prev,
                certifications: e.target.value.split(",").map((c) => c.trim()),
              }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Availability"
            value={newNurse.availability}
            onChange={(e) => handleNewNurseChange("availability", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Planned Leaves"
            value={newNurse.plannedLeaves}
            onChange={(e) => handleNewNurseChange("plannedLeaves", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />

          <div className="text-right">
            <button
              onClick={handleAddNurse}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NursesList;
