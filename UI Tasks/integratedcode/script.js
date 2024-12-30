document.addEventListener('DOMContentLoaded', function() {
    // Date Picker
    const dateInput = document.querySelector('.date-input');
    const dateToggle = document.querySelector('.date-toggle');
    const calendar = document.querySelector('.calendar');

    dateToggle.addEventListener('click', function() {
        if (calendar.style.display === 'none') {
            calendar.style.display = 'block';
            renderCalendar();
        } else {
            calendar.style.display = 'none';
        }
    });

    function renderCalendar() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        let html = '<table><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>';

        for (let i = 0; i < firstDay.getDay(); i++) {
            html += '<td></td>';
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            if ((i + firstDay.getDay() - 1) % 7 === 0) {
                html += '</tr><tr>';
            }
            html += `<td><button class="calendar-day">${i}</button></td>`;
        }

        html += '</tr></table>';
        calendar.innerHTML = html;

        const dayButtons = calendar.querySelectorAll('.calendar-day');
        dayButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedDate = new Date(year, month, parseInt(this.textContent));
                dateInput.value = selectedDate.toLocaleDateString();
                calendar.style.display = 'none';
            });
        });
    }

    // Breadcrumbs
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

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }

    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // New Radio and Checkbox functionality
    const singleCheckboxes = document.querySelectorAll('.singlecheck .checkbox-input');
    const multipleCheckboxes = document.querySelectorAll('.multiplecheck .checkbox-input');
    const sessionCheckboxes = document.querySelectorAll('.succ .checkbox-input');

    singleCheckboxes.forEach(input => {
        input.addEventListener('change', (event) => {
            let checkedCount = 0;
            singleCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    checkedCount++;
                }
            });
            if (checkedCount > 1) {
                input.checked = false;
                alert('You can only select one option.');
            } else {
                singleCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        checkbox.nextElementSibling.style.backgroundColor = '#d1e7dd';
                    } else {
                        checkbox.nextElementSibling.style.backgroundColor = '#fff';
                    }
                });
            }
        });
    });

    multipleCheckboxes.forEach(input => {
        input.addEventListener('change', (event) => {
            if (input.checked) {
                input.nextElementSibling.style.backgroundColor = '#d1e7dd';
            } else {
                input.nextElementSibling.style.backgroundColor = '#fff';
            }
        });
    });

    // Star rating functionality
    const stars = document.querySelectorAll('.star');
    const starContainer = document.getElementById('star-container');

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            resetStars();
            highlightStars(star.dataset.value);
        });
        star.addEventListener('click', () => {
            setRating(star.dataset.value);
        });
    });

    starContainer.addEventListener('mouseleave', resetStars);

    function resetStars() {
        stars.forEach(star => {
            if (!star.classList.contains('selected')) {
                star.style.fill = '#ccc';
            }
        });
    }

    function highlightStars(value) {
        stars.forEach(star => {
            if (star.dataset.value <= value) {
                star.style.fill = 'gold';
            }
        });
    }

    function setRating(value) {
        stars.forEach(star => {
            if (star.dataset.value <= value) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    // Avatar functionality
    const avatarTextContainer = document.getElementById('avatars-text');
    const avatarImageContainer = document.getElementById('avatars-image');
    const sizesContainer = document.getElementById('sizes');
    const variantsContainer = document.getElementById('variants');

    // Avatar with Text
    const avatarTextData = [
        { text: 'H', color: 'orange' },
        { text: 'N', color: 'green' },
        { text: 'OP', color: 'blue' }
    ];
    avatarTextContainer.innerHTML = avatarTextData
        .map(data => `<div class="avatar" style="background-color: ${data.color}">${data.text}</div>`)
        .join('');

    // Avatar with Images
    const avatarImageData = [
        { type: 'image', src: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { type: 'image', src: 'https://randomuser.me/api/portraits/men/45.jpg' },
        { type: 'image', src: 'https://randomuser.me/api/portraits/women/44.jpg' }
    ];
    avatarImageData.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('avatar', data.type);
        if (data.type === 'image') {
            const img = document.createElement('img');
            img.src = data.src;
            div.appendChild(img);
        }
        avatarImageContainer.appendChild(div);
    });

    // Different Sizes
    const sizes = {
        small: { width: 30, height: 30 },
        medium: { width: 50, height: 50 },
        large: { width: 70, height: 70 },
    };
    Object.keys(sizes).forEach(size => {
        const img = document.createElement('img');
        img.src = 'https://randomuser.me/api/portraits/men/32.jpg';
        img.alt = `${size} Avatar`;
        img.style.width = `${sizes[size].width}px`;
        img.style.height = `${sizes[size].height}px`;
        img.className = 'avatar';
        sizesContainer.appendChild(img);
    });

    // Variants
    const variants = [
        { type: 'text', text: 'N', color: 'red' },
        { type: 'icon', icon: '📋', color: 'green' },
    ];
    variants.forEach(variant => {
        const div = document.createElement('div');
        div.classList.add('variant', variant.color);
        if (variant.type === 'text') {
            div.textContent = variant.text;
        } else if (variant.type === 'icon') {
            div.innerHTML = `<span class="icon">${variant.icon}</span>`;
        }
        variantsContainer.appendChild(div);
    });

    // Text Input functionality
    const userInput = document.getElementById('userInput');
    const outputTextElement = document.querySelector('.output-text');

    userInput.addEventListener('input', function() {
        const userInputValue = this.value;
        
        if (userInputValue.trim() === '') {
            outputTextElement.textContent = '';
            return;
        }
        
        const randomGradient = `linear-gradient(${Math.random() * 360}deg, #${Math.floor(Math.random() * 16777215).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})`;
        outputTextElement.style.background = randomGradient;
        outputTextElement.style.WebkitBackgroundClip = "text";
        outputTextElement.textContent = userInputValue;
    });

    // Dropdown functionality
    const squareBox = document.querySelector('.square-box');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownIcon = document.querySelector('.dropdown-icon');

    squareBox.addEventListener('click', function() {
        const isVisible = dropdownContent.style.display === 'block';
        dropdownContent.style.display = isVisible ? 'none' : 'block';
        dropdownIcon.textContent = isVisible ? '˅' : '˄';
    });
});