
function addButtonsToJobCard(article) {
    if (article.querySelector('.job-actions')) {
        return;
    }

    const titleEl = article.querySelector('h3');
    const companyEl = article.querySelector('p strong');
    const locationEl = article.querySelectorAll('p')[1]; 
    const salaryEl = article.querySelectorAll('p')[2]; 
    
    let currentTitle = titleEl ? titleEl.textContent : '';
    let currentCompany = companyEl ? companyEl.textContent : '';
    let currentLocation = locationEl ? locationEl.textContent : '';
    let currentSalary = salaryEl ? salaryEl.textContent : '';
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'job-actions';
    
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.className = 'update-btn';
    updateBtn.onclick = function(e) {
        e.preventDefault();

        const newTitle = prompt('Enter new job title:', currentTitle);
        if (newTitle && newTitle.trim() !== '') {
            currentTitle = newTitle;
            if (titleEl) titleEl.textContent = currentTitle;
        }
        
        const newCompany = prompt('Enter new company name:', currentCompany);
        if (newCompany && newCompany.trim() !== '') {
            currentCompany = newCompany;
            if (companyEl) companyEl.innerHTML = `<strong>${currentCompany}</strong>`;
        }
        
        const newLocation = prompt('Enter new location:', currentLocation);
        if (newLocation && newLocation.trim() !== '') {
            currentLocation = newLocation;
            if (locationEl) locationEl.textContent = currentLocation;
        }

        const newSalary = prompt('Enter new salary:', currentSalary);
        if (newSalary && newSalary.trim() !== '') {
            currentSalary = newSalary;
            if (salaryEl) salaryEl.textContent = currentSalary;
        }
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this job posting?')) {
            article.remove();
        }
    };
    
    buttonsDiv.appendChild(updateBtn);
    buttonsDiv.appendChild(deleteBtn);
    
    const applyLink = article.querySelector('a');
    if (applyLink) {
        article.insertBefore(buttonsDiv, applyLink);
    } else {
        article.appendChild(buttonsDiv);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const jobArticles = document.querySelectorAll('.jobs-container article');
    console.log('Found', jobArticles.length, 'job articles'); 
    jobArticles.forEach(article => {
        addButtonsToJobCard(article);
    });
});