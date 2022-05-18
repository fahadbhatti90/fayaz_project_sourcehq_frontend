import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../Component/axios";
import { DashboardSidebar } from "../../Component/layout/DashboardSidebar";
import { DasboardHeader } from "../../Component/layout/DasboardHeader";
import { Breadcrumb } from "../../Component/layout/Breadcrumb";
import Messages from "../../Component/Messages";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loading from "../../Component/Loading";
// import ReactTagInput from "@pathofdev/react-tag-input";
// import "@pathofdev/react-tag-input/build/index.css";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
export default function JobEdit() {
    const [loading, setLoading] = useState(true);
    const [skills, setSkills] = useState([]);
  const [collaborator, setCollaborator] = useState([]);
  const [job_title, setJobTitle] = useState("");
  const [job_category, setJobCategory] = useState(null);
  const [job_department, setJobDepartment] = useState(null);
  const [job_position, setJobPosition] = useState(null);
  const [job_openings, setJobOpenings] = useState("");
  const [job_location, setJobLocation] = useState("");
  const [job_remote, setJobRemote] = useState(false);
  const [job_contract_type, setJobContractType] = useState(null);
  const [job_project_sow, setJobProjectSow] = useState(null);
  const [job_pay_type, setJobPayType] = useState(null);
  const [job_annual_bill_rate, setJobAnnualBillRate] = useState("");
  const [job_min_bill_rate, setJobMinBillRate] = useState("");
  const [job_max_bill_rate, setJobMaxBillRate] = useState("");

  // const [job_annual_pay_rate, setJobAnnualPayRate] = useState("");
  // const [job_min_pay_rate, setJobMinPayRate] = useState("");
  // const [job_max_pay_rate, setJobMaxPayRate] = useState("");
  // const [job_start_date, setjobStartDate] = useState("");
  // const [job_end_date, setjobEndDate] = useState("");
  // const [job_hire_date, setjobHireDate] = useState("");
  // const [job_exclude_holidays, setJobExcludeHolidays] = useState("");
  // const [job_working_days, setJobWorkingDays] = useState("");
  // const [job_tentative_end_date, setjobTentativeEndDate] = useState("");
  const [job_description, setJobDescription] = useState("");
  // const [job_description_1, setJobDescription1] = useState("");
  // const [job_description_2, setJobDescription2] = useState("");
  const [job_internal_notes, setJobInternalNotes] = useState("");
  const [job_career_web_internal, setJobCareerWebInternal] = useState(false);
  const [job_career_web_external, setJobCareerWebExterna] = useState(false);
  const [hiring_manager, setHiringManager] = useState(null);
  const [hiring_manager_1, setHiringManager1] = useState(null);
  const [job_status, setJobStatus] = useState(null);
  // const [job_created_by, setJobCreatedBy] = useState(null);
  const [job_portal_user, setJobPortalUser] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [allPositions, setAllPositions] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [allContractType, setAllContractType] = useState({});
  const [allProjectSow, setAllProjectSow] = useState({});
  const [allScheduleType, setAllScheduleType] = useState({});
  const [allPayType, setAllPayType] = useState({});
  const [allHiringManager, setAllHiringManager] = useState([]);
  const [secondaryHiringManager, setSecondaryHiringManager] = useState([]);
  const [allOtherTeamMembers, setAllOtherTeamMembers] = useState({});
  const [allStatus, setAllStatus] = useState([]);
  const [allSkill, setAllSkill] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [allCollaborator, setAllCollaborator] = useState([]);
  const [success, setSuccess] = useState("");
  const [validationError, setValidationError] = useState({});
    const [errors, seterrors] = useState("");
      let { id } = useParams();

  useEffect(() => {
      fetchData();
      fetchJob();
  }, []);
  const token = JSON.parse(localStorage.getItem("token"));
  const user_data = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    Authorization: `Bearer ${token}`,
    };
    const fetchJob = async () => {
    await axios
      .get(`/GetJobDetail/${id}`, {
        headers: headers,
      })
        .then(({ data }) => {
          
          setJobTitle(data.job_details.job_title);
          setJobCategory(data.job_details.job_category)
          setJobDepartment(data.job_details.job_department.id)
          setJobRemote(data.job_details.job_remote === 1 ? true :false)
          setJobPosition(data.job_details.job_position.id)
          setJobLocation(data.job_details.job_location)
          setJobContractType(data.job_details.job_contract_type)
          setJobProjectSow(data.job_details.job_project_sow)
          setJobPayType(data.job_details.job_pay_type)
          setJobAnnualBillRate(data.job_details.job_annual_bill_rate)
          setJobMinBillRate(data.job_details.job_min_bill_rate)
          setJobMaxBillRate(data.job_details.job_max_bill_rate)
          setJobDescription(data.job_details.job_description)
          setJobInternalNotes(data.job_details.job_internal_notes)
          setJobCareerWebInternal(data.job_details.job_career_web_internal === 1 ? true : false)
          setJobCareerWebExterna(data.job_details.job_career_web_external === 1 ? true : false)
          setHiringManager(`${data.job_details.hiring_manager.id}`)
          setHiringManager1(`${data.job_details.secondary_hiring_manager.id}`)
          setJobStatus(`${data.job_details.job_status}`)
          setJobPortalUser(data.job_details.job_portal_user)
            if (data.job_details.jobs_skills !== null) {
            let skill_job =    data.job_details.jobs_skills.map((item, index) => {
                return { value: item.name, label: item.name };
            })
               setSkills(skill_job);
            }
             setTimeout(() => {
      setLoading(false);
    }, 500);
            
       
      })
      .catch(({ data }) => {
        console.log(data);
      });
  };
  const fetchData = async () => {
    await axios
      .get(`/ShowAddJobForm/${user_data.business_id}`, {
        headers: headers,
      })
      .then(({ data }) => {
        
        setAllCategories([...data.all_job_categories]);
        setAllDepartments([...data.all_job_departments]);
        setAllPositions([...data.all_job_positions]);
        setAllLocation([...data.location]);
        setAllContractType({ ...data.contract_type });
        setAllProjectSow({ ...data.project_sow });
        setAllScheduleType({ ...data.schedule_type });
        setAllPayType({ ...data.pay_type });
        setAllHiringManager([...data.hiring_manager]);
        setSecondaryHiringManager([...data.secondary_hiring_manager]);
        setAllOtherTeamMembers({ ...data.other_team_members });
        setAllStatus({ ...data.Status });
        setAllSkill([...data.skills]);
        setAllCollaborator([...data.collaborator_members]);
      });
  };

  const handleChange = (field, value) => {
    switch (field) {
      case "skill":
        setSkills(value);
        break;
      case "collaborator":
        setCollaborator(value);
        break;

      default:
        break;
    }
  };

  let hiringManageOption = allHiringManager.map((item, index) => {
    return {
      value: item.id,
      label: `${item.first_name}  ${item.last_name}`,
    };
  });
  let secondaryHiringOption = secondaryHiringManager.map((item, index) => {
    return {
      value: item.id,
      label: `${item.first_name}  ${item.last_name}`,
    };
  });
  let teameamMembersOption = Object.entries(allOtherTeamMembers).map(
    ([item, index]) => {
      return { value: index, label: index };
    }
  );
  let contractOption = Object.entries(allContractType).map(([item, index]) => {
    return { value: item, label: index };
  });
  let sowOption = Object.entries(allProjectSow).map(([item, index]) => {
    return { value: item, label: index };
  });
  let scheduleOption = Object.entries(allScheduleType).map(([item, index]) => {
    return { value: item, label: index };
  });
  let payTypeOption = Object.entries(allPayType).map(([item, index]) => {
    return { value: item, label: index };
  });
  let statusOption = Object.entries(allStatus).map(([item, index]) => {
    return { value: item, label: index };
  });

  let categoriesOption = allCategories.map((item, index) => {
    return { value: item.id, label: item.name };
  });
  let departmentOption = allDepartments.map((item, index) => {
    return { value: item.id, label: item.name };
  });
  let positionOption = allPositions.map((item, index) => {
    return { value: item.id, label: item.name };
  });
  let locationOption = allLocation.map((item, index) => {
    return { value: item.id, label: item.location_name };
  });
  let skill = allSkill.map((item, index) => {
    return { value: item.name, label: item.name };
  });
  let collaborators = allCollaborator.map((item, index) => {
    return { value: item.name, label: item.name };
  });
    const submitForm = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const formData = new FormData();
    formData.append("job_title", job_title);
    formData.append("job_category", job_category);
    formData.append("job_department", job_department);
    formData.append("job_position", job_position);
    formData.append("job_remote", job_remote ? 1 : 0);
    formData.append("skills", JSON.stringify(skills));
    formData.append("collaborators", JSON.stringify(collaborator));
    formData.append("job_location", job_location);
    formData.append("job_contract_type", job_contract_type);
    formData.append("job_project_sow", job_project_sow);
    formData.append("job_pay_type", job_pay_type);
    formData.append("job_annual_bill_rate", job_annual_bill_rate);
    formData.append("job_min_bill_rate", job_min_bill_rate);
    formData.append("job_max_bill_rate", job_max_bill_rate);
    formData.append("job_description", job_description);
    formData.append("job_internal_notes", job_internal_notes);
    formData.append("job_career_web_internal", job_career_web_internal ? 1 : 0);
    formData.append("job_career_web_external", job_career_web_external ? 1 : 0);
    formData.append("hiring_manager", hiring_manager);
    formData.append("hiring_manager_1", hiring_manager_1);
    formData.append("job_status", job_status);
    formData.append("job_portal_user", job_portal_user);
    formData.append("business_id", user_data.business_id);

    await axios
      .post(`/AddJobDetails`, formData, {
        headers: headers,
        "Content-Type": "application/json",
      })
      .then(({ data }) => {
        if (data.status === 200) {
          setSuccess(data.message);
          setSkills([]);
          setCollaborator([]);
          setJobTitle("");
          setJobCategory(null);
          setJobDepartment(null);
          setJobPosition(null);
          setJobLocation(null);
          setJobRemote(false);
          setJobContractType(null);
          setJobProjectSow(null);
          setJobPayType(null);
          setJobAnnualBillRate("");
          setJobMinBillRate("");
          setJobMaxBillRate("");
          setJobDescription("");
          setJobCareerWebInternal(false);
          setJobCareerWebExterna(false);
          setHiringManager(null);
          setHiringManager1(null);
          setJobStatus(null);
          setJobPortalUser(null);
          setJobInternalNotes("");

          setTimeout(() => {
            setSuccess("");
            setDisabled(false);
          }, 6000);
        } else if (data.status === "validation_failed") {
          setValidationError(data.errors);
          setTimeout(() => {
            setValidationError({});
          }, 6000);
        } else {
          seterrors(data.message);
          setTimeout(() => {
            seterrors("");
          }, 6000);
        }
      });
  };
  return (
      <>
      <DashboardSidebar />
      <main className="main__area">
        <DasboardHeader />
              <Breadcrumb />
              {loading ? (
                  <Loading />
              ) : (
                  <section className="main__wrapper">
                      <div className="form__card">
                          <div className="form__card__title__wrap d-flex align-items-center justify-content-between">
                              <div className="form__card__title__wrap__left d-flex align-items-center ">
                                  <div className="form__card__title__btn">
                                      <Link to={""}>
                                          <i className="fal fa-arrow-left"></i>
                                      </Link>
                                  </div>
                                  <div className="form__card__title border-0">Add New Job</div>
                              </div>
                              <div className="form__card__title__wrap__btn ms-3 has-abs">
                                  <button className="close-job">
                                      <i className="fal fa-times"></i>
                                  </button>
                              </div>
                          </div>
                          <Messages
                              errMsg={errors}
                              success={success}
                              validation={validationError}
                          />
                          <div className="form__card__flex job__form__wrapper">
                              <form onSubmit={submitForm}>
                                  <div className="form__card__body__wrapper">
                                      <div className="row">
                                          <div className="col-md-3 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor="">
                                                      Job Title <span className="text-red">*</span>
                                                  </label>
                                                  <input
                                                      type="text"
                                                      className="form-control"
                                                      name="job_title"
                                                      value={job_title}
                                                      required
                                                      onChange={(event) => {
                                                          setJobTitle(event.target.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-3 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor="">
                                                      Job Category <span className="text-red">*</span>
                                                  </label>

                                                  <Select
                                                      name="job_category"
                                                      value={categoriesOption.filter(
                                                          (item) => item.value === job_category
                                                      )}
                                                      options={categoriesOption}
                                                      onChange={(event) => {
                                                          setJobCategory(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-3 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor=""> Department</label>
                                                  <Select
                                                      name="job_department"
                                                      value={departmentOption.filter(
                                                          (item) => item.value === job_department
                                                      )}
                                                      options={departmentOption}
                                                      onChange={(event) => {
                                                          setJobDepartment(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-3 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor="">
                                                      Job Position <span className="text-red">*</span>
                                                  </label>
                                                  <Select
                                                      name="job_position"
                                                      value={positionOption.filter(
                                                          (item) => item.value === job_position
                                                      )}
                                                      options={positionOption}
                                                      onChange={(event) => {
                                                          setJobPosition(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="form__card__body__wrapper">
                                      <p className="mb-1">Location</p>
                                      <p className="text-light">
                                          Select the office this job opening belongs to or the 'Remote
                                          working' option.
                                      </p>

                                      <div className="row">
                                          <div className="col-md-4 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor="">
                                                      Workplace location <span className="text-red">*</span>
                                                  </label>
                                                  <Select
                                                      name="job_location"
                                                      value={locationOption.filter(
                                                          (item) => item.value === job_location
                                                      )}
                                                      options={locationOption}
                                                      onChange={(event) => {
                                                          setJobLocation(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-6 col-sm-6">
                                              <div className="form-check form-check-pt">
                                                  <input
                                                      className="form-check-input"
                                                      type="checkbox"
                                                      value={job_remote}
                                                      checked={job_remote}
                                                      name="job_remote"
                                                      onChange={(event) => {
                                                          setJobRemote(!job_remote);
                                                      }}
                                                  />
                                                  <label
                                                      className="form-check-label"
                                                      htmlFor="flexCheckDefault"
                                                  >
                                                      Remote Working
                                                  </label>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="form__card__body__wrapper">
                                      <p className="mb-1">Details</p>
                                      <p className="text-light">
                                          Add details about this job opening so candidates can learn
                                          more about it.
                                      </p>

                                      <div className="row">
                                          <div className="col-md-4 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor="">
                                                      Contract type <span className="text-red">*</span>
                                                  </label>
                                                  <Select
                                                      name="job_contract_type"
                                                      value={contractOption.filter(
                                                          (item) => item.value === job_contract_type
                                                      )}
                                                      options={contractOption}
                                                      onChange={(event) => {
                                                          setJobContractType(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-4 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor=""> Project / SOW</label>
                                                  <Select
                                                      name="job_project_sow"
                                                      value={sowOption.filter(
                                                          (item) => item.value === job_project_sow
                                                      )}
                                                      options={sowOption}
                                                      onChange={(event) => {
                                                          setJobProjectSow(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-4 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor=""> Pay type</label>
                                                  <Select
                                                      name="job_pay_type"
                                                      value={payTypeOption.filter(
                                                          (item) => item.value === job_pay_type
                                                      )}
                                                      options={payTypeOption}
                                                      onChange={(event) => {
                                                          setJobPayType(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="form__card__body__wrapper bg-orange-50">
                                      <div className="row">
                                          <div className="col-md-4 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor="">
                                                      Annual salary <span className="text-red">*</span>
                                                  </label>
                                                  <input
                                                      type="text"
                                                      className="form-control"
                                                      name="job_annual_bill_rate"
                                                      value={job_annual_bill_rate}
                                                      required
                                                      onChange={(event) => {
                                                          setJobAnnualBillRate(event.target.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-4 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor="">
                                                      Minimum <span className="text-red">*</span>
                                                  </label>
                                                  <input
                                                      type="text"
                                                      className="form-control"
                                                      name="job_min_bill_rate"
                                                      value={job_min_bill_rate}
                                                      required
                                                      onChange={(event) => {
                                                          setJobMinBillRate(event.target.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-4 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor="">
                                                      Maximum <span className="text-red">*</span>
                                                  </label>
                                                  <input
                                                      type="text"
                                                      className="form-control"
                                                      name="job_max_bill_rate"
                                                      value={job_max_bill_rate}
                                                      required
                                                      onChange={(event) => {
                                                          setJobMaxBillRate(event.target.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="form__card__body__wrapper">
                                      <p className="mb-1">Description</p>
                                      <p className="text-light">
                                          Write the description of this job opening. Job requirements,
                                          conditions...
                                      </p>
                                      <CKEditor
                                          editor={ClassicEditor}
                                          name="job_description"
                                          data={job_description}
                                          onChange={(event, editor) => {
                                              const data = editor.getData();
                                              setJobDescription(data);
                                              // console.log({ event, editor, data });
                                          }}
                                      />

                                      <div className="row pt-2">
                                          {/* <div className="col-md-12 col-sm-12">
                      <div className="single__input__item">
                        <label htmlFor=""> Role Title</label>
                        <textarea
                          className="form-control big"
                          name="job_internal_notes"
                          value={job_internal_notes}
                          required
                          onChange={(event) => {
                            setJobInternalNotes(event.target.value);
                          }}
                        />
                      </div>
                    </div> */}
                                          <div className="col-md-12 col-sm-12">
                                              <div className="single__input__item">
                                                  <label htmlFor=""> Skills</label>

                                                  <CreatableSelect
                                                      isMulti
                                                      name="skills"
                                                      value={skills}
                                                      onChange={(value) => handleChange("skill", value)}
                                                      options={skill}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-12 col-sm-12">
                                              <div className="single__input__item">
                                                  <label htmlFor=""> Collaborator</label>

                                                  <CreatableSelect
                                                      isMulti
                                                      name="collaborator"
                                                      value={collaborator}
                                                      onChange={(value) =>
                                                          handleChange("collaborator", value)
                                                      }
                                                      options={collaborators}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-12 col-sm-12">
                                              <div className="single__input__item">
                                                  <label htmlFor=""> Internal Notes / Team Notes</label>

                                                  <textarea
                                                      className="form-control big"
                                                      name="job_internal_notes"
                                                      value={job_internal_notes}
                                                      required
                                                      onChange={(event) => {
                                                          setJobInternalNotes(event.target.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="form__card__body__wrapper bg-orange-50 check-bg">
                                      <div className="d-flex check-flex flex-wrap">
                                          <div className="form-check">
                                              <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  id="flexCheckDefault"
                                                  value={job_career_web_internal}
                                                  name="job_career_web_internal"
                                                  checked={job_career_web_internal}
                                                  onChange={(event) => {
                                                      setJobCareerWebInternal(!job_career_web_internal);
                                                  }}
                                              />
                                              <label
                                                  className="form-check-label"
                                                  htmlFor="flexCheckDefault"
                                              >
                                                  Publish Job to Career Website
                                              </label>
                                          </div>
                                          <div className="form-check">
                                              <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  checked={job_career_web_external}
                                                  name="job_career_web_external"
                                                  onChange={(event) => {
                                                      setJobCareerWebExterna(!job_career_web_external);
                                                  }}
                                                  id="flexCheckDefault2"
                                              />
                                              <label
                                                  className="form-check-label"
                                                  htmlFor="flexCheckDefault2"
                                              >
                                                  Publish Job to Third party Website (10 Credit for Job
                                                  Posting)
                                              </label>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="form__card__body__wrapper">
                                      <p className="mb-1">Invite Team members</p>
                                      <p className="text-light">
                                          Bring your team to collabartor on this job
                                      </p>

                                      <div className="row pt-2">
                                          <div className="col-md-6 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor=""> Hiring Manager</label>
                                                  <Select
                                                      name="hiring_manager"
                                                      value={hiringManageOption.filter(
                                                          (item) => item.value === hiring_manager
                                                      )}
                                                      options={hiringManageOption}
                                                      onChange={(event) => {
                                                          setHiringManager(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-6 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor=""> Secondary Hiring Manager</label>
                                                  <Select
                                                      name="hiring_manager_1"
                                                      value={secondaryHiringOption.filter(
                                                          (item) => item.value === hiring_manager_1
                                                      )}
                                                      options={secondaryHiringOption}
                                                      onChange={(event) => {
                                                          setHiringManager1(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-6 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor=""> Job Portal User</label>
                                                  <Select
                                                      name="job_portal_user"
                                                      options={teameamMembersOption}
                                                      value={teameamMembersOption.filter(
                                                          (item) => item.value === job_portal_user
                                                      )}
                                                      onChange={(event) => {
                                                          setJobPortalUser(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-6 col-sm-6">
                                              <div className="single__input__item">
                                                  <label htmlFor=""> Status of the Job</label>
                                                  <Select
                                                      name="job_status"
                                                      options={statusOption}
                                                      value={statusOption.filter(
                                                          (item) => item.value === job_status
                                                      )}
                                                      onChange={(event) => {
                                                          setJobStatus(event.value);
                                                      }}
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="form__card__body__wrapper pt-4 pb-4 border-0">
                                      <div className="form__buttons__row d-flex align-items-center justify-content-start">
                                          <button
                                              className="common__btn me-3"
                                              type="submit"
                                              disabled={disabled}
                                          >
                                              Create a New Job
                                          </button>
                                          <button className="common__btn gray-btn me-3">
                                              Save a Draft
                                          </button>
                                          <button className="common__btn gray-btn">Canel </button>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </section>
              )}
      </main>
    </>
  )
}