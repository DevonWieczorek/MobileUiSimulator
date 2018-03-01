Mobile UI Simulator
Authored by Devon Wieczorek, April 2017

LANGUAGES:
HTML, CSS, Javascript, jQuery

PURPOSE:
Preview your web pages in a "live" mobile environment, while still having access to developer tools. 
This tool makes up for the shortcomings of most browser preview tools by accounting for the space that is taken up by the browser's native UI.

USAGE:
Install this tool into whatever project you wish to test. Navigate to the interface page, place in the link of the page you wish to preview, and click
the button that corresponds to the desired device. That's it! It's as simple as that.

KNOWN LIMITATIONS:
- Cross origin restrictions prevent the tool from loading resources from outside domains, so the tool must be installed directly inside
  of the site that you wish to test.

- If your pages are served dynamically based on the browser, you will be unable to spoof the user agent for each device. Links to third-party
  UA Spoofing extensions for Chrome and Firefox are linked on the page if this is absolutely necessary. 
  A UA spoofing script is included with this tool, but the UA is changed back before the browser ever sends the request (rendering it useless). 
  If you are able to fix the script so that the newly-spoofed UA persists across requests, PLEASE let me know and send me your updated code.

- This tool only supports a limited number of mobile devices. New devices may be added upon request. Even better, hack away at this tool and send
  me what you come up with!

- If the initial state of the page being previewed does not have a scroll bar, but more content is dynamically added or shown with show/hide methods,
  the tool will not accommodate for the newly-present scroll bar (it will be displayed in the preview area and your "screen width" will be short by
  that many pixels.
  This can be manually remedied by calling the following function from the console: afterFrameLoad(getScrollbarWidth());
  
  
  Example can be found on: http://www.flowpreview.com/campaign.aspx?LaunchCode=8BA28E86-3928-242F-284A-25992EF3A7778ACFB3F0&cIdx=12&CID=6693
  
