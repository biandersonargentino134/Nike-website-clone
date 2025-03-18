document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize footer functionality
    function initFooter() {
        // Add click event listeners to all footer column headers
        document.querySelectorAll('.footer-column h3').forEach(header => {
            header.addEventListener('click', function() {
                const parent = this.parentElement;
                
                // Close any other open columns first
                document.querySelectorAll('.footer-column.active').forEach(activeColumn => {
                    // Skip the current column
                    if (activeColumn !== parent) {
                        activeColumn.classList.remove('active');
                        // Icon rotation will be handled by CSS transition
                        const otherIcon = activeColumn.querySelector('h3 i.bxs-chevron-down');
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Toggle the 'active' class on the parent footer-column
                parent.classList.toggle('active');
                
                // Rotate the chevron icon when expanded/collapsed
                // CSS will handle the smooth transition
                const icon = this.querySelector('i.bxs-chevron-down');
                if (icon) {
                    if (parent.classList.contains('active')) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    }

    // Check if footer is already loaded
    if (document.querySelector('.footer')) {
        initFooter();
    } else {
        // If not loaded yet, use MutationObserver to wait for footer content
        const observer = new MutationObserver(function(mutations) {
            if (document.querySelector('.footer')) {
                observer.disconnect();
                initFooter();
            }
        });
        
        observer.observe(document.getElementById('footer'), { childList: true });
    }
});
