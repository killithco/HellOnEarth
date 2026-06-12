// Smooth scrolling and interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Smooth navigation clicks
    const navLinks = document.querySelectorAll('.nav-link, .btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll event listener for navbar styling
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(139, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and items
    const cards = document.querySelectorAll('.descent-card, .campaign-card, .collection-item, .protocol-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Execute All button functionality
    const executeBtn = document.querySelector('.execute-cta .btn');
    if (executeBtn) {
        executeBtn.addEventListener('click', function() {
            showExecutionModal();
        });
    }
});

// Modal for execution confirmation
function showExecutionModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Execute All Protocols?</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>You are about to initiate all Next Phase Protocols:</p>
                <ul>
                    <li>Commission Creative Director for 'The Descent' treatment</li>
                    <li>Vet top 50 influencers for the 'Soul Contract' campaign</li>
                    <li>Initiate outreach for the 'Infernal Collection' capsule</li>
                </ul>
                <p><strong>This action will commence the operational cascade.</strong></p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="executeProtocols()">Execute →</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function executeProtocols() {
    const modal = document.querySelector('.modal-content');
    if (modal) {
        const body = modal.querySelector('.modal-body');
        body.innerHTML = `
            <div class="execution-progress">
                <p class="pulse">⚡ Protocols executing...</p>
                <div class="protocol-status">
                    <div class="status-item complete">✓ Creative Direction commissioned</div>
                    <div class="status-item complete">✓ Influencer vetting initiated</div>
                    <div class="status-item complete">✓ Infernal Collection outreach active</div>
                </div>
                <p class="completion-message">Welcome to the next phase of Hell On Earth.</p>
            </div>
        `;
    }
    
    setTimeout(() => {
        closeModal();
    }, 2000);
}

// Add modal styles dynamically
const style = document.createElement('style');
style.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
        border: 2px solid #8B0000;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
        overflow: hidden;
    }
    
    .modal-header {
        padding: 2rem;
        border-bottom: 1px solid #8B0000;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h2 {
        color: #d4af37;
        font-size: 1.5rem;
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: #d4af37;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-body {
        padding: 2rem;
        color: #f5f5f5;
    }
    
    .modal-body ul {
        list-style: none;
        margin: 1rem 0;
    }
    
    .modal-body li {
        padding: 0.5rem 0;
        color: #b0b0b0;
        border-bottom: 1px solid rgba(139, 0, 0, 0.1);
    }
    
    .modal-footer {
        padding: 2rem;
        border-top: 1px solid #8B0000;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }
    
    .execution-progress {
        text-align: center;
    }
    
    .pulse {
        font-size: 1.5rem;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .protocol-status {
        margin: 1.5rem 0;
        text-align: left;
    }
    
    .status-item {
        padding: 0.75rem;
        margin: 0.5rem 0;
        border-radius: 4px;
        background: rgba(139, 0, 0, 0.2);
    }
    
    .status-item.complete {
        color: #d4af37;
        border-left: 3px solid #d4af37;
        padding-left: 1rem;
    }
    
    .completion-message {
        margin-top: 1rem;
        color: #d4af37;
        font-weight: bold;
        font-style: italic;
    }
`;

document.head.appendChild(style);

// Parallax effect on hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});
