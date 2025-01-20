document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const departmentSelect = document.querySelector('[name="department"]');
    const locationSelect = document.querySelector('[name="location"]');
    const jobCards = document.querySelectorAll('.job-card');

    function populateFilters() {
        const departments = new Set();
        const locations = new Set();

        jobCards.forEach(function(job) {
            const jobDepartment = job.querySelector('.job-department').textContent.trim();
            const jobLocation = job.querySelector('.job-badge').textContent.trim();

            departments.add(jobDepartment);
            locations.add(jobLocation);
        });

        departments.forEach(function(dept) {
            const option = document.createElement('option');
            option.value = dept.toLowerCase();
            option.textContent = dept;
            departmentSelect.appendChild(option);
        });

        locations.forEach(function(loc) {
            const option = document.createElement('option');
            option.value = loc.toLowerCase();
            option.textContent = loc;
            locationSelect.appendChild(option);
        });
    }

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedDepartment = departmentSelect.value.toLowerCase();
        const selectedLocation = locationSelect.value.toLowerCase();

        jobCards.forEach(function(job) {
            const jobTitle = job.querySelector('.job-title-group h3').textContent.toLowerCase();
            const jobDepartment = job.querySelector('.job-department').textContent.toLowerCase();
            const jobLocation = job.querySelector('.job-badge').textContent.toLowerCase();

            if (
                (jobTitle.includes(searchTerm) || searchTerm === '') &&
                (jobDepartment.includes(selectedDepartment) || selectedDepartment === '') &&
                (jobLocation.includes(selectedLocation) || selectedLocation === '')
            ) {
                job.style.display = '';
            } else {
                job.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterJobs);
    departmentSelect.addEventListener('change', filterJobs);
    locationSelect.addEventListener('change', filterJobs);

    populateFilters(); 
});
