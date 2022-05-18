(function($) {
    "use strict";

    jQuery(document).ready(function($) {




        $('.menu-open , .offcanvas-overlay').click(function() {

            $('.dashboard__menu , .offcanvas-overlay').addClass('active');

        });

        $('.menu-close , .offcanvas-overlay').click(function() {

            $('.dashboard__menu , .offcanvas-overlay').removeClass('active');

        });

        $('.offcanvas-open').click(function() {

            $('.offcanvas__sidebar').addClass('active');
            $('body').addClass('overflow-hidden');

        });
        $('.close-offcanvas').click(function() {

            $('.offcanvas__sidebar').removeClass('active');
            $('body').removeClass('overflow-hidden');

        });

        $('.filter__button').click(function() {

            $('.location--offcanvas').addClass('active'); 
            $('body').addClass('overflow-hidden');
        });
        $('.close-offcanvas').click(function() {

            $('.location--offcanvas').removeClass('active'); 

        });


        $('.close-tag').click(function() {

            $(this).parent().hide(); 

        });

        $(".tag-input").val();


        $('#data-table').DataTable(); 

        $('select').select2();

    });

 



}(jQuery));