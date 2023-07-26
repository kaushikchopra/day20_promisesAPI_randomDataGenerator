// Function to fetch data from an API using Promises
async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// *********************************************************************************************

// Function to display Chuck Norris jokes
function displayChuckNorrisJoke() {
    const chuckNorrisBtn = document.querySelector('.chuck-norris-btn');
    const chuckNorrisJokeDiv = document.querySelector('.chuck-norris-joke');

    chuckNorrisBtn.addEventListener('click', () => {
        fetch('https://api.chucknorris.io/jokes/random')
            .then((response) => response.json())
            .then((data) => {
                chuckNorrisJokeDiv.textContent = data.value;
            })
            .catch((error) => {
                console.error('Error fetching Chuck Norris joke:', error);
                chuckNorrisJokeDiv.textContent = 'Error fetching Chuck Norris joke';
            });
    });
}

// *********************************************************************************************

// Function to display Random User data
function displayRandomUserData() {
    const randomUserList = document.querySelector('.random-user-list');
    const randomUserBtn = document.querySelector('.random-user-btn');

    randomUserBtn.addEventListener('click', () => {
        fetchData('https://randomuser.me/api/?results=1')
            .then((data) => {
                const user = data.results[0];

                // Clear existing data from the list
                randomUserList.innerHTML = '';

                // Create list items for each user attribute with clear labels and formatting
                const listItemName = document.createElement('li');
                listItemName.innerHTML = `<strong>Name:</strong> ${user.name.title} ${user.name.first} ${user.name.last}`;

                const listItemGender = document.createElement('li');
                listItemGender.innerHTML = `<strong>Gender:</strong> ${user.gender}`;

                const listItemLocation = document.createElement('li');
                listItemLocation.innerHTML = `<strong>Location:</strong> ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}, Latitude: ${user.location.coordinates.latitude}, Longitude: ${user.location.coordinates.longitude}`;

                const listItemEmail = document.createElement('li');
                listItemEmail.innerHTML = `<strong>Email:</strong> ${user.email}`;

                const listItemDateOfBirth = document.createElement('li');
                listItemDateOfBirth.innerHTML = `<strong>Date of Birth:</strong> ${user.dob.date.slice(0, 10)}, Age: ${user.dob.age}`;

                const listItemPhone = document.createElement('li');
                listItemPhone.innerHTML = `<strong>Phone:</strong> Cell: ${user.cell}, Home: ${user.phone}`;

                const listItemNationality = document.createElement('li');
                listItemNationality.innerHTML = `<strong>Nationality:</strong> ${user.nat}`;

                const listItemPicture = document.createElement('li');
                listItemPicture.innerHTML = `<strong>Picture:</strong><br><img src="${user.picture.large}" alt="User Picture">`;

                // Append the list items to the list
                randomUserList.appendChild(listItemName);
                randomUserList.appendChild(listItemGender);
                randomUserList.appendChild(listItemLocation);
                randomUserList.appendChild(listItemEmail);
                randomUserList.appendChild(listItemDateOfBirth);
                randomUserList.appendChild(listItemPhone);
                randomUserList.appendChild(listItemNationality);
                randomUserList.appendChild(listItemPicture);
            });
    });
}

// *********************************************************************************************

// Function to fetch image data from the Picsum Photos API
async function fetchPicsumImage(url) {
    try {
        const response = await fetch(url);
        return await response.blob();
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

// Function to display single random Picsum Photos API image
function displayPicsumImage() {
    const picsumImage = document.querySelector('.picsum-image');
    const paddingFromViewport = 20;

    fetch('https://picsum.photos/800') // Change the URL to get a random image of desired size
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.url;
        })
        .then((imageURL) => {
            picsumImage.src = imageURL;
            picsumImage.alt = 'Random Image'; // Add alt text for accessibility

            // Calculate available width and height in the viewport
            const viewportWidth = window.innerWidth;
            const availableWidth = viewportWidth - paddingFromViewport;
            const availableHeight = window.innerHeight - 40;

            // Set the image width and height based on the available space
            const containerWidth = picsumImage.parentElement.offsetWidth;
            const imageWidth = Math.min(containerWidth, availableWidth);
            const imageHeight = Math.min(containerWidth, availableHeight);

            picsumImage.style.width = `${imageWidth}px`;
            picsumImage.style.height = `${imageHeight}px`;
        })
        .catch((error) => {
            console.error('Error fetching image:', error);
            picsumImage.src = 'error-image.jpg'; // Display a placeholder image for error
            picsumImage.alt = 'Error Image'; // Add alt text for accessibility
        });
}

// Function to handle "Generate Image" button click
function handleGenerateImageClick() {
    const picsumImageBtn = document.querySelector('.picsum-image-btn');
    picsumImageBtn.addEventListener('click', () => {
        displayPicsumImage();
    });
}

// Call the function to handle "Generate Image" button click
handleGenerateImageClick();

// *********************************************************************************************

// Function to scroll smoothly to the target element when a navigation link is clicked
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerOffset = 60; // Adjust this value if there's a fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
}

// Function to set up click event for navigation links
function setupNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor behavior
            const target = link.getAttribute('href');
            smoothScrollTo(target);
        });
    });
}

// *********************************************************************************************

// Function to show/hide the API containers based on the clicked link
function showApiContainer(containerId) {
    const apiContainers = document.querySelectorAll('.api-container');

    apiContainers.forEach((container) => {
        if (container.id === containerId) {
            container.style.display = 'flex';
        } else {
            container.style.display = 'none';
        }
    });
}

// Function to handle navigation link clicks
function handleNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor link behavior
            const targetContainerId = link.getAttribute('href').substring(1);
            showApiContainer(targetContainerId);
        });
    });
}

// Call the function to handle navigation link clicks
handleNavLinks();

// Initially show the first API container (Random User Data)
document.getElementById('random-user-container').style.display = 'flex';

// *********************************************************************************************

document.addEventListener('DOMContentLoaded', () => {
    displayRandomUserData();
    displayChuckNorrisJoke();
    displayPicsumImage();
    setupNavLinks();
});
