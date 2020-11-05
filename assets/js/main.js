(function ($) {
    var clPhotoswipe = function () {
        var items = [],
            $pswp = $(".pswp")[0],
            $masonry_brick = $(".masonry-brick");
        $masonry_brick.each(function (i) {
            var $brick = $(this),
                $thumbLink = $brick.find(".thumb-link"),
                $title = $brick.find(".masonry-brick__title"),
                $caption = $brick.find(".masonry-brick__caption"),
                $titleText = "<h4>" + $.trim($title.html()) + "</h4>",
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr("href"),
                $size = $thumbLink.data("size").split("x"),
                $width = $size[0],
                $height = $size[1];
            var item = { src: $href, w: $width, h: $height };
            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }
            items.push(item);
        });
        $masonry_brick.each(function (i) {
            $(this).on("click", function (e) {
                e.preventDefault();
                var options = { index: i, showHideOpacity: true };
                var lightBox = new PhotoSwipe(
                    $pswp,
                    PhotoSwipeUI_Default,
                    items,
                    options
                );
                lightBox.init();
            });
        });
    };

    var clSlickSlider = function () {
        $(".slick").slick({
            arrows: false,
            dots: true,
            insfinite: true,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 3,
            pauseOnFocus: false,
            autoplaySpeed: 1000,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 5 } },
                { breakpoint: 1000, settings: { slidesToShow: 4 } },
                {
                    breakpoint: 800,
                    settings: { slidesToShow: 3, slidesToScroll: 2 },
                },
                {
                    breakpoint: 500,
                    settings: { slidesToShow: 2, slidesToScroll: 2 },
                },
            ],
        });
        $(".testimonials").slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: { slidesToShow: 1, slidesToScroll: 1 },
                },
                { breakpoint: 800, settings: { arrows: false, dots: true } },
            ],
        });
    };

    var clSmoothScroll = function () {
        var $root = $("html, body");

        $('a[href^="#"]').click(function () {
            $root.animate(
                {
                    scrollTop: $($.attr(this, "href")).offset().top,
                },
                1000
            );
        });

        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function () {
            //Get the button:
            mybutton = document.getElementById("go-top");
            mybtn = document.getElementById("back-to-top");
            if (
                document.body.scrollTop > 500 ||
                document.documentElement.scrollTop > 500
            ) {
                mybutton.style.display = "block";
                mybtn.style.opacity = 1;
            } else {
                //mybutton.style.display = "none";
                mybtn.style.opacity = 0;
            }
        };
    };

    var clContactForm = function () {
        $("#contactForm").validate({
            submitHandler: function (form) {
                var sLoader = $(".submit-loader");
                $.ajax({
                    type: "POST",
                    url: "inc/sendEmail.php",
                    data: $(form).serialize(),
                    beforeSend: function () {
                        sLoader.slideDown("slow");
                    },
                    success: function (msg) {
                        if (msg == "OK") {
                            sLoader.slideUp("slow");
                            $(".message-warning").fadeOut();
                            $("#contactForm").fadeOut();
                            $(".message-success").fadeIn();
                        } else {
                            sLoader.slideUp("slow");
                            $(".message-warning").html(msg);
                            $(".message-warning").slideDown("slow");
                        }
                    },
                    error: function () {
                        sLoader.slideUp("slow");
                        $(".message-warning").html(
                            "Something went wrong. Please try again."
                        );
                        $(".message-warning").slideDown("slow");
                    },
                });
            },
        });
    };
    (function ssInit() {
        clPhotoswipe();
        clSlickSlider();
        clSmoothScroll();
        clContactForm();
    })();
})(jQuery);
