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
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const galleriesContainer = document.querySelector('.projects-galleries-container');
        const galleryProjects = galleriesContainer.querySelectorAll('.project');
        const mainTitle = document.querySelector('.main-title');
        const mainTitleRect = mainTitle.getBoundingClientRect();
        const clientsSection = document.querySelector('.clients-section');
        const clientsSectionRect = clientsSection ? clientsSection.getBoundingClientRect() : null;
        const projectTitlesContainer = document.querySelector('.projects-titles-container');
        
        // Check if clients section is visible
        if (clientsSectionRect && clientsSectionRect.top < windowHeight) {
            // Change the project titles container to absolute positioning
            projectTitlesContainer.classList.add('absolute-positioning');
        } else {
            // Revert to fixed positioning
            projectTitlesContainer.classList.remove('absolute-positioning');
        }
        
        // Check if main title is visible
        const isMainTitleVisible = mainTitleRect.top < windowHeight && mainTitleRect.bottom > 0;
        
        // If main title is visible, hide all project titles
        if (isMainTitleVisible) {
            projectTitles.forEach(title => {
                title.classList.remove('active');
            });
            return;
        }
        
        // Check which gallery is currently most visible
        galleryProjects.forEach((project, index) => {
            const rect = project.getBoundingClientRect();
            
            // Calculate visibility percentage
            const visibleHeight = Math.min(rect.bottom, windowHeight) - 
                                  Math.max(rect.top, 0);
            const totalHeight = Math.min(rect.height, windowHeight);
            const visibilityPercentage = (visibleHeight / totalHeight) * 100;
            
            // All project titles appear when gallery is at least 50% visible
            const visibilityThreshold = 50;
            
            if (visibilityPercentage > visibilityThreshold) {
                // Activate the corresponding title
                projectTitles.forEach((title, titleIndex) => {
                    if (titleIndex === index) {
                        title.classList.add('active');
                    } else {
                        title.classList.remove('active');
                    }
                });
            }
        });
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