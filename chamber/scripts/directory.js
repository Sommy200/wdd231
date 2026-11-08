const url = 'data/members.json';
const directory = document.querySelector('#directory');
const gridButton = document.querySelector('#grid-btn');
const listButton = document.querySelector('#list-btn');

async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.companies);
    } catch (error) {
        directory.innerHTML = `<p>Sorry, the member directory could not be loaded.</p>`;
        console.error(error);
    }
}

function displayMembers(companies) {
    directory.innerHTML = '';

    companies.forEach(company => {
        const card = document.createElement('article');
        card.classList.add('member-card');

        card.innerHTML = `
            <img src="${company['imageurl']}" alt="${company['Business Name']} logo" loading="lazy" width="120" height="80">
            <div class="member-info">
                <h2>${company['Business Name']}</h2>
                <p>${company['Address']}</p>
                <p>${company['Phone Number']}</p>
                <p><a href="${company['Website']}">Visit website</a></p>
                <p class="level">Membership: ${company['membership level']}</p>
            </div>`;

        directory.appendChild(card);
    });
}

function setView(view) {
    const isGrid = view === 'grid';
    directory.classList.toggle('grid', isGrid);
    directory.classList.toggle('list', !isGrid);
    gridButton.setAttribute('aria-pressed', `${isGrid}`);
    listButton.setAttribute('aria-pressed', `${!isGrid}`);
}

gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

getMembers();