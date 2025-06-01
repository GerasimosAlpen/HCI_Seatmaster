        // Login system
        let isLoggedIn = false;

        // function login() {
        //     const username = prompt('Enter username:');
        //     const password = prompt('Enter password:');
            
        //     // Simple validation (in real app, this would be server-side)
        //     if (username && password) {
        //         isLoggedIn = true;
        //         document.getElementById('username').textContent = username;
        //         document.getElementById('loginStatus').style.display = 'block';
                
        //         // Remove blur from all ticket cards
        //         const ticketCards = document.querySelectorAll('.ticket-card');
        //         ticketCards.forEach(card => {
        //             card.classList.add('unlocked');
        //         });
                
        //         alert('Login successful! Ticket section is now unlocked.');
        //     } else {
        //         alert('Please enter both username and password.');
        //     }
        // }

        // function logout() {
        //     isLoggedIn = false;
        //     document.getElementById('loginStatus').style.display = 'none';
            
        //     // Add blur back to all ticket cards
        //     const ticketCards = document.querySelectorAll('.ticket-card');
        //     ticketCards.forEach(card => {
        //         card.classList.remove('unlocked');
        //     });
            
        //     alert('Logged out successfully. Ticket section is now locked.');
        // }

        // Handle login button click
        document.querySelector('.login-btn').addEventListener('click', (e) => {
            e.preventDefault();
            if (!isLoggedIn) {
                login();
            }
        });

        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(107, 115, 163, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#6B73A3';
                header.style.backdropFilter = 'none';
            }
        });

        // Ticket card interaction
        const ticketCards = document.querySelectorAll('.ticket-card');
        ticketCards.forEach(card => {
            card.addEventListener('click', () => {
                if (!isLoggedIn) {
                    alert('Please login first to access ticket purchasing.');
                    login();
                } else if (card.classList.contains('locked-content')) {
                    alert('This content is locked. Please upgrade your account to access this feature.');
                } else {
                    alert('Redirecting to ticket purchase page...');
                }
            });
        });