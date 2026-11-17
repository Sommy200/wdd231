const spotlightContainer = document.querySelector('#spotlight-cards');
const membersUrl = 'data/members.json'; // Adjust path if needed

async function getSpotlightMembers() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch members: ${response.status}`);
        }
        const data = await response.json();

        // Filter members who have a Gold or Silver membership level
        const qualifiedMembers = data.companies.filter(company =>
            company['membership level'] === 'Gold' || company['membership level'] === 'Silver'
        );

        displaySpotlights(qualifiedMembers);
    } catch (error) {
        console.error('Error loading spotlight data:', error);
        spotlightContainer.innerHTML = `<p>Could not load member spotlights.</p>`;
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = '';

    // Shuffle the qualified members array randomly
    const shuffled = members.sort(() => 0.5 - Math.random());

    // Select 2 or 3 random members (e.g., 2 or 3 depending on preference)
    const selectedMembers = shuffled.slice(0, 3);

    selectedMembers.forEach(company => {
        const card = document.createElement('article');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <img src="${company['imageurl']}" alt="${company['Business Name']} Logo" loading="lazy" width="120" height="70">
            <h3>${company['Business Name']}</h3>
            <p>${company['Address']}</p>
            <p>${company['Phone Number']}</p>
            <p><a href="${company['Website']}" target="_blank" rel="noopener">Visit Website</a></p>
            <p class="level">Membership: ${company['membership level']}</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

// Run the function when the page loads
getSpotlightMembers();