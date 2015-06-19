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

//injectJS("scripts/jquery-1.11.3.min.js");
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

function sortTimePerformanceDataByName() {
  var listTimePerformanceDataLink = $('a[name=timeperfdata]');
  
  var table = listTimePerformanceDataLink.parent().next();
  
  var originalRows = table.find('tr:gt(1)')

  var tbody = originalRows.parent('tbody');
    
  originalRows.remove();

  originalRows.sort(function(a,b) {
      var aName = $(a).find('td').text().toLowerCase();
      var bName = $(b).find('td').text().toLowerCase();

      if (aName < bName) {
          return -1;
      } else if (bName<aName) {
          return 1;
      }
          return 0;
  });
  originalRows.appendTo(tbody);
  
}
sortTimePerformanceDataByName();

// colorize xml output and XML repository definition
$('pre code').each(function(i, e) {hljs.highlightBlock(e)});
$('td:contains("XML value")').parent().find('pre').each(function(i, e) {hljs.highlightBlock(e)});

//make some links
$('.hljs-value').slice(2).each(function( index ) {
  var itemDescriptor = $(this).text();
  var itemDescriptor = itemDescriptor.replace(/"/g, '');
  var cData =$(this).parent().next('span').text();
  cData = cData.replace('<![CDATA[', '');
  cData = cData.replace(']]>', '');
  $(this).attr("onclick", "addXml('print-item', '"+itemDescriptor+"', '"+cData+"')");
});

$('a[name=listItemDescriptors]').next().find('th').slice(4).each(function( index ) {
  var imageSrcPrint = chrome.extension.getURL('images/print.png');
  var imageSrcSearch = chrome.extension.getURL('images/search.png');
  $(this).append('<img class="icon-print" id="' + $(this).text() + '" src="' + imageSrcPrint + '" />');
  $(this).append('<img class="icon-search" id="' + $(this).text() + '" src="' + imageSrcSearch + '" />');
});

//move to xml
$('html, body').animate({
    scrollTop: $(".hljs").offset().top
}, 300);
