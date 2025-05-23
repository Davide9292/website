document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const isMobile = window.innerWidth <= 768;
    const projectTitles = document.querySelectorAll('.projects-titles-container .project-title');
    
    // Initialize
    initializeView();
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initialize gallery controls
    initGalleryControls();
    
    // Initialize mobile accordion
    initMobileAccordion();
    
    /**
     * Initialize the view based on device
     */
    function initializeView() {
        if (isMobile) {
            // Set all mobile galleries to be animated when in view
            setupMobileAnimations();
        } else {
            // Hide all titles initially on desktop
            projectTitles.forEach(title => {
                title.classList.remove('active');
                title.classList.add('fade-out');
            });
            
            // Trigger scroll event to check if first gallery is already visible
            handleScroll();
        }
    }
    
    /**
     * Handle scroll events
     */
    function handleScroll() {
        if (isMobile) {
            // Handle mobile scroll animations
            handleMobileScrollAnimations();
        } else {
            // Handle desktop project title visibility
            handleProjectTitleVisibility();
        }
    }
    
    /**
     * Handle resize events
     */
    function handleResize() {
        // Update mobile state
        const wasMobile = isMobile;
        const newIsMobile = window.innerWidth <= 768;
        
        // Only re-initialize if changing between mobile and desktop
        if (wasMobile !== newIsMobile) {
            window.location.reload();
        }
    }
    
    /**
     * Handle project title visibility on desktop
     */
    function handleProjectTitleVisibility() {
        const projectsContainer = document.querySelector('.projects');
        const projectTitlesContainer = document.querySelector('.projects-titles-container');
        const projectElements = document.querySelectorAll('.projects-galleries-container .project');
        const projectTitles = document.querySelectorAll('.projects-titles-container .project-title');
        const clientsSection = document.querySelector('.clients-section');
        const heroSection = document.querySelector('.main-title');
        
        if (!projectsContainer || !projectTitlesContainer || projectElements.length === 0) return;
        
        const projectsRect = projectsContainer.getBoundingClientRect();
        const clientsRect = clientsSection ? clientsSection.getBoundingClientRect() : null;
        const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
        
        // Check if the hero section is mostly off-screen (bottom edge is near the top)
        const isHeroOffScreen = heroRect && heroRect.bottom < 80; 
        const isProjectsVisible = projectsRect && 
            projectsRect.top < window.innerHeight && 
            projectsRect.bottom > 0;
        const isClientsVisible = clientsRect && 
            clientsRect.top < window.innerHeight && 
            clientsRect.bottom > 0;
        
        // Show titles only when projects are visible, hero is off-screen, and clients are not yet visible
        if (isProjectsVisible && isHeroOffScreen && !isClientsVisible) {
            projectTitlesContainer.style.opacity = '1';
            
            let activeProjectIndex = -1;
            const lastProjectIndex = projectElements.length - 1;
            
            projectElements.forEach((project, index) => {
                if (!project) return;
                
                const rect = project.getBoundingClientRect();
                let isInView = false;
                
                if (index === 0) {
                    // First project: Trigger when top is past 85% viewport height (earlier trigger)
                    isInView = rect.top < window.innerHeight * 0.6 && rect.bottom > 0;
                } else {
                    // All other projects (including last for now): standard center check
                    isInView = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
                }
                
                if (isInView) {
                    activeProjectIndex = index;
                }
            });
            
            let currentActiveTitle = null;
            projectTitles.forEach(title => {
                if (title.classList.contains('active')) {
                    currentActiveTitle = title;
                }
            });
            
            const newActiveTitle = activeProjectIndex !== -1 ? projectTitles[activeProjectIndex] : null;
            
            if (newActiveTitle !== currentActiveTitle) {
                // Fade out the old title
                if (currentActiveTitle) {
                    currentActiveTitle.classList.remove('active');
                    if (currentActiveTitle !== newActiveTitle) {
                        currentActiveTitle.classList.add('fade-out');
                    }
                }
                
                // Fade in the new title with a delay
                if (newActiveTitle) {
                    newActiveTitle.classList.remove('fade-out');
                    newActiveTitle.classList.add('fade-in');
                    
                    setTimeout(() => {
                        // Check if the title element still exists before modifying
                        if (projectTitles[activeProjectIndex] === newActiveTitle) {
                            newActiveTitle.classList.remove('fade-in');
                            newActiveTitle.classList.add('active');
                        }
                    }, 300); // 300ms delay
                }
            }
            
        } else {
            // Hide titles container and fade out any active/fading-in titles
            projectTitlesContainer.style.opacity = '0';
            projectTitles.forEach(title => {
                if (title.classList.contains('active') || title.classList.contains('fade-in')) {
                    title.classList.remove('active', 'fade-in');
                    title.classList.add('fade-out');
                }
            });
        }
    }
    
    /**
     * Set up mobile animations
     */
    function setupMobileAnimations() {
        const galleries = document.querySelectorAll('.mobile-project .project-gallery');
        
        galleries.forEach(gallery => {
            gallery.classList.remove('visible');
        });
    }
    
    /**
     * Handle mobile scroll animations
     */
    function handleMobileScrollAnimations() {
        const galleries = document.querySelectorAll('.mobile-project .project-gallery');
        const windowHeight = window.innerHeight;
        
        galleries.forEach(gallery => {
            const rect = gallery.getBoundingClientRect();
            const isInView = rect.top < windowHeight * 0.8;
            
            if (isInView) {
                gallery.classList.add('visible');
            }
        });
    }
    
    /**
     * Initialize gallery controls
     */
    function initGalleryControls() {
        // Initialize desktop gallery controls
        initGallerySet(document.querySelectorAll('.projects-galleries-container .project-gallery'));
        
        // Initialize mobile gallery controls
        initGallerySet(document.querySelectorAll('.mobile-project .project-gallery'));
    }
    
    /**
     * Initialize a set of galleries
     */
    function initGallerySet(galleries) {
        galleries.forEach(gallery => {
            const container = gallery.querySelector('.gallery-container');
            const prevBtn = gallery.querySelector('.prev-btn');
            const nextBtn = gallery.querySelector('.next-btn');
            const items = gallery.querySelectorAll('.gallery-item');
            const indicators = gallery.querySelectorAll('.gallery-indicator');
            let currentIndex = 0;
            let touchStartX = 0;
            let touchEndX = 0;
            
            if (!container || !prevBtn || !nextBtn) return;
            
            // Update position and indicators
            const updateGalleryPosition = () => {
                container.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update indicators
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            };
            
            // Previous button with endless carousel
            prevBtn.addEventListener('click', () => {
                if (currentIndex === 0) {
                    currentIndex = items.length - 1; // Go to last item if at first
                } else {
                    currentIndex--;
                }
                updateGalleryPosition();
            });
            
            // Next button with endless carousel
            nextBtn.addEventListener('click', () => {
                if (currentIndex === items.length - 1) {
                    currentIndex = 0; // Go to first item if at last
                } else {
                    currentIndex++;
                }
                updateGalleryPosition();
            });
            
            // Touch events for mobile with endless carousel
            gallery.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });
            
            gallery.addEventListener('touchmove', (e) => {
                touchEndX = e.touches[0].clientX;
            }, { passive: true });
            
            gallery.addEventListener('touchend', () => {
                const swipeDistance = touchStartX - touchEndX;
                const swipeThreshold = 50; // Minimum distance for a swipe
                
                if (Math.abs(swipeDistance) > swipeThreshold) {
                    if (swipeDistance > 0) {
                        // Swipe left (next)
                        if (currentIndex === items.length - 1) {
                            currentIndex = 0; // Go to first item if at last
                        } else {
                            currentIndex++;
                        }
                    } else {
                        // Swipe right (prev)
                        if (currentIndex === 0) {
                            currentIndex = items.length - 1; // Go to last item if at first
                        } else {
                            currentIndex--;
                        }
                    }
                    updateGalleryPosition();
                }
            });
        });
    }
    
    /**
     * Initialize mobile accordion
     */
    function initMobileAccordion() {
        const accordionToggle = document.querySelector('.accordion-toggle');
        const accordionContent = document.querySelector('.accordion-content');
        
        if (accordionToggle && accordionContent) {
            accordionToggle.addEventListener('click', () => {
                accordionToggle.classList.toggle('active');
                accordionContent.classList.toggle('active');
            });
        }
    }
}); 