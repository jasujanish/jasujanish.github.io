/* global wp, jQuery */
/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

$(document).ready(function() {
    // Function to reorder checkboxes
    function reorderCheckboxes() {
        // Define the desired order of checkbox values
        var desiredOrder = ['portfolio', 'explorations', 'team', 'post', 'video', 'careers', 'coverage'];

        // Select the parent <ul> element
        var checkboxList = $('li.sf-field-post_type ul');

        // Rearrange the checkboxes based on desiredOrder
        $.each(desiredOrder, function(index, value) {
            checkboxList.find('input[value="' + value + '"]').parent().appendTo(checkboxList);
        });
    }

    // Run the reorder function initially
    reorderCheckboxes();

    // Check and run the reorder function every second
    setInterval(reorderCheckboxes, 500); // 1000 milliseconds = 1 second
});

jQuery(document).ready(function(){
    jQuery('.menu_toggle_btn').click(function(){
        jQuery('nav#mobile-navigation').slideToggle(function(){
            if (jQuery(this).is(':visible')) {
                jQuery('.icon_close').addClass('active');
                jQuery('.icon_open').removeClass('active');
            } else {
                jQuery('.icon_close').removeClass('active');
                jQuery('.icon_open').addClass('active');
            }
        });
    });
});

// jQuery(document).ready(function(){
//     jQuery('#all.vertical_icon_box').addClass('active');
//     jQuery('.vertical_icon_box').click(function(){
//         jQuery('.vertical_icon_box').removeClass('active');
//         jQuery(this).addClass('active');
//     }); 
// });

jQuery(document).ready(function() {
    // Set the default active elements
    jQuery('#all.vertical_icon_box').addClass('active');
    jQuery('.team_filter_btn[data-filter="all"]').parent().addClass('active');

    // Click event for vertical icon boxes
    jQuery('.vertical_icon_box').click(function() {
        jQuery('.vertical_icon_box').removeClass('active');
        jQuery(this).addClass('active');
    });

    // Check for filter in URL fragment
    const hash = window.location.hash;
    if (hash) {
        const filterId = hash.substring(1); // Remove the '#'
        
        // Select the appropriate elements
        const $targetVerticalBox = jQuery(`#${filterId}.vertical_icon_box`);
        const $targetFilterBtn = jQuery(`[data-filter="${filterId}"].team_filter_btn`).parent();

        // If the target vertical icon box exists, activate it
        if ($targetVerticalBox.length) {
            jQuery('.vertical_icon_box').removeClass('active');
            $targetVerticalBox.addClass('active');
        }

        // If the target filter button exists, activate its parent
        if ($targetFilterBtn.length) {
            jQuery('.team_filter_btn').parent().removeClass('active');
            $targetFilterBtn.addClass('active');
        }
    }
});





jQuery(document).ready(function () {



	// coverage slider JS
	jQuery('.coverage_slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		dots: true,
		arrows: false,
        responsive: [
            {
                breakpoint: 768, // Mobile breakpoint
                settings: {
                    slidesToShow: 1
                }
            }
        ]
	  });
      jQuery('.horizontal_boxes_slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		dots: true,
		arrows: false,
        responsive: [
            {
                breakpoint: 768, // Mobile breakpoint
                settings: {
                    slidesToShow: 1
                }
            }
        ]
	  });





	// Function to initialize a slider and its navigation
	function initializeSlider(sliderId) {
		var sliderSelector = '.gallery_slider[data-slider-id="' + sliderId + '"]';
		var navSelector = '.gallery_slider_customized_nav[data-slider-id="' + sliderId + '"]';

		// Initialize the main slider
		jQuery(sliderSelector).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			infinite: true,
			asNavFor: navSelector,
			autoplay: true,         // Enable autoplay
			autoplaySpeed: 3000,    // Autoplay speed in milliseconds (adjust as needed)
			pauseOnHover: true      // Pause autoplay on hover
		});

		// Initialize the custom navigation
		jQuery(navSelector).slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: sliderSelector,
			dots: false,
			centerMode: true,
			focusOnSelect: true,
			variableWidth: true
		});

		// Highlight the active thumbnail
		jQuery(navSelector + ' .nav-item').click(function () {
			jQuery(navSelector + ' .nav-item').removeClass('active');
			jQuery(this).addClass('active');
		});
	}

	// Loop through each slider instance and initialize it
	jQuery('.gallery_slider').each(function () {
		var sliderId = jQuery(this).data('slider-id');
		initializeSlider(sliderId);
	});

});


jQuery(document).ready(function () {
	jQuery('.search').click(function () {
		jQuery('.header_search_box').fadeToggle();
	});
});

jQuery(document).ready(function () {
    // Initialize the slick slider
    jQuery('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.customized-nav',
        autoplay: true,         // Enable autoplay
        autoplaySpeed: 5000,    // Autoplay speed in milliseconds (adjust as needed)
        pauseOnHover: true      // Pause autoplay on hover
    });

    // Initialize the custom navigation
    jQuery('.customized-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        variableWidth: true
    });

    // Highlight the active thumbnail
    jQuery('.customized-nav .nav-item').click(function () {
        jQuery('.customized-nav .nav-item').removeClass('active');
        jQuery(this).addClass('active');
    });
});


// $(document).ready(function () {
// 	$('.coverage_slider').slick({
// 		slidesToShow: 3,
// 		slidesToScroll: 1,
// 		autoplay: true,
// 		autoplaySpeed: 2000,
// 		arrows: true,
// 		prevArrow: '<button type="button" class="slick-prev">Previous</button>',
// 		nextArrow: '<button type="button" class="slick-next">Next</button>',
// 		responsive: [
// 			{
// 				breakpoint: 768,
// 				settings: {
// 					slidesToShow: 2
// 				}
// 			},
// 			{
// 				breakpoint: 480,
// 				settings: {
// 					slidesToShow: 1
// 				}
// 			}
// 		]
// 	});
// });

jQuery(document).ready(function () {
    // Function to apply filter based on the hash or button click
    function applyFilter(filterId) {
        if (filterId == 'all') {
            jQuery('#filter_container article').parent().show(); // Show all boxes
        } else {
            jQuery('#filter_container article').parent().hide(); // Hide all boxes
            jQuery('#filter_container article').each(function() {
                var filters = jQuery(this).data('filter').split(' '); // Split the data-filter attribute by space
                if (filters.includes(filterId)) {
                    jQuery(this).parent().show(); // Show the article if it matches the filter ID
                }
            });
        }
    }

    // On click event for filter buttons
    jQuery('.filter_box').on('click', function () {
        var buttonId = jQuery(this).attr('id');
        applyFilter(buttonId);
    });

    // Function to handle scrolling and filtering
    function scrollToSection(event, id) {
        if (event) {
            event.preventDefault(); // Prevent the default anchor behavior
        }
        
        // Update the URL hash
        window.location.hash = id;

        // Scroll to the section
        document.getElementById('filter_container').scrollIntoView({ behavior: 'smooth' });

        // Apply the filter
        applyFilter(id);
    }

    // On page load, apply filter based on URL hash
    if (window.location.hash) {
        var filterId = window.location.hash.substring(1); // Remove the hash symbol
        scrollToSection(null, filterId); // Apply the filter without an event
    }
});
// Exploration Search Bar
$(".search_bar").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $("#filter_container .exploration_box").parent().each(function() {
    if ($(this).text().toLowerCase().indexOf(value) > -1) {
      $(this).removeClass("not_find");
    } else {
      $(this).addClass("not_find");
    }
  });
});




async function downloadImage(url) {
	try {
		const response = await fetch(url);
		const blob = await response.blob();
		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = url.substring(url.lastIndexOf('/') + 1);
		document.body.appendChild(link)
;
		link.click();
		document.body.removeChild(link)
;
	} catch (error) {
		console.error('Download failed:', error);
	}
}


function reloadPage() {
    const currentURL = window.location.href;
    const siteURL = window.location.origin;
    const searchPattern = new RegExp(`^${siteURL}/search/\\?_sf_s=.+$`);

    if (!searchPattern.test(currentURL)) {
        window.location.href = `${siteURL}/search/`;
    } else {
        location.reload();
    }
}


// mobile search popup 
jQuery(function ($) { // Using the $ symbol consistently
    $('.menu-toggle').on('click', function () {
        $('header').toggleClass('is-open');
    });

    $('.mobo-search-icon').on('click', function () {
        var searchWrapper = $('.mobo-search');
        var searchForm = searchWrapper.find('form');
        if (searchWrapper.hasClass('is-search-open')) {
            searchForm.submit();
        } else {
            searchWrapper.addClass('is-search-open').find('input').focus();
        }
    });

    $('.search-close-icon').on('click', function () {
        $('.mobo-search').removeClass('is-search-open');
    });
});

jQuery(document).ready(function() {
    jQuery('li.sf-field-reset').click(function() {
        jQuery('.search_sidebar').removeClass('custom_sidebar_position');
    });
    jQuery('.filter_btn').click(function() {
        jQuery('.search_sidebar').addClass('custom_sidebar_position');
    });
});


jQuery(document).ready(function() {
    const $teamCategorySec = jQuery('section.team_category_sec');
    const $childSections = jQuery('section[data-parent="child"]');

    // Show team category sections and hide child sections on page load
    $teamCategorySec.removeClass('d-none');
    $childSections.addClass('d-none');

    // Function to handle filter clicks
    function applyFilter(filterCategory) {
        if (filterCategory === 'all') {
            // Show all sections and hide child sections
            $teamCategorySec.removeClass('d-none');
            $childSections.addClass('d-none');
        } else {
            // Hide all sections and show the filtered one
            $teamCategorySec.addClass('d-none');
            jQuery(`section#${filterCategory}`).removeClass('d-none');
        }
    }

    jQuery('.team_filter_btn').click(function() {
        const filterCategory = jQuery(this).data('filter');
        applyFilter(filterCategory);
    });

    // Check for filter in URL fragment
    const hash = window.location.hash;
    if (hash) {
        const filterCategory = hash.substring(1); // Remove the '#'
        applyFilter(filterCategory);
    }
});


jQuery(document).ready(function() {
    jQuery('.search').on('click', function() {
        jQuery('[name="_sf_search[]"]').focus();
    });
	
	// Apply matchHeight to elements with the class 'matchheight'
	jQuery('.matchheight').matchHeight();
});

jQuery(document).ready(function($) {
    jQuery('.post_content a').each(function() {
        var link = jQuery(this).attr('href');
        if (link && !link.includes(window.location.hostname)) {
            jQuery(this).attr('target', '_blank');
        }
    });
});