document.getElementById('registerBtn').addEventListener('click', () => {
    window.location.href = 'registration.html';
});

document.getElementById('getStarted').addEventListener('click', () => {
    // Display the skill filter dropdown and Load Data button
    document.getElementById('title').style.display = 'none';
    document.getElementById('skillFilter').style.display = 'block';
    document.getElementById('districtFilter').style.display = 'block';
    document.getElementById('loadData').style.display = 'block';
    // Hide the Get Started button after it's clicked
    document.getElementById('getStarted').style.display = 'none';
});

document.getElementById('loadData').addEventListener('click', () => {
const selectedSkill = document.getElementById('skillFilter').value;
const selectedDistrict = document.getElementById('districtFilter').value;
document.getElementById('title').style.display = 'none';

let url = '/get_laborers';

// Add skill parameter if not 'all'
if (selectedSkill !== 'all') {
url += `?skill=${selectedSkill}`;
}

// Add district parameter if not 'all'
if (selectedDistrict !== 'all') {
// Check if URL already has a '?' indicating an existing parameter
url += url.includes('?') ? '&' : '?';
url += `district=${selectedDistrict}`;
}

fetch(url)
.then(response => response.json())
.then(data => {
    const dataDiv = document.getElementById('data');
    let tableHTML = "<table><tr><th>Name</th><th>Skill</th><th>District</th><th>Mobile Number</th></tr>";
    data.forEach(labour => {
        tableHTML += `<tr><td>${labour.name}</td><td>${labour.skill}</td><td>${labour.district}</td><td>${labour.mobileNumber}</td></tr>`;
    });
    tableHTML += "</table>";
    dataDiv.innerHTML = tableHTML;
    document.getElementById('data').style.display = 'block';
    document.getElementById('hideData').style.display = 'block';
})
.catch(error => console.error('Error:', error));
});


// Hide data and hideData button
document.getElementById('hideData').addEventListener('click', () => {

    // Hide the data
    document.getElementById('data').style.display = 'none';
    // Hide the hideData button itself
    document.getElementById('hideData').style.display = 'none';
    // Also hide the skill filter dropdown and Load Data button
    document.getElementById('skillFilter').style.display = 'none';
    document.getElementById('districtFilter').style.display = 'none';
    document.getElementById('loadData').style.display = 'none';
    // Show the Get Started button again
    document.getElementById('getStarted').style.display = 'block';
});