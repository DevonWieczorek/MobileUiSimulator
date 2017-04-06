$(document).ready(function(){
        
    var sb = getScrollbarWidth();

    $('.btn').click(function(){
        var url = $('#url').val();
        var w = $(this).attr('data-width');
        var h = $(this).attr('data-height');
        var os = $(this).attr('data-os').toLowerCase();

        if(url == ''){
            alert('Please insert a URL to test');
            $('#url').focus();
            return false;
        }

        $('#mobile-UI-Test-Wrapper').css({'width': w, 'height': h});

        reset();
        simulateMobileUI(os, url);

        // Also accounts for navigation from within the iframe
        $('#mobile-UI-Test-Wrapper > iframe').bind('load', function(){
            // Check for scroll bar and resize accordingly
            afterFrameLoad(sb);
            
            var lastScrollTop = 0;
            var iframe = $("#frame").contents();
            var parent = $('#mobile-UI-Test-Wrapper');
            var scrolled = parent.hasClass('scrolled');

            // Set scroll event for UI elements
            $(iframe).scroll(function () {
                var st = $(this).scrollTop();
                if (st > lastScrollTop){
                   if(!scrolled) $('#mobile-UI-Test-Wrapper').addClass('scrolled');
                } 
                else {
                  $('#mobile-UI-Test-Wrapper').removeClass('scrolled');
                }
                lastScrollTop = st;
            });
        });

    }); 

});

// Calculate width of scroll bar for each browser
function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

// Reset UI Elements
function reset(){
    $('#mobile-UI-Test-Wrapper').removeClass('android ios scrolled');
    $('#ios-UI-Top, #android-UI-Top, #ios-UI-Bottom, #android-UI-Bottom').remove();
}

// Create the UI
function simulateMobileUI(os, url){

    $('#mobile-UI-Test-Wrapper').addClass(os);

    var topDiv = '<div id="' + os + '-UI-Top"></div>';
    var bottomDiv = '<div id="' + os + '-UI-Bottom"></div>';

    $('#mobile-UI-Test-Wrapper').prepend(topDiv);
    $('#mobile-UI-Test-Wrapper').append(bottomDiv);

    // uaSpoof(w,h,os);
    $('#mobile-UI-Test-Wrapper > iframe').attr('src', url);

}

// Detect presence of a scroll bar
function scrollBar(){
    var height = $('#mobile-UI-Test-Wrapper').height();
    var frame = $("#frame").contents().height();

    return frame > height;
}

function afterFrameLoad(sb){
    var parent = $('#mobile-UI-Test-Wrapper');

    if(scrollBar()){
        // If scroll bar is present, overflow the frame by that pixel amount
        // So the test screen is shown as the proper size (without the scroll bar)
        $('#mobile-UI-Test-Wrapper > iframe').attr('width', (parent.width()+parseInt(sb)) + 'px');
    }
    else{
        $('#mobile-UI-Test-Wrapper > iframe').attr('width', parent.width());
    }
}