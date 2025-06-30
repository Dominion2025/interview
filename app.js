// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAHFztjK8Mp04w0yXqrrh69WEdtkB1WFmQ",
	authDomain: "interview-bf18a.firebaseapp.com",
	projectId: "interview-bf18a",
	storageBucket: "interview-bf18a.firebasestorage.app",
	messagingSenderId: "607504520913",
	appId: "1:607504520913:web:94b9af6e7119e228d7d7f0",
	measurementId: "G-NMNVDLSXZP",
	databaseURL: "https://interview-bf18a-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

const form = document.getElementById("multiForm");
const sections = document.querySelectorAll(".form-section");
const nextBtn = document.querySelectorAll(".next-btn");
const confirmation = document.getElementById("confirmation");

document.getElementById("projectDescription").addEventListener("input", function () {
	const textarea = document.getElementById("projectDescription");
	const maxWords = 150;
	const words = textarea.value.trim().split(/\s+/).filter(Boolean);
	const wordCount = words.length;
	const msg = document.getElementById('word-count-msg');
	if (wordCount > maxWords) {
		textarea.value = words.slice(0, maxWords).join(' ');
		msg.textContent = `Word limit reached (${maxWords} words).`;
	} else {
		msg.textContent = `${wordCount}/${maxWords} words`;
	}
});

document.getElementById("finalThoughts").addEventListener("input", function () {
	const textarea = document.getElementById("finalThoughts");
	const maxWords = 100;
	const words = textarea.value.trim().split(/\s+/).filter(Boolean);
	const wordCount = words.length;
	const msg = document.getElementById('word-count-msg-thoughts');
	if (wordCount > maxWords) {
		textarea.value = words.slice(0, maxWords).join(' ');
		msg.textContent = `Word limit reached (${maxWords} words).`;
	} else {
		msg.textContent = `${wordCount}/${maxWords} words`;
	}
});

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const data = {
		firstName: form.firstName.value,
		lastName: form.lastName.value,
		prefName: form.prefName.value,
		email: form.email.value,
		phone: form.phone.value,
		location: form.location.value,
		linkedin: form.linkedin.value,
		citizenship: form.citizenship.value,
		education: form.education.value,
		educationOther: form.educationOther.value,
		school: form.school.value,
		major: form.major.value,
		gradDate: form.gradDate.value,
		gpa: form.gpa.value,
		certifications: form.certifications.value,
		careerInterests: Array.from(form.careerInterests).filter(checkbox => checkbox.checked),
		careerInterestsOther: form.careerInterestsOther.value,
		securityInterests: Array.from(form.securityInterests).filter(checkbox => checkbox.checked),
		securityInterestsOther: form.securityInterestsOther.value,
		msft: form.msft.value,
		msftYes: form.msftYes.value,
		relocation: form.relocation.value,
		skills: form.skills.value,
		projectDescription: form.projectDescription.value,
		resume: form.resumeLink.value,
		availability: Array.from(form.availability).filter(checkbox => checkbox.checked),
		interview: form.interview.value,
		finalThoughts: form.finalThoughts.value,
		additionalInfo: form.additionalInfo.value
	};

	try {
		// Generate a unique ID using name, email, and phone (simple hash)
		const idSource = `${data.firstName}|${data.lastName}|${data.email}|${data.phone}`;
		const id = btoa(decodeURIComponent(encodeURIComponent(idSource))).replace(/=+$/, ''); // base64 encode, remove padding
		const userRef = ref(db, `users/${id}`);
		set(userRef, data);
		document.getElementById('multiForm').style.display = 'none';
		document.getElementById('confirmation').style.display = 'block';
	} catch (error) {
		alert("Error submitting form: " + error.message);
	}
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('multiForm').style.display = 'none'; // Hide the form initially
	document.getElementById('confirmation').style.display = 'none'; // Hide the form initially

	document.getElementById('startBtn').addEventListener('click', function () {
		document.getElementById('welcome').style.display = 'none';
		document.getElementById('multiForm').style.display = 'block'; // Show the form
	});

	
	const eduOtherInput = document.getElementById('education-other-input');
	const eduFieldset = document.getElementById('education-fieldset') || form; // Use a fieldset if available, else form

	eduFieldset.addEventListener('change', function (e) {
		if (e.target.name === 'education') {
			if (e.target.value === 'Other') {
				eduOtherInput.style.display = 'inline-block';
				eduOtherInput.required = true;
			} else {
				eduOtherInput.style.display = 'none';
				eduOtherInput.required = false;
				eduOtherInput.value = '';
			}
		}
	});

	const certYesRadio = document.getElementById('certifications-yes-radio');
	const certYesInput = document.getElementById('certifications-yes-input');
	const certRadios = document.querySelectorAll('input[name="certifications"]');
	certRadios.forEach(radio => {
		radio.addEventListener('change', function () {
			if (certYesRadio.checked) {
				certYesInput.style.display = 'inline-block';
				certYesInput.required = true;
			} else {
				certYesInput.style.display = 'none';
				certYesInput.required = false;
				certYesInput.value = '';
			}
		});
	});

	const careerOtherRadio = document.getElementById('career-interests-other-check');
	const careerOtherInput = document.getElementById('career-interests-other-input');
	const careerCheckboxes = document.querySelectorAll('input[name="careerInterests"]');
	careerCheckboxes.forEach(checkbox => {
		checkbox.addEventListener('change', function () {
			if (careerOtherRadio.checked) {
				careerOtherInput.style.display = 'inline-block';
				careerOtherInput.required = true;
			} else {
				careerOtherInput.style.display = 'none';
				careerOtherInput.required = false;
				careerOtherInput.value = '';
			}
		});
	});

	const securityOtherRadio = document.getElementById('security-interests-other-check');
	const securityOtherInput = document.getElementById('security-interests-other-input');
	const securityCheckboxes = document.querySelectorAll('input[name="securityInterests"]');
	securityCheckboxes.forEach(checkbox => {
		checkbox.addEventListener('change', function () {
			if (securityOtherRadio.checked) {
				securityOtherInput.style.display = 'inline-block';
				securityOtherInput.required = true;
			} else {
				securityOtherInput.style.display = 'none';
				securityOtherInput.required = false;
				securityOtherInput.value = '';
			}
		});
	});

	const msftYesRadio = document.getElementById('msft-yes-radio');
	const msftYesInput = document.getElementById('msft-yes-input');
	const msftRadios = document.querySelectorAll('input[name="msft"]');
	msftRadios.forEach(radio => {
		radio.addEventListener('change', function () {
			if (msftYesRadio.checked) {
				msftYesInput.style.display = 'inline-block';
				msftYesInput.required = true;
			} else {
				msftYesInput.style.display = 'none';
				msftYesInput.required = false;
				msftYesInput.value = '';
			}
		});
	});
});