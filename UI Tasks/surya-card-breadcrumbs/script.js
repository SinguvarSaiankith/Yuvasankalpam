const inboxLink = document.getElementById('inbox-link');
const importantLink = document.getElementById('important-link');

inboxLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Clicked on Inbox');
});

importantLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Clicked on Important');
});
