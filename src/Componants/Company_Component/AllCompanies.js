import React, { useEffect, useState } from "react";
import { Card, Button, Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import { FaMapMarkerAlt, FaBuilding, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./CompanyProfile.css";

const AllCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,0) 
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("https://jobnexus-backend.onrender.com/api/getAllCompanies");
        if (response.status === 200) {
          const data = response.data.data;
          setCompanies(data);
          setFilteredCompanies(data);

          // Extract unique industries
          const uniqueIndustries = [
            ...new Set(data.map((company) => company.CompanyIndustry)),
          ];
          setIndustries(uniqueIndustries);
        } else {
          console.error("Failed to fetch companies");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleFilter = (industry) => {
    if (industry === "All") {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(
        (company) => company.CompanyIndustry === industry
      );
      setFilteredCompanies(filtered);
    }
  };

  const navigateToCompany = (id) => {
    console.log(id)
    navigate(`/companies/skeleton/companyProfile/${id}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="company-profile container mt-5">
      {/* Filter Section */}
      <div className="filter-section d-flex justify-content-around align-items-center mb-4">
        <h2 className="text-primary">Top Companies</h2>
        <DropdownButton
          id="industry-filter"
          title="Filter by Industry"
          onSelect={handleFilter}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          {industries.map((industry, index) => (
            <Dropdown.Item key={index} eventKey={industry}>
              {industry}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      {/* Companies List */}
      <div className="companies-list row">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <div className="col-md-4 mb-4" key={company._id}>
              <Card className="h-100 shadow-sm">
                 {/* <Card.Img
                  variant="top"
                  src={company.CompanyLogo || "https://via.placeholder.com/100"}
                  alt={`${company.CompanyName} Logo`}
                  className="company-logo d-inline" */}
                
                <Card.Body >
                  <Card.Title>{company.CompanyName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {company.CompanyIndustry}
                  </Card.Subtitle>
                  <Card.Text>
                    <FaMapMarkerAlt className="me-2" />
                    {company.CompanyAddress}
                  </Card.Text>
                  <Button
                    variant="primary"
                    
                    style={{"width":"fit-content"}}
                    onClick={() => navigateToCompany(company._id)}
                  >
                    View Profile <FaExternalLinkAlt className="ms-2"  style={{"width":"fit-content"}}/>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="text-center w-100">
            <p className="text-muted">No companies found for the selected industry.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCompanies;
