// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only apply smooth scroll to navigation links
        if (!this.classList.contains('qr-trigger')) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {  // Add check if form exists
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('感谢您的留言！我们会尽快与您联系。');
        
        // Reset form
        contactForm.reset();
    });
}

// Scroll Animation
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLi.forEach(li => {
        li.querySelector('a').classList.remove('active');
        if (li.querySelector('a').getAttribute('href').slice(1) === current) {
            li.querySelector('a').classList.add('active');
        }
    });
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing QR code modal...');

    // QR Code Modal Functionality
    const modal = document.getElementById('qrModal');
    const modalImg = document.getElementById('modalQrCode');
    const modalText = document.getElementById('modalQrText');
    const closeBtn = document.querySelector('.close-modal');
    const qrTriggers = document.querySelectorAll('.qr-trigger');

    console.log('Found QR triggers:', qrTriggers.length);

    // QR code configurations
    const qrConfigs = {
        official: {
            src: 'official-qrcode.jpg',
            text: '扫码关注公众号'
        },
        xiaohongshu: {
            src: 'xiaohongshu-qrcode.jpg',
            text: '扫码关注小红书'
        },
        wechat: {
            src: 'qrcode.jpg',
            text: '扫码添加业务微信'
        }
    };

    // Add click event to QR triggers
    qrTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Stop event bubbling
            const qrType = trigger.dataset.qr;
            console.log('Clicked QR type:', qrType);
            
            const config = qrConfigs[qrType];
            console.log('Config found:', config);
            
            if (config) {
                modalImg.src = config.src;
                modalText.textContent = config.text;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                console.log('Modal opened with:', config.src);
            }
        });
        console.log('Added click listener to:', trigger.dataset.qr);
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        console.log('Modal closed via close button');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
            console.log('Modal closed via outside click');
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
            console.log('Modal closed via Escape key');
        }
    });

    console.log('QR code modal initialization complete');
}); 