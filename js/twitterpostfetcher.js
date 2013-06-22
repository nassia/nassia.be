/*********************************************************************
*  #### Twitter Post Fetcher v8.0 ####
*  Coded by Jason Mayes 2013. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here: 
*  http://www.jasonmayes.com/projects/twitterApi/
*  Updates will be posted to this site.
*********************************************************************/
var twitterFetcher=function(){function t(e){return e.replace(/<b[^>]*>(.*?)<\/b>/gi,function(c,e){return e}).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,"")}function l(e,c){for(var g=[],f=RegExp("(^| )"+c+"( |$)"),a=e.getElementsByTagName("*"),d=0,b=a.length;d<b;d++)f.test(a[d].className)&&g.push(a[d]);return g}var u="",j=20,p=!0,h=[],q=!1,m=!0,n=!0,r=null,s=!0,v=!0;return{fetch:function(e,c,g,f,a,d,b,k){void 0===g&&(g=20);void 0===f&&(p=!0);void 0===a&&(a=!0);void 0===d&&
(d=!0);void 0===b&&(b="default");void 0===k&&(k=!0);q?h.push({id:e,domId:c,maxTweets:g,enableLinks:f,showUser:a,showTime:d,dateFunction:b,showRt:k}):(q=!0,u=c,j=g,p=f,n=a,m=d,v=k,r=b,c=document.createElement("script"),c.type="text/javascript",c.src="//cdn.syndication.twimg.com/widgets/timelines/"+e+"?&lang=en&callback=twitterFetcher.callback&suppress_response_codes=true&rnd="+Math.random(),document.getElementsByTagName("head")[0].appendChild(c))},callback:function(e){var c=document.createElement("div");
c.innerHTML=e.body;"undefined"===typeof c.getElementsByClassName&&(s=!1);e=[];var g=[],f=[],a=[],d=0;if(s)for(c=c.getElementsByClassName("tweet");d<c.length;){0<c[d].getElementsByClassName("retweet-credit").length?a.push(!0):a.push(!1);if(!a[d]||a[d]&&v)e.push(c[d].getElementsByClassName("e-entry-title")[0]),g.push(c[d].getElementsByClassName("p-author")[0]),f.push(c[d].getElementsByClassName("dt-updated")[0]);d++}else for(c=l(c,"tweet");d<c.length;)e.push(l(c[d],"e-entry-title")[0]),g.push(l(c[d],
"p-author")[0]),f.push(l(c[d],"dt-updated")[0]),0<l(c[d],"retweet-credit").length?a.push(!0):a.push(!1),d++;e.length>j&&(e.splice(j,e.length-j),g.splice(j,g.length-j),f.splice(j,f.length-j),a.splice(j,a.length-j));c=[];d=e.length;for(a=0;a<d;){if("string"!==typeof r){var b=new Date(f[a].getAttribute("datetime").replace(/-/g,"/").replace("T"," ").split("+")[0]),b=r(b);f[a].setAttribute("aria-label",b);if(e[a].innerText)if(s)f[a].innerText=b;else{var k=document.createElement("p"),w=document.createTextNode(b);
k.appendChild(w);k.setAttribute("aria-label",b);f[a]=k}else f[a].textContent=b}p?(b="",n&&(b+='<div class="user">'+t(g[a].innerHTML)+"</div>"),b+='<p class="tweet">'+t(e[a].innerHTML)+"</p>",m&&(b+='<p class="timePosted">'+f[a].getAttribute("aria-label")+"</p>")):e[a].innerText?(b="",n&&(b+='<p class="user">'+g[a].innerText+"</p>"),b+='<p class="tweet">'+e[a].innerText+"</p>",m&&(b+='<p class="timePosted">'+f[a].innerText+"</p>")):(b="",n&&(b+='<p class="user">'+g[a].textContent+"</p>"),b+='<p class="tweet">'+
e[a].textContent+"</p>",m&&(b+='<p class="timePosted">'+f[a].textContent+"</p>"));c.push(b);a++}e=c.length;g=0;f=document.getElementById(u);for(d="<ul>";g<e;)d+="<li>"+c[g]+"</li>",g++;f.innerHTML=d+"</ul>";q=!1;0<h.length&&(twitterFetcher.fetch(h[0].id,h[0].domId,h[0].maxTweets,h[0].enableLinks,h[0].showUser,h[0].showTime,h[0].dateFunction,h[0].showRt),h.splice(0,1))}}}();


/*
* ### HOW TO CREATE A VALID ID TO USE: ###
* Go to www.twitter.com and sign in as normal, go to your settings page.
* Go to "Widgets" on the left hand side.
* Create a new widget for what you need eg "user timeline" or "search" etc. 
* Feel free to check "exclude replies" if you dont want replies in results.
* Now go back to settings page, and then go back to widgets page, you should
* see the widget you just created. Click edit.
* Now look at the URL in your web browser, you will see a long number like this:
* 345735908357048478
* Use this as your ID below instead!
*/

/**
 * How to use fetch function:
 * @param {string} Your Twitter widget ID.
 * @param {string} The ID of the DOM element you want to write results to. 
 * @param {int} Optional - the maximum number of tweets you want returned. Must
 *     be a number between 1 and 20.
 * @param {boolean} Optional - set true if you want urls and hash
       tags to be hyperlinked!
 * @param {boolean} Optional - Set false if you dont want user photo /
 *     name for tweet to show.
 * @param {boolean} Optional - Set false if you dont want time of tweet
 *     to show.
 * @param {function/string} Optional - A function you can specify to format
 *     tweet date/time however you like. This function takes a JavaScript date
 *     as a parameter and returns a String representation of that date.
 *     Alternatively you may specify the string 'default' to leave it with
 *     Twitter's default renderings.
 * @param {boolean} Optional - Show retweets or not. Set false to not show.
 */

/*
// ##### Simple example 1 #####
// A simple example to get my latest tweet and write to a HTML element with
// id "tweets". Also automatically hyperlinks URLS and user mentions and
// hashtags.
twitterFetcher.fetch('345170787868762112', 'tweets', 1, true);


// ##### Simple example 2 #####
// A simple example to get my latest 5 of my favourite tweets and write to a HTML
// element with id "talk". Also automatically hyperlinks URLS and user mentions and
// hashtags but does not display time of post.
twitterFetcher.fetch('347099293930377217', 'talk', 5, true, true, false);


// ##### Advanced example #####
// An advance example to get latest 5 posts using hashtag #API and write to a
// HTML element with id "tweets2" without showing user details and using a
// custom format to display the date/time of the post, and does not show
// retweets.
twitterFetcher.fetch('345690956013633536', 'tweets2', 5, true, false, true, dateFormatter, false);

// For advanced example which allows you to customize how tweet time is
// formatted you simply define a function which takes a JavaScript date as a
// parameter and returns a string!
// See http://www.w3schools.com/jsref/jsref_obj_date.asp for properties
// of a Date object.
function dateFormatter(date) {
  return date.toTimeString();
}
*/