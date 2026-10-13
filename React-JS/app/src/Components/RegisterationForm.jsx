import { useState } from "react";
import "./Registration.css";

function Registration() {

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

    console.log("Form Data:", formData);

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

    <div className="registration-page">

      <div className="registration-container">

        {/* Heading */}

        <div className="form-title">
          Registration Form
        </div>


        <form onSubmit={handleSubmit}>

          {/* Full Name */}

          <div className="field">

            <label>Full Name</label>

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

            <label>Email</label>

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

            <label>Password</label>

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

            <label>Age</label>

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

            <label>Date of Birth</label>

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

            <label>Gender</label>

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

            <label>Select Course</label>

            <select
              className="form-select"
              name="course"
              value={formData.course}
              onChange={handleChange}
            >

              <option value="">
                -- Select Course --
              </option>

              <option value="Java">Java</option>
              <option value="React">React</option>
              <option value="Python">Python</option>
              <option value="Flutter">Flutter</option>

            </select>

          </div>


          {/* Skills */}

          <div className="field skills-field">

            <label>Skills</label>

            <div className="skills">

              {["Java", "React", "Python", "Flutter"].map(
                (skill) => (

                  <div
                    className="form-check"
                    key={skill}
                  >

                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={handleSkills}
                    />

                    <label className="form-check-label">
                      {skill}
                    </label>

                  </div>

                )
              )}

            </div>

          </div>


          {/* Country */}

          <div className="field">

            <label>Country</label>

            <select
              className="form-select"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >

              <option value="">
                -- Select Country --
              </option>

              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">
                Australia
              </option>

            </select>

          </div>


          {/* Address */}

          <div className="field address-field">

            <label>Address</label>

            <textarea
              className="form-control"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />

          </div>


          {/* Website */}

          <div className="field">

            <label>Website</label>

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

            <label>Preferred Time</label>

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

            <label>Favorite Color</label>

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

            <label>Upload Photo</label>

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

  );
}

export default Registration;