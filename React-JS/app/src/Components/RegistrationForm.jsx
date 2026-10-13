import { useState } from "react";

const styles = "* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font-family: \"Segoe UI\", Arial, sans-serif;\n}\n\n\n/* Whole page */\n\n.registration-page {\n  min-height: 100vh;\n  background-color: #f0f3ff;\n  padding: 38px 20px;\n}\n\n\n/* Main form */\n\n.registration-container {\n  width: 82%;\n  max-width: 930px;\n  margin: 0 auto;\n  padding: 20px 35px 28px;\n\n  background-color: rgba(255, 255, 255, 0.55);\n\n  border: 1px solid #e2e2e2;\n  border-radius: 3px;\n\n  box-shadow:\n    0 2px 8px rgba(0, 0, 0, 0.05);\n}\n\n\n/* Yellow heading */\n\n.form-title {\n  width: 100%;\n\n  background-color: #e9aa24;\n\n  color: #333;\n\n  text-align: center;\n\n  font-size: 27px;\n\n  padding: 8px 10px;\n\n  margin-bottom: 24px;\n}\n\n\n/* Every field */\n\n.field {\n  margin-bottom: 20px;\n}\n\n\n/* Labels */\n\n.field > label,\n.color-field > label,\n.experience-field > label {\n  display: block;\n\n  font-size: 14px;\n\n  color: #333;\n\n  margin-bottom: 8px;\n}\n\n\n/* Bootstrap inputs */\n\n.registration-container .form-control,\n.registration-container .form-select {\n  min-height: 40px;\n\n  border: 1px solid #e0e0e0;\n\n  border-radius: 5px;\n\n  background-color: rgba(255, 255, 255, 0.45);\n\n  font-size: 14px;\n\n  padding: 9px 12px;\n\n  box-shadow: none;\n}\n\n\n/* Focus */\n\n.registration-container .form-control:focus,\n.registration-container .form-select:focus {\n  border-color: #bfc7df;\n\n  box-shadow: none;\n}\n\n\n/* Gender */\n\n.gender-field {\n  margin-top: 4px;\n}\n\n.gender-options {\n  display: flex;\n\n  align-items: center;\n\n  gap: 30px;\n\n  margin-top: 3px;\n}\n\n.gender-options .form-check {\n  margin: 0;\n}\n\n\n/* Skills */\n\n.skills {\n  display: flex;\n\n  flex-direction: column;\n\n  gap: 8px;\n\n  margin-top: 4px;\n}\n\n.skills .form-check {\n  margin: 0;\n}\n\n\n/* Checkbox / radio */\n\n.form-check-input {\n  cursor: pointer;\n}\n\n.form-check-label {\n  cursor: pointer;\n\n  font-size: 14px;\n}\n\n\n/* Address */\n\n.address-field textarea {\n  height: 125px;\n\n  resize: none;\n}\n\n\n/* Color */\n\n.color-field {\n  display: flex;\n\n  align-items: center;\n\n  gap: 8px;\n\n  margin-top: 4px;\n\n  margin-bottom: 20px;\n}\n\n.color-field label {\n  margin: 0;\n}\n\n.color-field .form-control-color {\n  width: 45px;\n\n  height: 30px;\n\n  padding: 2px;\n\n  border-radius: 2px;\n}\n\n\n/* Experience */\n\n.experience-field {\n  margin-bottom: 22px;\n}\n\n.experience-field label {\n  margin-bottom: 7px;\n}\n\n\n/* Range */\n\n.experience-field .form-range {\n  width: 100%;\n\n  margin: 0;\n\n  cursor: pointer;\n}\n\n\n/* Upload */\n\n.registration-container input[type=\"file\"] {\n  padding: 7px 10px;\n\n  height: 40px;\n}\n\n\n/* Terms */\n\n.terms-field {\n  margin-top: 5px;\n\n  margin-bottom: 24px;\n\n  padding-left: 5px;\n}\n\n\n/* Buttons */\n\n.buttons {\n  display: flex;\n\n  justify-content: center;\n\n  align-items: center;\n\n  gap: 10px;\n\n  margin-top: 4px;\n}\n\n.buttons .btn {\n  padding: 8px 15px;\n\n  font-size: 14px;\n\n  border-radius: 5px;\n}\n\n\n/* Register */\n\n.buttons .btn-primary {\n  background-color: #0d6efd;\n\n  border-color: #0d6efd;\n}\n\n\n/* Reset */\n\n.buttons .btn-secondary {\n  background-color: #596273;\n\n  border-color: #596273;\n}\n\n\n/* Mobile */\n\n@media (max-width: 768px) {\n\n  .registration-page {\n    padding: 20px 10px;\n  }\n\n  .registration-container {\n    width: 100%;\n\n    padding: 18px 20px 25px;\n  }\n\n  .form-title {\n    font-size: 23px;\n  }\n\n  .gender-options {\n    gap: 15px;\n  }\n\n}";

function RegistrationForm() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    gender: "",
    course: "",
    skills: [],
    country: "",
    address: "",
    website: "https://example.com",
    preferredTime: "",
    favoriteColor: "#000000",
    experience: 0,
    photo: null,
    terms: false
  });


  // Normal input handler
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // Gender
  const handleGender = (e) => {

    setFormData({
      ...formData,
      gender: e.target.value
    });

  };


  // Skills
  const handleSkills = (e) => {

    const { value, checked } = e.target;

    if (checked) {

      setFormData({
        ...formData,
        skills: [...formData.skills, value]
      });

    } else {

      setFormData({
        ...formData,
        skills: formData.skills.filter(
          (skill) => skill !== value
        )
      });

    }

  };


  // Photo
  const handlePhoto = (e) => {

    setFormData({
      ...formData,
      photo: e.target.files[0]
    });

  };


  // Terms
  const handleTerms = (e) => {

    setFormData({
      ...formData,
      terms: e.target.checked
    });

  };


  // Submit
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.fullName) {
      alert("Please enter your name");
      return;
    }

    if (!formData.email) {
      alert("Please enter your email");
      return;
    }

    if (!formData.password) {
      alert("Please enter your password");
      return;
    }

    if (!formData.age) {
      alert("Please enter your age");
      return;
    }

    if (!formData.dob) {
      alert("Please select your date of birth");
      return;
    }

    if (!formData.gender) {
      alert("Please select gender");
      return;
    }

    if (!formData.course) {
      alert("Please select course");
      return;
    }

    if (!formData.country) {
      alert("Please select country");
      return;
    }

    if (!formData.terms) {
      alert("Please accept Terms and Conditions");
      return;
    }

    console.log(formData);

    alert("Registration Successful!");

  };


  // Reset
  const handleReset = () => {

    setFormData({
      fullName: "",
      email: "",
      password: "",
      age: "",
      dob: "",
      gender: "",
      course: "",
      skills: [],
      country: "",
      address: "",
      website: "https://example.com",
      preferredTime: "",
      favoriteColor: "#000000",
      experience: 0,
      photo: null,
      terms: false
    });

    document.getElementById("photo").value = "";

  };


  return (
    <>
      <style>{styles}</style>
      <div className="registration-page">

      <div className="registration-container">

        {/* Heading */}

        <div className="form-title">
          Registration Form
        </div>


        <form onSubmit={handleSubmit}>


          {/* Full Name */}

          <div className="field">

            <label>
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
            />

          </div>


          {/* Email */}

          <div className="field">

            <label>
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>


          {/* Password */}

          <div className="field">

            <label>
              Password
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>


          {/* Age */}

          <div className="field">

            <label>
              Age
            </label>

            <input
              type="number"
              className="form-control"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />

          </div>


          {/* Date of Birth */}

          <div className="field">

            <label>
              Date of Birth
            </label>

            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />

          </div>


          {/* Gender */}

          <div className="field gender-field">

            <label>
              Gender
            </label>

            <div className="gender-options">

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleGender}
                />

                <label className="form-check-label">
                  Male
                </label>
              </div>


              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleGender}
                />

                <label className="form-check-label">
                  Female
                </label>
              </div>


              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleGender}
                />

                <label className="form-check-label">
                  Other
                </label>
              </div>

            </div>

          </div>


          {/* Course */}

          <div className="field">

            <label>
              Select Course
            </label>

            <select
              className="form-select"
              name="course"
              value={formData.course}
              onChange={handleChange}
            >

              <option value="">
                -- Select Course --
              </option>

              <option value="Java">
                Java
              </option>

              <option value="React">
                React
              </option>

              <option value="Python">
                Python
              </option>

              <option value="Flutter">
                Flutter
              </option>

            </select>

          </div>


          {/* Skills */}

          <div className="field skills-field">

            <label>
              Skills
            </label>

            <div className="skills">

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Java"
                  checked={formData.skills.includes("Java")}
                  onChange={handleSkills}
                />

                <label className="form-check-label">
                  Java
                </label>
              </div>


              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="React"
                  checked={formData.skills.includes("React")}
                  onChange={handleSkills}
                />

                <label className="form-check-label">
                  React
                </label>
              </div>


              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Python"
                  checked={formData.skills.includes("Python")}
                  onChange={handleSkills}
                />

                <label className="form-check-label">
                  Python
                </label>
              </div>


              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Flutter"
                  checked={formData.skills.includes("Flutter")}
                  onChange={handleSkills}
                />

                <label className="form-check-label">
                  Flutter
                </label>
              </div>

            </div>

          </div>


          {/* Country */}

          <div className="field">

            <label>
              Country
            </label>

            <select
              className="form-select"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >

              <option value="">
                -- Select Country --
              </option>

              <option value="India">
                India
              </option>

              <option value="USA">
                USA
              </option>

              <option value="UK">
                UK
              </option>

              <option value="Canada">
                Canada
              </option>

              <option value="Australia">
                Australia
              </option>

            </select>

          </div>


          {/* Address */}

          <div className="field address-field">

            <label>
              Address
            </label>

            <textarea
              className="form-control"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>

          </div>


          {/* Website */}

          <div className="field">

            <label>
              Website
            </label>

            <input
              type="url"
              className="form-control"
              name="website"
              placeholder="https://example.com"
              value={formData.website}
              onChange={handleChange}
            />

          </div>


          {/* Preferred Time */}

          <div className="field">

            <label>
              Preferred Time
            </label>

            <input
              type="time"
              className="form-control"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
            />

          </div>


          {/* Favorite Color */}

          <div className="color-field">

            <label>
              Favorite Color
            </label>

            <input
              type="color"
              className="form-control form-control-color"
              name="favoriteColor"
              value={formData.favoriteColor}
              onChange={handleChange}
            />

          </div>


          {/* Experience */}

          <div className="experience-field">

            <label>
              Experience: {formData.experience} Years
            </label>

            <input
              type="range"
              className="form-range"
              name="experience"
              min="0"
              max="20"
              value={formData.experience}
              onChange={handleChange}
            />

          </div>


          {/* Upload */}

          <div className="field">

            <label>
              Upload Photo
            </label>

            <input
              id="photo"
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handlePhoto}
            />

          </div>


          {/* Terms */}

          <div className="terms-field">

            <div className="form-check">

              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                checked={formData.terms}
                onChange={handleTerms}
              />

              <label
                className="form-check-label"
                htmlFor="terms"
              >
                I agree to the Terms and Conditions
              </label>

            </div>

          </div>


          {/* Buttons */}

          <div className="buttons">

            <button
              type="submit"
              className="btn btn-primary"
            >
              Register
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>


        </form>

      </div>
      </div>
    </>
  );
}

export default RegistrationForm;