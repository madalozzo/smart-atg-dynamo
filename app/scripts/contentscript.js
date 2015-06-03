'use strict';

//scripts injection to run on document
function injectJS(url){
  var s = document.createElement('script');
  s.src = chrome.extension.getURL(url);
  (document.head||document.documentElement).appendChild(s);
  s.onload = function() {
      s.parentNode.removeChild(s);
  };
}

injectJS("scripts/jquery-1.11.3.min.js");
injectJS("scripts/script.js");

function sortItemDescriptorRowsByName() {
    var listItemDescriptorsLink = $('a[name=listItemDescriptors]');
    var table = listItemDescriptorsLink.parent().find('table');
    var originalRows = table.find('tr:gt(1)')

    var tbody = originalRows.parent('tbody');
    originalRows.remove();

    originalRows.sort(function(a,b) {
        var aName = $(a).find('th').text().toLowerCase();
        var bName = $(b).find('th').text().toLowerCase();

        if (aName < bName) {
            return -1;
        } else if (bName<aName) {
            return 1;
        }
            return 0;
    });
    originalRows.appendTo(tbody);
}
sortItemDescriptorRowsByName();

// colorize xml output and XML repository definition
$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
$('td:contains("XML value")').parent().find('pre').each(function(i, e) {hljs.highlightBlock(e)});

//make some links
$('.hljs-value').each(function( index ) {
  var itemDescriptor = $(this).text();
  var itemDescriptor = itemDescriptor.replace(/"/g, '');
  var cData =$(this).parent().next('span').text();
  cData = cData.replace('<![CDATA[', '');
  cData = cData.replace(']]>', '');
  $(this).attr("onclick", "addXml('print-item', '"+itemDescriptor+"', '"+cData+"')");
});

//move to xml
$('html, body').animate({
    scrollTop: $(".hljs").offset().top
}, 300);
