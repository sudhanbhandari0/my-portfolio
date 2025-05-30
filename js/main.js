// Mouse trail effect
function createMouseTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);

    // Remove the trail element after animation
    setTimeout(() => {
        trail.remove();
    }, 1000);
}

// Throttle function to limit the rate at which createMouseTrail is called
function throttle(func, limit) {
    let inThrottle;
    return function(e) {
        if (!inThrottle) {
            func(e);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add mouse trail effect
document.addEventListener('mousemove', throttle(createMouseTrail, 50));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-grid > div');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.textContent.toLowerCase().trim();

        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
            } else {
                const itemCategory = item.getAttribute('data-category');
                item.style.display = itemCategory === filterValue ? 'block' : 'none';
            }
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
        navbar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        try {
            const res = await fetch('https://my-portfolio-1-shb3.onrender.com/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            alert(result.success ? 'Message sent!' : (result.error || 'Failed to send message.'));
            if (result.success) this.reset();
        } catch (err) {
            alert('Failed to send message. Please try again later.');
        }
    });
}

// Add animation class when elements come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.75) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Mobile menu toggle (if needed for responsive design)
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });
}

// Project Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.querySelector('.close-modal');

    // Move modal to body level
    if (modal && modal.parentElement !== document.body) {
        document.body.appendChild(modal);
    }

    // Store last focused element
    let lastFocusedElement = null;

    // Get all focusable elements in modal
    const getFocusableElements = () => {
        return modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    };

    // Check if all required elements exist
    if (!modal || !modalTitle || !modalDetails || !closeModal) {
        console.warn('Some modal elements are missing from the DOM');
        return;
    }

    // Project details data
    const projectDetails = {
        'FishTank': [
            'Architected and developed FishTank, a full-stack decentralized project funding platform on Solana.',
            'Integrated AI (OpenAI) for project analysis, NFTs for unique project representation, and IPFS/NFT Storage for decentralized data.',
            'Engineered core functionalities including secure on-chain funding transactions via Solana smart contracts.',
            'Implemented a responsive frontend with real-time updates and comprehensive investor portfolio tracking.',
            'Ensured platform security through on-chain ownership verification and secure wallet integration.'
        ],
        '48V Smart BMS': [
            'Designed a 48V BMS with telemetry, utilizing an NXP S32K344 microcontroller, wireless, and Bluetooth modules for advanced connectivity.',
            'Implemented a multi‑output power supply with efficient 12V→5V, 3.8V, and 1.8V buck converters.',
            'Integrated CAN, LIN, USB, wireless & Bluetooth protocols for real‑time diagnostics.',
            'Incorporated the FS26 safety chip for robust fault detection & reliability.'
        ],
        'AI Football Analysis': [
            'Developed an AI-powered football analysis system using Python, employing a custom-trained YOLOv5 model for robust multi-object (players, ball, referees) detection and tracking in match videos.',
            'Engineered automated team assignment by applying K-means clustering for jersey color segmentation, enabling the calculation of dynamic team ball possession statistics throughout a match.',
            'Integrated Optical Flow for camera motion compensation and Perspective Transformation to accurately measure player speed and distance covered in real-world units (meters), enhancing analytic precision.',
            'Orchestrated a comprehensive computer vision pipeline leveraging OpenCV, NumPy, and Pandas to extract actionable insights from football footage, demonstrating proficiency in object detection, segmentation, and motion analysis techniques.'
        ]
    };

    // Expertise details data
    const expertiseDetails = {
        'Assistant Engineer (Network)': [
            'Assistant Engineer: Traffic System and Network',
            'City of Albuquerque, Albuquerque, NM Sept 2023 - Oct 2024',
            '• Analyzed traffic data exported from Centracs SQL Server into MS Excel, and adjusted timing and coordination plans based on intersection requirements to optimize traffic flow and signal efficiency.',
            '• Managed network communication for 500+ traffic signals, including troubleshooting, updates, and redundancy. Tracked IPs and VLANs in Excel and documented changes for standardization.',
            '• Created detailed documentation for changes to intersection traffic plans and network configurations, and delivered monthly presentations to department teams and contractors to communicate updates and ensure alignment on system modifications.',
            '• Collaborated with cross-functional teams to enhance system reliability, achieve operational goals, and effectively communicate technical updates to departments and contractors.'
        ],
        'Embedded Engineer - BTMS': [
            'Formula Society of Automotive Engineers (FSAE), UNM, Albuquerque, NM: Embedded Engineer Jan 2022 – July 2023',
            '• Developed a C-based software application for Battery Temperature Monitoring System (BTMS), facilitating communication between the vehicle\'s High Voltage Interface (HVI) and Battery Management System (BMS).',
            '• Engineered layout for HVI and BTMS circuit boards, overseeing component procurement, fabrication, bench testing, and integration into the electric vehicle (EV) system.',
            '• Utilized SPI and CAN communication protocols for seamless data transmission across the Electric Vehicle (EV) system, conducted comprehensive pre-implementation software testing for functionality and reliability, and employed effective troubleshooting and debugging techniques to resolve software issues, enhancing overall system performance.',
            '• Prepared project documentation including Gantt Charts, Preliminary Requirement Documents, and Functional Specifications to maintain project clarity and meet business requirements.'
        ],
        'UNM ECE Research Assistant': [
            'Electrical and Computer Engineering Department, UNM, Albuquerque, NM: UNDERGRADUATE RESEARCH ASSISTANT',
            'Jan 2021 – Nov 2021',
            '• Designed and hand-printed a sweeper circuit generating a 0.0002 Hz sawtooth wave, along with a relay trigger circuit for measuring beam and target current to calculate Secondary Electron yield.',
            '• Developed and programmed a microwave interferometer for measuring high density plasma in the range of 1 × 10^13 cm−3.',
            '• Developed and managed a C-based tracking software for laboratory equipment inventory.'
        ],
        'IT Specialist': [
            'IT Specialist',
            'University of New Mexico, Albuquerque, NM Jan 2020 - Nov 2022',
            '• Coordinated with IT Technicians to update, document and manage GPOs across multiple domains, and to create and manage users, computer accounts and their access to network resources in AD around campus.',
            '• Assisted clients on campus to identify network issues, troubleshoot and upgrade hardware and software related issues and assist in the server installation.',
            '• Created detailed documentation for changes, trained new work-study students, and consistently adhered to IT policies, meeting deadlines while ensuring professionalism and staff satisfaction.'
        ]
    };

    // Function to open modal (extended for expertise)
    function openModal(projectName, isExpertise = false) {
        if (!modalTitle || !modalDetails) return;
        modalTitle.textContent = projectName;
        modalDetails.innerHTML = '';
        let details = isExpertise ? expertiseDetails[projectName] : projectDetails[projectName];
        if (details) {
            details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                modalDetails.appendChild(li);
            });
        }
        // Update 'View Details' button link and display
        const viewBtn = document.querySelector('.view-details-btn');
        if (viewBtn) {
            if (isExpertise) {
                viewBtn.style.display = 'none';
            } else {
                viewBtn.style.display = 'inline-block';
                // Update href based on project
                let projectPath = projectName.toLowerCase().replace(/ /g, '-');
                // Special case for AI Football Analysis
                if (projectPath === 'ai-football-analysis') {
                    projectPath = 'football-analysis';
                }
                viewBtn.href = `projects/${projectPath}.html`;
            }
        }
        // Store current scroll position and focused element
        const scrollY = window.scrollY;
        lastFocusedElement = document.activeElement;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        modal.classList.add('show');
        
        // Focus first focusable element
        const focusableElements = getFocusableElements();
        if (focusableElements.length) focusableElements[0].focus();
    }

    // Function to close modal
    function closeModalFunc() {
        const scrollY = document.body.style.top;
        modal.classList.remove('show');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        
        // Restore focus
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    // Event Listeners
    document.querySelectorAll('.project-title').forEach(title => {
        title.addEventListener('click', () => {
            openModal(title.textContent);
        });
    });

    closeModal.addEventListener('click', closeModalFunc);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Handle keyboard events
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            closeModalFunc();
            return;
        }
        
        if (e.key === 'Tab') {
            const focusableElements = getFocusableElements();
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (!focusableElements.length) return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    // Add event listeners for all project and expertise buttons
    document.addEventListener('click', function(e) {
        // Handle project buttons
        if (e.target.classList.contains('project-title')) {
            let title = e.target.textContent.trim();
            openModal(title, false);
        }
        
        // Handle expertise buttons
        if (e.target.classList.contains('expertise-title')) {
            let title = '';
            if (e.target.classList.contains('fsae-title-btn')) {
                title = 'Embedded Engineer - BTMS';
            } else if (e.target.classList.contains('unm-ece-title-btn')) {
                title = 'UNM ECE Research Assistant';
            } else if (e.target.classList.contains('unm-it-title-btn')) {
                title = 'IT Specialist';
            } else if (e.target.classList.contains('assistant-engineer-title-btn')) {
                title = 'Assistant Engineer (Network)';
            }
            if (title) {
                openModal(title, true);
            }
        }
    });
});
